import { PrismaClient } from "@prisma/client";
import { auth2 } from "./auth2.js";

const prisma = new PrismaClient();

//TODO: Dichiarare interface della risposta
interface ReturnMessage {
  status: "Error" | "Success";
  message: string;
  response: string | null;
}

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
