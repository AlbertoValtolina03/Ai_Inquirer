import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

export async function auth(phone: string) {
  // ricerca db utente con telefono inserito
  const user = await prisma.user.findUnique({
    where: { num_telefono: phone },
  });

  if (!user) throw new Error("Numero non trovato"); // si torna al index.ts

  const code = Math.floor(100000 + Math.random() * 900000).toString(); // codice casuale
  const expireTime = new Date(Date.now() + 10 * 60 * 1000); // scadenza codice

  // aggiornamento db
  await prisma.user.update({
    where: { id: user.id },
    data: { last_code: code, expire_time: expireTime },
  });
  // DA SCOMMENTARE DURANTE I TEST
  // console.log("Codice generato:", code);

  // invio mail
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER,        // es. smtp.office365.com
      port: Number(process.env.SMTP_PORT),  // es. 587
      secure: false,                        // STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"AI-call" <${process.env.SMTP_USER}>`, // mittente valido Office 365
      to: user.email,
      subject: "Il tuo codice di verifica",
      text: `Gentile Cliente ${user.nome}, il tuo codice di verifica è: ${code}`,
    });

    console.log("La mail è stata inviata");
  } catch (err) {
    console.error("Errore invio mail:", err);
  }

  return { message: "Codice generato" };
}
