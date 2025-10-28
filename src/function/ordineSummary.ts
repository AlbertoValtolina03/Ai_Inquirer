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
 * Recupera i dettagli di un ordine per un utente verificato tramite OTP.
 *
 * Flusso:
 * 1. Verifica il codice OTP dell’utente con `auth2`.
 * 2. Se il codice è valido, cerca l’ordine corrispondente a `orderId` e `userId`.
 * 3. Include i dettagli dei prodotti presenti nell’ordine.
 * 4. Restituisce un oggetto `ReturnMessage` con esito e dati dell’ordine.
 *
 * @param userId - ID dell’utente che richiede l’ordine.
 * @param orderId - ID dell’ordine da recuperare.
 * @param phone - Numero di telefono associato all’utente.
 * @param code - Codice OTP inviato all’utente.
 * @returns Promise<ReturnMessage<Order>> - Oggetto con esito e dettagli ordine se trovato.
 *
 * @example
 * ```ts
 * const res = await ordineSummary(1, 10, "3903456789", "123456");
 * if(res.status === "Success") {
 *   console.log(res.response);
 * } else {
 *   console.log(res.message);
 * }
 * ```
 */


export async function ordineSummary(userId: number, orderId: number, phone: string, code: string) {

  const checkExpirationTime = await auth2(phone, code, false);
  
  if(checkExpirationTime.status==="Error") {
    return {
      status: "Error",
      message: "Your session has expired. Please log in again.",
      response: null,
    }
  }

  const order = await prisma.order.findFirst({
    where: { id: orderId, userId },
    include: {
      orderLists: { include: { product: true } }, // prendo i dettagli dei prodotti collegati
    },
  });

  if(!order) {
    return {
      status: "Error",
      message: "No order found.",
      response: null,
    }
  }

  return {
    status: "Success",
    message: "Order found.",
    response: order,
  }

}












