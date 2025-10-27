import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function main() {

  console.log("Inserisco i nuovi dati");
  const utenti = [
    { nome: "Alberto", cognome: "Valtolina", email: "alberto.valtolina0@gmail.com", num_telefono: "+393275305689" },
    { nome: "Giulia", cognome: "Bianchi", email: "giulia.bianchi@yahoo.it", num_telefono: "+393402223344" },
    { nome: "Marco", cognome: "Verdi", email: "marco.verdi@gmail.com", num_telefono: "+393403334455" },
    { nome: "Sara", cognome: "Neri", email: "sara.neri@hotmail.com", num_telefono: "+393404445566" },
    { nome: "Alessandro", cognome: "Romano", email: "alessandro.romano@gmail.com", num_telefono: "+393405556677" },
    { nome: "Elena", cognome: "Gallo", email: "elena.gallo@gmail.com", num_telefono: "+393406667788" },
    { nome: "Davide", cognome: "Moretti", email: "davide.moretti@gmail.com", num_telefono: "+393407778899" },
    { nome: "Chiara", cognome: "Greco", email: "chiara.greco@gmail.com", num_telefono: "+393408889900" },
    { nome: "Francesco", cognome: "Conti", email: "francesco.conti@gmail.com", num_telefono: "+393409991122" },
    { nome: "Martina", cognome: "Lombardi", email: "martina.lombardi@gmail.com", num_telefono: "+393410001133" },
    { nome: "Andrea", cognome: "Ricci", email: "andrea.ricci@gmail.com", num_telefono: "+393411112244" },
    { nome: "Federica", cognome: "Barbieri", email: "federica.barbieri@gmail.com", num_telefono: "+393412223355" },
    { nome: "Matteo", cognome: "De Luca", email: "matteo.deluca@gmail.com", num_telefono: "+393413334466" },
    { nome: "Roberta", cognome: "Costa", email: "roberta.costa@gmail.com", num_telefono: "+393414445577" },
    { nome: "Simone", cognome: "Giordano", email: "simone.giordano@gmail.com", num_telefono: "+393415556688" },
    { nome: "Valentina", cognome: "Rizzi", email: "valentina.rizzi@gmail.com", num_telefono: "+393416667799" },
    { nome: "Emanuele", cognome: "Marino", email: "emanuele.marino@gmail.com", num_telefono: "+393417778800" },
    { nome: "Laura", cognome: "Ferrari", email: "laura.ferrari@gmail.com", num_telefono: "+393418889911" },
    { nome: "Paolo", cognome: "Fontana", email: "paolo.fontana@gmail.com", num_telefono: "+393419991122" },
    { nome: "Silvia", cognome: "Gentile", email: "silvia.gentile@gmail.com", num_telefono: "+393420002233" }
  ];
  await prisma.user.createMany({ data: utenti, skipDuplicates: true });

  const status = [
    { descrizione: "IN MAGAZZINO" },
    { descrizione: "IN CORSO" },
    { descrizione: "IN CONSEGNA" },
    { descrizione: "CONSEGNATO" },
    { descrizione: "CANCELLATO" },
    { descrizione: "NON PAGATO" },

  ];
  await prisma.status.createMany({ data: status, skipDuplicates: true });

  const prodotti = [
    { SKU: "ELEC-001", nome: "Smartphone Galaxy S23", descrizione: "Display AMOLED 6.1\", 128GB, 8GB RAM", prezzo: 849.00, quantita: 120 },
    { SKU: "ELEC-002", nome: "iPhone 15 Pro", descrizione: "Display 6.1\", 256GB, Titanium Gray", prezzo: 1299.00, quantita: 90 },
    { SKU: "ELEC-003", nome: "MacBook Air M2", descrizione: "13.6\", 8GB RAM, 256GB SSD", prezzo: 1349.00, quantita: 60 },
    { SKU: "ELEC-004", nome: "Lenovo ThinkPad X1", descrizione: "14\", Intel i7, 16GB RAM, 512GB SSD", prezzo: 1699.00, quantita: 40 },
    { SKU: "ELEC-005", nome: "Apple iPad Air 5", descrizione: "10.9\", 64GB, WiFi", prezzo: 729.00, quantita: 70 },
    { SKU: "ELEC-006", nome: "Xiaomi Mi Band 8", descrizione: "Smartband fitness, OLED 1.6\"", prezzo: 59.90, quantita: 200 },
    { SKU: "ELEC-007", nome: "Sony WH-1000XM5", descrizione: "Cuffie wireless con ANC", prezzo: 419.00, quantita: 80 },
    { SKU: "ELEC-008", nome: "Samsung 4K Smart TV 55\"", descrizione: "Crystal UHD, HDR10+", prezzo: 649.00, quantita: 50 },
    { SKU: "ELEC-009", nome: "Nintendo Switch OLED", descrizione: "Console portatile 7\" OLED", prezzo: 349.00, quantita: 100 },
    { SKU: "ELEC-010", nome: "PlayStation 5", descrizione: "825GB SSD, DualSense", prezzo: 549.00, quantita: 60 },
    { SKU: "ELEC-011", nome: "Xbox Series X", descrizione: "1TB SSD, 4K 120Hz", prezzo: 529.00, quantita: 70 },
    { SKU: "ELEC-012", nome: "GoPro Hero 12", descrizione: "Action cam 5.3K60, stabilizzazione", prezzo: 449.00, quantita: 80 },
    { SKU: "ELEC-013", nome: "DJI Mini 4 Pro", descrizione: "Drone 4K, 249g, GPS", prezzo: 999.00, quantita: 30 },
    { SKU: "ELEC-014", nome: "Samsung Galaxy Watch 6", descrizione: "Smartwatch 44mm, LTE", prezzo: 319.00, quantita: 90 },
    { SKU: "ELEC-015", nome: "Apple Watch Series 9", descrizione: "GPS, 45mm, Sport Band", prezzo: 459.00, quantita: 70 },
    { SKU: "ELEC-016", nome: "Logitech MX Master 3S", descrizione: "Mouse wireless ergonomico", prezzo: 109.00, quantita: 150 },
    { SKU: "ELEC-017", nome: "Razer BlackWidow V4", descrizione: "Tastiera meccanica RGB", prezzo: 179.00, quantita: 100 },
    { SKU: "ELEC-018", nome: "LG Ultragear 27\"", descrizione: "Monitor QHD 165Hz", prezzo: 379.00, quantita: 60 },
    { SKU: "ELEC-019", nome: "Bose SoundLink Flex", descrizione: "Speaker Bluetooth impermeabile", prezzo: 169.00, quantita: 140 },
    { SKU: "ELEC-020", nome: "Kindle Paperwhite", descrizione: "6.8\", 16GB, retroilluminato", prezzo: 159.00, quantita: 200 },
  ];
  await prisma.product.createMany({ data: prodotti, skipDuplicates: true });

  const ordini = [
    { userId: 1, spedizione: "Via Roma 10, Milano", costo: 849.00, data_partenza: new Date("2025-01-02"), data_consegna: new Date("2025-01-04"), statusId: 4 },
    { userId: 2, spedizione: "Via Milano 25, Torino", costo: 459.00, data_partenza: new Date("2025-01-05"), data_consegna: new Date("2025-01-08"), statusId: 3 },
    { userId: 3, spedizione: "Corso Italia 12, Napoli", costo: 1349.00, data_partenza: new Date("2025-01-10"), data_consegna: new Date("2025-01-13"), statusId: 4 },
    { userId: 4, spedizione: "Via Garibaldi 33, Firenze", costo: 109.00, data_partenza: new Date("2025-01-15"), data_consegna: new Date("2025-01-17"), statusId: 5 },
    { userId: 5, spedizione: "Via Dante 45, Roma", costo: 549.00, data_partenza: new Date("2025-01-18"), data_consegna: new Date("2025-01-21"), statusId: 3 },
    { userId: 6, spedizione: "Via Mazzini 8, Genova", costo: 649.00, data_partenza: new Date("2025-01-20"), data_consegna: new Date("2025-01-23"), statusId: 2 },
    { userId: 7, spedizione: "Via Cavour 15, Bologna", costo: 699.00, data_partenza: new Date("2025-01-22"), data_consegna: new Date("2025-01-25"), statusId: 4 },
    { userId: 8, spedizione: "Via Verdi 99, Bari", costo: 459.00, data_partenza: new Date("2025-01-24"), data_consegna: new Date("2025-01-26"), statusId: 4 },
    { userId: 9, spedizione: "Via Manzoni 18, Venezia", costo: 319.00, data_partenza: new Date("2025-01-26"), data_consegna: new Date("2025-01-28"), statusId: 3 },
    { userId: 10, spedizione: "Via Torino 7, Padova", costo: 179.00, data_partenza: new Date("2025-01-27"), data_consegna: new Date("2025-01-29"), statusId: 1 },
    { userId: 11, spedizione: "Via Savona 22, Palermo", costo: 849.00, data_partenza: new Date("2025-01-29"), data_consegna: new Date("2025-02-02"), statusId: 2 },
    { userId: 12, spedizione: "Via Piave 14, Verona", costo: 159.00, data_partenza: new Date("2025-02-01"), data_consegna: new Date("2025-02-03"), statusId: 4 },
    { userId: 13, spedizione: "Via Bari 3, Lecce", costo: 1699.00, data_partenza: new Date("2025-02-02"), data_consegna: new Date("2025-02-06"), statusId: 3 },
    { userId: 14, spedizione: "Via Firenze 45, Parma", costo: 459.00, data_partenza: new Date("2025-02-03"), data_consegna: new Date("2025-02-05"), statusId: 4 },
    { userId: 15, spedizione: "Corso Como 10, Milano", costo: 179.00, data_partenza: new Date("2025-02-05"), data_consegna: new Date("2025-02-07"), statusId: 5 },
    { userId: 16, spedizione: "Via Napoli 4, Catania", costo: 699.00, data_partenza: new Date("2025-02-06"), data_consegna: new Date("2025-02-09"), statusId: 2 },
    { userId: 17, spedizione: "Via Torino 88, Bergamo", costo: 529.00, data_partenza: new Date("2025-02-07"), data_consegna: new Date("2025-02-10"), statusId: 3 },
    { userId: 18, spedizione: "Via Roma 1, Mantova", costo: 449.00, data_partenza: new Date("2025-02-09"), data_consegna: new Date("2025-02-12"), statusId: 4 },
    { userId: 19, spedizione: "Via Piacenza 12, Pisa", costo: 849.00, data_partenza: new Date("2025-02-10"), data_consegna: new Date("2025-02-13"), statusId: 2 },
    { userId: 20, spedizione: "Via Modena 8, Ancona", costo: 159.00, data_partenza: new Date("2025-02-11"), data_consegna: new Date("2025-02-13"), statusId: 4 },
  ];
  await prisma.order.createMany({ data: ordini, skipDuplicates: true });

  const orderList = [
    { orderId: 1, productId: 1, quantita: 1, costo: 849.00 },
    { orderId: 2, productId: 5, quantita: 1, costo: 459.00 },
    { orderId: 3, productId: 3, quantita: 1, costo: 1349.00 },
    { orderId: 4, productId: 16, quantita: 1, costo: 109.00 },
    { orderId: 5, productId: 10, quantita: 1, costo: 549.00 },
    { orderId: 6, productId: 8, quantita: 1, costo: 649.00 },
    { orderId: 7, productId: 7, quantita: 1, costo: 419.00 },
    { orderId: 8, productId: 15, quantita: 1, costo: 459.00 },
    { orderId: 9, productId: 14, quantita: 1, costo: 319.00 },
    { orderId: 10, productId: 17, quantita: 1, costo: 179.00 },
    { orderId: 11, productId: 2, quantita: 1, costo: 849.00 },
    { orderId: 12, productId: 20, quantita: 1, costo: 159.00 },
    { orderId: 13, productId: 4, quantita: 1, costo: 1699.00 },
    { orderId: 14, productId: 15, quantita: 1, costo: 459.00 },
    { orderId: 15, productId: 17, quantita: 1, costo: 179.00 },
    { orderId: 16, productId: 7, quantita: 1, costo: 699.00 },
    { orderId: 17, productId: 11, quantita: 1, costo: 529.00 },
    { orderId: 18, productId: 12, quantita: 1, costo: 449.00 },
    { orderId: 19, productId: 1, quantita: 1, costo: 849.00 },
    { orderId: 20, productId: 20, quantita: 1, costo: 159.00 },
  ];
  await prisma.orderList.createMany({ data: orderList, skipDuplicates: true });

  console.log("Dati inseriti con successo");
}

main()
// se avviene un errore nel main, viene eseguita la funzione catch, che dice che c'è un errore e poi ferma il codice
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  // disconnette il database in ogni caso, sia se c'è errore sia non
  .finally(async () => {
    await prisma.$disconnect();
  });
