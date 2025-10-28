import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// per fuso orario corretto (NON FUNZIONA)
// const dataCorrente = new Date();
// const opzioniFusoOrario = { timeZone: "Europe/Rome" };

//TODO: Dichiarare interface della risposta
interface ReturnMessage {
  status: "Error" | "Success";
  message: string;
  response: string | null;
}


/**
 * Verifica un codice OTP inviato all’utente associato a un numero di telefono.
 *
 * Flusso:
 * 1. Cerca l’utente nel DB tramite `num_telefono` e `last_code`.
 * 2. Controlla che il codice OTP non sia scaduto (`expire_time >= ora corrente`).
 * 3. Se il codice è valido, restituisce `Success` e l’ID utente.
 * 4. Se il codice è errato o scaduto, restituisce `Error` con messaggio appropriato.
 *
 * @param phone - Numero di telefono dell’utente (formato coerente con `user.num_telefono`).
 * @param code - Codice OTP da verificare.
 * @param first_access - Flag che indica se è il primo accesso (default: false). Cambia il messaggio di errore.
 * @returns Promise<ReturnMessage> - Oggetto con `status`, `message` e `response` (ID utente se OK, altrimenti null).
 *
 * @remarks
 * - Il confronto della data tiene conto del fuso orario europeo ("Europe/Rome").
 * - Gli errori di database possono essere propagati come eccezioni.
 *
 * @example
 * ```ts
 * const res = await auth2("3923456789", "123456");
 * if (res.status === "Success") {
 *   console.log("Autenticazione completata per utente:", res.response);
 * } else {
 *   console.log(res.message);
 * }
 * ```
 */

export async function auth2(phone: string, code: string, first_access = false) {
  const user = await prisma.user.findUnique({
    where: {
      num_telefono: phone,
      last_code: code,
      expire_time: {
        //TODO: Check su tutte le date generate, impostare la timezone corretta
        gte: new Date()
        //lte: dataCorrente.toLocaleString("it-IT", opzioniFusoOrario),
      },
    },
  });

  if (user) {
    return {
        status: "Success",
        message: "Authorization completed successfully.",
        response: user.id,
      };
  } else {
    if (first_access) {
      return {
        status: "Error",
        message: "The verification code you entered is incorrect.",
        response: null,
      };
    } else {            
      return {
        status: "Error",
        message: "Your session has expired. Please request a new verification code.",
        response: null,
      };
    }
  }

   
}
