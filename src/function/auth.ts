import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();
// per fuso orario corretto
const dataExpireCode = Date.now() + 1000 * 60 * Number(process.env.SESSION_TIME);
const opzioniFusoOrario = { timeZone: "Europe/Rome" };

// Interfaccia del messaggio di risposta
interface ReturnMessage {
  status: "Error" | "Success";
  message: string;
}

/**
 * Avvia la procedura di autenticazione tramite OTP inviato via email,
 * partendo da un numero di telefono associato all’utente.
 *
 * Flusso:
 * 1. Cerca l’utente nel DB tramite `num_telefono`.
 * 2. Se presente, genera un codice OTP a 6 cifre e calcola `expire_time`
 *    come **ora corrente + SESSION_TIME (minuti)**.
 * 3. Aggiorna sull'utente i campi `last_code` ed `expire_time`.
 * 4. Invia l’OTP all’indirizzo email dell’utente via SMTP.
 * 5. Restituisce un `ReturnMessage` con esito e messaggio.
 *
 * @param phone - Numero di telefono dell’utente (formato coerente con `user.num_telefono`).
 * @returns Promise<ReturnMessage> - Oggetto con `status` e `message` che descrive l’esito.
 *
 * @remarks
 * - L’OTP è generato in modo pseudocasuale (6 cifre, range 100000–999999).
 * - Gli errori di invio email sono gestiti internamente con `try/catch` e segnalati su console.
 * - **Nota:** l’implementazione corrente ritorna `{ status: "Error", message: "Codice generato" }`
 *   anche quando l’operazione ha successo. Valutare l’impostazione di `status: "Success"`
 *   in caso di generazione/invio avvenuti correttamente.
 *
 * @throws
 * - Possibili eccezioni propagate da Prisma (es. problemi di connessione/aggiornamento DB).
 * - Le eccezioni di nodemailer sono catturate e non propagate.
 *
 * @requires ENV
 * - `SESSION_TIME`  (minuti per calcolare la scadenza dell’OTP)
 * - `SMTP_SERVER`   (host SMTP)
 * - `SMTP_PORT`     (porta SMTP)
 * - `SMTP_USER`     (mittente/utente SMTP)
 * - `SMTP_PASS`     (password SMTP)
 *
 * @sideEffects
 * - Scrittura sul DB (`last_code`, `expire_time`).
 * - Invio di un’email all’utente.
 * - Log su console.
 *
 * @example
 * ```ts
 * const res = await auth("390123456789");
 * if (res.status === "Success") {
 *   // Codice generato e inviato correttamente
 * } else {
 *   // Gestisci l’errore (es. utente non trovato)
 * }
 * ```
 */
export async function auth(phone: string): Promise<ReturnMessage> {
  try {
    // ricerca db utente con telefono inserito
    const user = await prisma.user.findUnique({
      where: { num_telefono: phone },
    });

    // Non esiste l'utente con il numero di telefono dato.
    if (!user)
      return {
        status: "Error",
        message: "No user with that phone number was found",
      };

    const code = String(Math.floor(100000 + Math.random() * 900000));
    const expireTime = new Date(Date.now() + 1000 * 60 * Number(process.env.SESSION_TIME)).toISOString();
    // const expireTime = new Date(dataExpireCode).toLocaleString("it-IT", opzioniFusoOrario);

    // Genero nuovo codice e data di scadenza sess
    // ione
    await prisma.user.update({
      where: { id: user.id },
      data: { last_code: code, expire_time: expireTime },
    });

    console.info("Codice generato e inserito");

    // Invio mail
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_SERVER,
        port: Number(process.env.SMTP_PORT),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"AI-call" <${process.env.SMTP_USER}>`, // mittente valido Office 365
        to: user.email,
        subject: "Il tuo codice di verifica",
        text: `Gentile Cliente ${user.nome}, il tuo codice di verifica è: ${code}`,
      });

      console.info("Mail inviata");
    } catch (err) {
      console.error("Errore invio mail:", err);

      return {
        status: "Error",
        message:
          "We were unable to send you an email, check wether your email is correct or try later, might be a problem on our side",
      };
    }

    return {
      status: "Success",
      message: "Code generated successfully, check your email inbox",
    };
  } catch (err) {
    console.error("Errore generico", err);
    return {
      status: "Error",
      message: "We are having issues on our side, try later",
    };
  }
}
