import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function auth2(phone: string, code: string) {
  const user = await prisma.user.findUnique({
    where: { num_telefono: phone }, // ricerca utente tramite numero
  });

  if (!user) throw new Error("Utente non trovato");
  if (!user.last_code || !user.expire_time)
    throw new Error("Nessun codice generato");

  if (new Date() > user.expire_time) throw new Error("Codice scaduto"); // controllo codice scaduto

  if (user.last_code !== code) throw new Error("Codice errato"); // controllo codice

  // resettiamo codice e expire_time a null
  await prisma.user.update({
    where: { id: user.id },
    data: { last_code: null, expire_time: null },
  });

  return { message: "Autenticazione OK", userId: user.id };
}
