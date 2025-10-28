import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// per fuso orario corretto
const dataCorrente = new Date();
const opzioniFusoOrario = { timeZone: "Europe/Rome" };

//TODO: Dichiarare interface della risposta
interface ReturnMessage {
  status: "Error" | "Success";
  message: string;
  response: string | null;
}

//TODO: Descrizione TSDoc della funzione
export async function auth2(phone: string, code: string, first_access = false) {
  const user = await prisma.user.findUnique({
    where: {
      num_telefono: phone,
      last_code: code,
      expire_time: {
        //TODO: Check su tutte le date generate, impostare la timezone corretta
        gte: dataCorrente
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
