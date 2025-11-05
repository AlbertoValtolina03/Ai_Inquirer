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
 * Recupera lo status di un ordine per un utente verificato tramite OTP.
 *
 * Flusso:
 * 1. Verifica il codice OTP dell’utente con `auth2`.
 * 2. Se il codice è valido, cerca l’ordine corrispondente a `orderId` e `userId`.
 * 3. Include i dettagli dello status collegato all’ordine.
 * 4. Restituisce un oggetto `ReturnMessage` con esito e dati dello status dell’ordine.
 *
 * @param userId - ID dell’utente che richiede lo status dell’ordine.
 * @param orderId - ID dell’ordine da recuperare.
 * @param phone - Numero di telefono associato all’utente.
 * @param code - Codice OTP inviato all’utente.
 * @returns Promise<ReturnMessage<Order>> - Oggetto con esito e dettagli ordine se trovato.
 *
 * @example
 * ```ts
 * const res = await ordineStatus(1, 10, "3923456789", "123456");
 * if(res.status === "Success") {
 *   console.log(res.response.status);
 * } else {
 *   console.log(res.message);
 * }
 * ```
 */


export async function ordineStatus(userId: number, orderId: number, phone: string, code: string ) {

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
    include: { status: true },   // prendo i dettagli dello status collegato
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