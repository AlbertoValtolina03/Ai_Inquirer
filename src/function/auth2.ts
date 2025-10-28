import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
//TODO: Dichiarare interface della risposta

//TODO: Descrizione TSDoc della funzione
export async function auth2(phone: string, code: string, first_access = false) {
  // Se l'utente esiste e si ha il permesso di accedere, ritorno true altrimenti false
  const user = await prisma.user.findUnique({
    where: {
      num_telefono: phone,
      last_code: code,
      expire_time: {
        //TODO: Check su tutte le date generate, impostare la timezone corretta
        lte: new Date(),
      },
    },
  });

  if (user) {
    //OK
  } else {
    if (first_access) {
      // Codice sbagliato
    } else {
      // Sessione scaduta
    }
  }

  // // resettiamo codice e expire_time a null
  // await prisma.user.update({
  //   where: { id: user.id },
  //   data: { last_code: null, expire_time: null },
  // });

  // return { message: "Autenticazione OK", userId: user.id };
}
