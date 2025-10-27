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

  const code = Math.floor(100000 + Math.random() * 900000).toString(); // creazione casuali numero

  const expireTime = new Date(Date.now() + 10 * 60 * 1000); // scadenza codice

  // inserimento in db
  await prisma.user.update({
    where: { id: user.id },
    data: { last_code: code, expire_time: expireTime },
  });
  console.log(code)
  // Configuriamo il trasportatore per inviare email tramite SMTP
  // const transporter = nodemailer.createTransport({
  //  host: "smtp.gmail.com", 
  //  port: 587,              
  //  secure: false,          
  //  auth: {
  //    user: process.env.SMTP_USER, 
  //    pass: process.env.SMTP_PASS, 
  //  },
  // });
  // invio mail
  // await transporter.sendMail({
  //  from: "AI-call" , 
  //  to: user.email,                               
  //  subject: "Il tuo codice di verifica",        
  //  text: `Gentile Cliente ${user.nome} ${user.cognome}, Il tuo codice di verifica è: ${code}`,
  // });

  return { message: "Codice inviato via email" };
}
