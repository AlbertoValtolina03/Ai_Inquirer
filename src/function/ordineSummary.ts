import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function ordineSummary(userId: number, orderId: number) {
  const order = await prisma.order.findFirst({
    where: { id: orderId, userId },
    include: {
      orderLists: { include: { product: true } }, // prendo i dettagli dei prodotti collegati
    },
  });

  if (!order) throw new Error("Ordine non trovato");

  // creo array dei prodotti
  const items = order.orderLists.map((ol: any) => ({
    nome: ol.product.nome,   
    quantita: ol.quantita,   
    prezzo: ol.costo,        
  }));

  return {
    orderId: order.id,      
    costo_totale: order.costo, 
    items
  };
}
