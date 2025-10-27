import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function ordiniCorrenti(userId: number) {
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

  if (ordini.length === 0) {
    throw new Error("Non hai ordini in corso");
  }

  return ordini.map(ordine => ({
    orderId: ordine.id,
    stato: ordine.status.descrizione,
    data_partenza: ordine.data_partenza.toLocaleDateString('it-IT'),
    data_consegna: ordine.data_consegna ? ordine.data_consegna.toLocaleDateString('it-IT') : 'Da definire',
    spedizione: ordine.spedizione,
    costo_totale: ordine.costo,
    items: ordine.orderLists.map(item => ({
      nome: item.product.nome,
      quantita: item.quantita,
      prezzo: item.costo
    }))
  }));
}

export { ordiniCorrenti };