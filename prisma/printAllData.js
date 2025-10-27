import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("===== UTENTI =====");
    const users = await prisma.user.findMany();
    console.log(users);

    console.log("\n===== PRODOTTI =====");
    const products = await prisma.product.findMany();
    console.log(products);

    console.log("\n===== ORDINI =====");
    const orders = await prisma.order.findMany();
    console.log(orders);

    console.log("\n===== ORDER LIST =====");
    const orderLists = await prisma.orderList.findMany();
    console.log(orderLists);

    console.log("\n===== STATUS =====");
    const status = await prisma.status.findMany();
    console.log(status);

  } catch (err) {
    console.error("Errore nel recuperare i dati:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
