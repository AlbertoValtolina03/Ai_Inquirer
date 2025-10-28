import { PrismaClient } from "@prisma/client";
import { auth2 } from "./auth2.js";

const prisma = new PrismaClient();


//TODO: Dichiarare interface della risposta
interface ReturnMessage {
  status: "Error" | "Success";
  message: string;
  response: string | null;
}

/**
 * Recupera tutti gli ordini correnti (non consegnati o cancellati) per un utente verificato tramite OTP.
 *
 * Flusso:
 * 1. Verifica il codice OTP dell’utente con `auth2`.
 * 2. Se il codice è valido, cerca tutti gli ordini attivi (`status.descrizione` non in ["CONSEGNATO", "CANCELLATO"]).
 * 3. Include i dettagli dello status e dei prodotti presenti negli ordini.
 * 4. Ordina i risultati per `data_partenza` decrescente.
 * 5. Restituisce un oggetto `ReturnMessage` con esito e lista degli ordini.
 *
 * @param userId - ID dell’utente che richiede gli ordini.
 * @param phone - Numero di telefono associato all’utente.
 * @param code - Codice OTP inviato all’utente.
 * @returns Promise<ReturnMessage<Order[]>> - Oggetto con esito e lista degli ordini trovati.
 *
 * @example
 * ```ts
 * const res = await ordiniCorrenti(1, "390123456789", "123456");
 * if(res.status === "Success") {
 *   console.log(res.response); // Lista ordini attivi
 * } else {
 *   console.log(res.message);
 * }
 * ```
 */


export async function ordiniCorrenti(userId: number, phone: string, code: string) {

  const checkExpirationTime = await auth2(phone, code, false);
  
  if(checkExpirationTime.status==="Error") {
    return {
      status: "Error",
      message: "Your session has expired. Please log in again.",
      response: null,
    }
  }

  const ordini = await prisma.order.findMany({
    where: {
      userId: userId,
      status: {
        descrizione: {
          notIn: ["CONSEGNATO", "CANCELLATO"]
        }
      }
    },
    include: {
      status: true,
      orderLists: {
        include: {
          product: true
        }
      }
    },
    orderBy: {
      data_partenza: 'desc'
    }
  });

  if(ordini.length === 0)
  {
    return {
      status: "Error",
      message: "No orders found.",
      response: null,
    }
  }

  return {
    status: "Success",
    message: "Orders found.",
    response: ordini,
  }

}


