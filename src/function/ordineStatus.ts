import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function ordineStatus(userId: number, orderId: number) {
  const order = await prisma.order.findFirst({
    where: { id: orderId, userId },
    include: { status: true },   // prendo i dettagli dello status collegato
  });

  if (!order) throw new Error("Ordine non trovato");

  return {
    orderId: order.id,                  
    stato: order.status.descrizione,    
    data_partenza: order.data_partenza, 
    data_consegna: order.data_consegna ?? "Non disponibile" // se esiste la returno senno metto "Non disponibile"
  };
}
