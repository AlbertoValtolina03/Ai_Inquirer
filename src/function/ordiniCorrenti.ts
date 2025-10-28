import { PrismaClient } from "@prisma/client";
import { auth2 } from "./auth2.js";

const prisma = new PrismaClient();


//TODO: Dichiarare interface della risposta
interface ReturnMessage {
  status: "Error" | "Success";
  message: string;
  response: string | null;
}


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
