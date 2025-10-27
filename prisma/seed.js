import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function main() {

  console.log("Inserisco i nuovi dati");
  
  const utenti = [
    { nome: "Alberto", cognome: "Valtolina", email: "alberto.valtolina0@gmail.com", num_telefono: "3275305690" },
    { nome: "Giulia", cognome: "Bianchi", email: "giulia.bianchi@yahoo.it", num_telefono: "3402223344" },
    { nome: "Marco", cognome: "Verdi", email: "marco.verdi@gmail.com", num_telefono: "3403334455" },
    { nome: "Sara", cognome: "Neri", email: "sara.neri@hotmail.com", num_telefono: "3404445566" },
    { nome: "Alessandro", cognome: "Romano", email: "alessandro.romano@gmail.com", num_telefono: "3405556677" },
    { nome: "Elena", cognome: "Gallo", email: "elena.gallo@gmail.com", num_telefono: "3406667788" },
    { nome: "Davide", cognome: "Moretti", email: "davide.moretti@gmail.com", num_telefono: "3407778899" },
    { nome: "Chiara", cognome: "Greco", email: "chiara.greco@gmail.com", num_telefono: "3408889900" },
    { nome: "Francesco", cognome: "Conti", email: "francesco.conti@gmail.com", num_telefono: "3409991122" },
    { nome: "Martina", cognome: "Lombardi", email: "martina.lombardi@gmail.com", num_telefono: "3410001133" },
    { nome: "Andrea", cognome: "Ricci", email: "andrea.ricci@gmail.com", num_telefono: "3411112244" },
    { nome: "Federica", cognome: "Barbieri", email: "federica.barbieri@gmail.com", num_telefono: "3412223355" },
    { nome: "Matteo", cognome: "De Luca", email: "matteo.deluca@gmail.com", num_telefono: "3413334466" },
    { nome: "Roberta", cognome: "Costa", email: "roberta.costa@gmail.com", num_telefono: "3414445577" },
    { nome: "Simone", cognome: "Giordano", email: "simone.giordano@gmail.com", num_telefono: "3415556688" },
    { nome: "Valentina", cognome: "Rizzi", email: "valentina.rizzi@gmail.com", num_telefono: "3416667799" },
    { nome: "Emanuele", cognome: "Marino", email: "emanuele.marino@gmail.com", num_telefono: "3417778800" },
    { nome: "Laura", cognome: "Ferrari", email: "laura.ferrari@gmail.com", num_telefono: "3418889911" },
    { nome: "Paolo", cognome: "Fontana", email: "paolo.fontana@gmail.com", num_telefono: "3419991122" },
    { nome: "Silvia", cognome: "Gentile", email: "silvia.gentile@gmail.com", num_telefono: "3420002233" },
    { nome: "Luca", cognome: "Esposito", email: "luca.esposito@gmail.com", num_telefono: "3421112344" },
    { nome: "Anna", cognome: "Santoro", email: "anna.santoro@gmail.com", num_telefono: "3422223455" },
    { nome: "Giovanni", cognome: "Russo", email: "giovanni.russo@gmail.com", num_telefono: "3423334566" },
    { nome: "Maria", cognome: "Bruno", email: "maria.bruno@gmail.com", num_telefono: "3424445677" },
    { nome: "Antonio", cognome: "Caruso", email: "antonio.caruso@gmail.com", num_telefono: "3425556788" },
    { nome: "Francesca", cognome: "Ferrara", email: "francesca.ferrara@gmail.com", num_telefono: "3426667899" },
    { nome: "Lorenzo", cognome: "Orlando", email: "lorenzo.orlando@gmail.com", num_telefono: "3427778900" },
    { nome: "Alessia", cognome: "Marchetti", email: "alessia.marchetti@gmail.com", num_telefono: "3428889011" },
    { nome: "Riccardo", cognome: "Mancini", email: "riccardo.mancini@gmail.com", num_telefono: "3429990122" },
    { nome: "Stefania", cognome: "Parisi", email: "stefania.parisi@gmail.com", num_telefono: "3430001233" },
    { nome: "Gabriele", cognome: "Colombo", email: "gabriele.colombo@gmail.com", num_telefono: "3431112344" },
    { nome: "Beatrice", cognome: "Leone", email: "beatrice.leone@gmail.com", num_telefono: "3432223455" },
    { nome: "Michele", cognome: "Longo", email: "michele.longo@gmail.com", num_telefono: "3433334566" },
    { nome: "Claudia", cognome: "Martini", email: "claudia.martini@gmail.com", num_telefono: "3434445677" },
    { nome: "Daniele", cognome: "Battaglia", email: "daniele.battaglia@gmail.com", num_telefono: "3435556788" },
    { nome: "Ilaria", cognome: "Palmieri", email: "ilaria.palmieri@gmail.com", num_telefono: "3436667899" },
    { nome: "Stefano", cognome: "Vitale", email: "stefano.vitale@gmail.com", num_telefono: "3437778900" },
    { nome: "Cristina", cognome: "Serra", email: "cristina.serra@gmail.com", num_telefono: "3438889011" },
    { nome: "Filippo", cognome: "Sala", email: "filippo.sala@gmail.com", num_telefono: "3439990122" },
    { nome: "Monica", cognome: "Monti", email: "monica.monti@gmail.com", num_telefono: "3440001233" }
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
    { SKU: "ELEC-021", nome: "Google Pixel 8", descrizione: "6.2\", 128GB, AI Camera", prezzo: 699.00, quantita: 85 },
    { SKU: "ELEC-022", nome: "OnePlus 12", descrizione: "6.7\", 256GB, Snapdragon 8 Gen 3", prezzo: 799.00, quantita: 95 },
    { SKU: "ELEC-023", nome: "Xiaomi 14 Pro", descrizione: "6.73\", 512GB, Leica Camera", prezzo: 999.00, quantita: 75 },
    { SKU: "ELEC-024", nome: "Samsung Galaxy Z Flip5", descrizione: "Pieghevole, 256GB", prezzo: 1099.00, quantita: 50 },
    { SKU: "ELEC-025", nome: "iPhone 14", descrizione: "6.1\", 128GB", prezzo: 799.00, quantita: 110 },
    { SKU: "ELEC-026", nome: "Motorola Edge 40", descrizione: "6.55\", 256GB", prezzo: 599.00, quantita: 100 },
    { SKU: "ELEC-003", nome: "MacBook Air M2", descrizione: "13.6\", 8GB RAM, 256GB SSD", prezzo: 1349.00, quantita: 60 },
    { SKU: "ELEC-004", nome: "Lenovo ThinkPad X1", descrizione: "14\", Intel i7, 16GB RAM, 512GB SSD", prezzo: 1699.00, quantita: 40 },
    { SKU: "ELEC-027", nome: "Dell XPS 15", descrizione: "15.6\", Intel i9, 32GB RAM, 1TB SSD", prezzo: 2299.00, quantita: 35 },
    { SKU: "ELEC-028", nome: "MacBook Pro 16\" M3", descrizione: "16GB RAM, 512GB SSD", prezzo: 2799.00, quantita: 45 },
    { SKU: "ELEC-029", nome: "ASUS ROG Zephyrus", descrizione: "Gaming, RTX 4070, 16GB", prezzo: 1999.00, quantita: 30 },
    { SKU: "ELEC-030", nome: "HP Pavilion 15", descrizione: "15.6\", Ryzen 7, 16GB RAM", prezzo: 899.00, quantita: 80 },
    { SKU: "ELEC-031", nome: "Microsoft Surface Laptop 5", descrizione: "13.5\", Intel i7, 16GB", prezzo: 1599.00, quantita: 55 },
    { SKU: "ELEC-005", nome: "Apple iPad Air 5", descrizione: "10.9\", 64GB, WiFi", prezzo: 729.00, quantita: 70 },
    { SKU: "ELEC-032", nome: "iPad Pro 12.9\"", descrizione: "M2, 256GB, WiFi", prezzo: 1399.00, quantita: 50 },
    { SKU: "ELEC-033", nome: "Samsung Galaxy Tab S9", descrizione: "11\", 128GB, S Pen", prezzo: 799.00, quantita: 65 },
    { SKU: "ELEC-034", nome: "Microsoft Surface Pro 9", descrizione: "13\", Intel i5, 8GB", prezzo: 1099.00, quantita: 45 },
    { SKU: "ELEC-006", nome: "Xiaomi Mi Band 8", descrizione: "Smartband fitness, OLED 1.6\"", prezzo: 59.90, quantita: 200 },
    { SKU: "ELEC-014", nome: "Samsung Galaxy Watch 6", descrizione: "Smartwatch 44mm, LTE", prezzo: 319.00, quantita: 90 },
    { SKU: "ELEC-015", nome: "Apple Watch Series 9", descrizione: "GPS, 45mm, Sport Band", prezzo: 459.00, quantita: 70 },
    { SKU: "ELEC-035", nome: "Garmin Forerunner 965", descrizione: "GPS running, AMOLED", prezzo: 649.00, quantita: 55 },
    { SKU: "ELEC-036", nome: "Fitbit Charge 6", descrizione: "Fitness tracker, GPS", prezzo: 179.00, quantita: 120 },
    { SKU: "ELEC-037", nome: "Huawei Watch GT 4", descrizione: "46mm, 2 settimane batteria", prezzo: 249.00, quantita: 85 },
    { SKU: "ELEC-007", nome: "Sony WH-1000XM5", descrizione: "Cuffie wireless con ANC", prezzo: 419.00, quantita: 80 },
    { SKU: "ELEC-019", nome: "Bose SoundLink Flex", descrizione: "Speaker Bluetooth impermeabile", prezzo: 169.00, quantita: 140 },
    { SKU: "ELEC-038", nome: "AirPods Pro 2", descrizione: "USB-C, ANC, Audio Spaziale", prezzo: 279.00, quantita: 150 },
    { SKU: "ELEC-039", nome: "Samsung Galaxy Buds2 Pro", descrizione: "ANC, Hi-Fi 24bit", prezzo: 229.00, quantita: 110 },
    { SKU: "ELEC-040", nome: "JBL Flip 6", descrizione: "Speaker portatile IP67", prezzo: 129.00, quantita: 160 },
    { SKU: "ELEC-041", nome: "Beats Studio Buds+", descrizione: "True wireless, ANC", prezzo: 199.00, quantita: 95 },
    { SKU: "ELEC-042", nome: "Sonos Beam Gen 2", descrizione: "Soundbar Dolby Atmos", prezzo: 499.00, quantita: 45 },
    { SKU: "ELEC-008", nome: "Samsung 4K Smart TV 55\"", descrizione: "Crystal UHD, HDR10+", prezzo: 649.00, quantita: 50 },
    { SKU: "ELEC-018", nome: "LG Ultragear 27\"", descrizione: "Monitor QHD 165Hz", prezzo: 379.00, quantita: 60 },
    { SKU: "ELEC-043", nome: "LG OLED 65\"", descrizione: "4K, HDMI 2.1, G4", prezzo: 2499.00, quantita: 25 },
    { SKU: "ELEC-044", nome: "Samsung Odyssey G9", descrizione: "49\" Ultra-wide, 240Hz", prezzo: 1599.00, quantita: 20 },
    { SKU: "ELEC-045", nome: "Dell UltraSharp 32\"", descrizione: "4K IPS, USB-C Hub", prezzo: 799.00, quantita: 40 },
    { SKU: "ELEC-046", nome: "Sony Bravia XR 75\"", descrizione: "4K HDR, Google TV", prezzo: 3299.00, quantita: 15 },
    { SKU: "ELEC-009", nome: "Nintendo Switch OLED", descrizione: "Console portatile 7\" OLED", prezzo: 349.00, quantita: 100 },
    { SKU: "ELEC-010", nome: "PlayStation 5", descrizione: "825GB SSD, DualSense", prezzo: 549.00, quantita: 60 },
    { SKU: "ELEC-011", nome: "Xbox Series X", descrizione: "1TB SSD, 4K 120Hz", prezzo: 529.00, quantita: 70 },
    { SKU: "ELEC-047", nome: "Steam Deck OLED", descrizione: "512GB, 7.4\" HDR OLED", prezzo: 569.00, quantita: 55 },
    { SKU: "ELEC-048", nome: "Meta Quest 3", descrizione: "VR Headset, 128GB", prezzo: 549.00, quantita: 40 },
    { SKU: "ELEC-049", nome: "PlayStation VR2", descrizione: "4K HDR, eye tracking", prezzo: 599.00, quantita: 35 },
    { SKU: "ELEC-012", nome: "GoPro Hero 12", descrizione: "Action cam 5.3K60, stabilizzazione", prezzo: 449.00, quantita: 80 },
    { SKU: "ELEC-013", nome: "DJI Mini 4 Pro", descrizione: "Drone 4K, 249g, GPS", prezzo: 999.00, quantita: 30 },
    { SKU: "ELEC-050", nome: "Canon EOS R6 Mark II", descrizione: "Full Frame 24MP, 4K60", prezzo: 2699.00, quantita: 20 },
    { SKU: "ELEC-051", nome: "Sony A7 IV", descrizione: "33MP, stabilizzazione 5 assi", prezzo: 2599.00, quantita: 25 },
    { SKU: "ELEC-052", nome: "DJI Osmo Pocket 3", descrizione: "Gimbal camera 4K120", prezzo: 519.00, quantita: 45 },
    { SKU: "ELEC-053", nome: "Insta360 X3", descrizione: "Action cam 360°, 5.7K", prezzo: 479.00, quantita: 35 },
    { SKU: "ELEC-016", nome: "Logitech MX Master 3S", descrizione: "Mouse wireless ergonomico", prezzo: 109.00, quantita: 150 },
    { SKU: "ELEC-017", nome: "Razer BlackWidow V4", descrizione: "Tastiera meccanica RGB", prezzo: 179.00, quantita: 100 },
    { SKU: "ELEC-054", nome: "Logitech MX Keys", descrizione: "Tastiera wireless illuminata", prezzo: 119.00, quantita: 130 },
    { SKU: "ELEC-055", nome: "Razer DeathAdder V3", descrizione: "Mouse gaming 30K DPI", prezzo: 89.00, quantita: 140 },
    { SKU: "ELEC-056", nome: "Blue Yeti X", descrizione: "Microfono USB professionale", prezzo: 169.00, quantita: 70 },
    { SKU: "ELEC-057", nome: "Elgato Stream Deck", descrizione: "Controller streaming 15 tasti", prezzo: 149.00, quantita: 60 },
    { SKU: "ELEC-020", nome: "Kindle Paperwhite", descrizione: "6.8\", 16GB, retroilluminato", prezzo: 159.00, quantita: 200 },
    { SKU: "ELEC-058", nome: "Amazon Echo Dot 5", descrizione: "Smart speaker Alexa", prezzo: 59.00, quantita: 180 },
    { SKU: "ELEC-059", nome: "Google Nest Hub", descrizione: "Display smart 7\"", prezzo: 99.00, quantita: 120 },
    { SKU: "ELEC-060", nome: "Philips Hue Starter Kit", descrizione: "3 lampadine + bridge", prezzo: 149.00, quantita: 90 },
    { SKU: "ELEC-061", nome: "Ring Video Doorbell", descrizione: "Videocitofono smart 1080p", prezzo: 99.00, quantita: 75 },
    { SKU: "ELEC-062", nome: "Nest Thermostat", descrizione: "Termostato smart WiFi", prezzo: 249.00, quantita: 55 },
    { SKU: "ELEC-063", nome: "TP-Link Deco X60", descrizione: "Mesh WiFi 6, 3-pack", prezzo: 279.00, quantita: 65 },
    { SKU: "ELEC-064", nome: "ASUS RT-AX88U", descrizione: "Router WiFi 6, gaming", prezzo: 349.00, quantita: 50 },
    { SKU: "ELEC-065", nome: "Netgear Orbi WiFi 6E", descrizione: "Sistema mesh tri-band", prezzo: 599.00, quantita: 30 },
    { SKU: "ELEC-066", nome: "Samsung T7 SSD 1TB", descrizione: "SSD esterno USB-C", prezzo: 129.00, quantita: 150 },
    { SKU: "ELEC-067", nome: "WD My Passport 5TB", descrizione: "HDD esterno USB 3.0", prezzo: 139.00, quantita: 110 },
    { SKU: "ELEC-068", nome: "SanDisk Extreme Pro 256GB", descrizione: "MicroSD UHS-I", prezzo: 49.00, quantita: 200 },
    { SKU: "ELEC-069", nome: "Synology DS220+", descrizione: "NAS 2-bay", prezzo: 349.00, quantita: 40 },
    { SKU: "ELEC-070", nome: "Anker PowerCore 20000", descrizione: "Power bank 20000mAh", prezzo: 59.00, quantita: 180 },
    { SKU: "ELEC-071", nome: "Belkin 3-in-1 Wireless", descrizione: "Caricatore iPhone+Watch+AirPods", prezzo: 149.00, quantita: 95 },
    { SKU: "ELEC-072", nome: "APC Back-UPS 650VA", descrizione: "UPS con 6 prese", prezzo: 99.00, quantita: 70 },
  ];
  await prisma.product.createMany({ data: prodotti, skipDuplicates: true });

  // Date casuali
  const getRandomDate = (startDate, endDate) => {
    const start = startDate.getTime();
    const end = endDate.getTime();
    return new Date(start + Math.random() * (end - start));
  };

  // Genera ordini per tutti gli utenti
  const ordini = [];
  const orderList = [];
  let orderId = 1;
  
  const indirizzi = [
    "Via Roma", "Via Milano", "Corso Italia", "Via Garibaldi", "Via Dante",
    "Via Mazzini", "Via Cavour", "Via Verdi", "Via Manzoni", "Via Torino",
    "Via Savona", "Via Piave", "Via Bari", "Via Firenze", "Corso Como",
    "Via Napoli", "Via Piacenza", "Via Modena", "Via Venezia", "Via Bologna"
  ];
  
  const citta = [
    "Milano", "Torino", "Napoli", "Firenze", "Roma", "Genova", "Bologna",
    "Bari", "Venezia", "Padova", "Palermo", "Verona", "Lecce", "Parma",
    "Catania", "Bergamo", "Mantova", "Pisa", "Ancona", "Brescia"
  ];

  const statusDistribution = [1, 2, 3, 4, 4, 4, 5];

  for (let userId = 1; userId <= 40; userId++) {
    const numOrdini = Math.floor(Math.random() * 6) + 3;
    
    for (let i = 0; i < numOrdini; i++) {
      const numProdotti = Math.floor(Math.random() * 3) + 1;
      let costoTotale = 0;
      const prodottiInOrdine = [];
      
      for (let j = 0; j < numProdotti; j++) {
        const productId = Math.floor(Math.random() * 72) + 1;
        const quantita = Math.floor(Math.random() * 2) + 1;
        const prodotto = prodotti[productId - 1];
        
        if (prodotto && !prodottiInOrdine.includes(productId)) {
          const costoProdotto = prodotto.prezzo * quantita;
          costoTotale += costoProdotto;
          
          orderList.push({
            orderId: orderId,
            productId: productId,
            quantita: quantita,
            costo: costoProdotto
          });
          
          prodottiInOrdine.push(productId);
        }
      }
      
      const dataPartenza = getRandomDate(new Date("2024-11-01"), new Date("2025-02-25"));
      const dataConsegna = new Date(dataPartenza);
      dataConsegna.setDate(dataConsegna.getDate() + Math.floor(Math.random() * 5) + 2); 
      
      const indirizzo = `${indirizzi[Math.floor(Math.random() * indirizzi.length)]} ${Math.floor(Math.random() * 100) + 1}`;
      const citta_scelta = citta[Math.floor(Math.random() * citta.length)];
      
      let statusId;
      if (i < 2) {
        statusId = statusDistribution[Math.floor(Math.random() * 3)]; 
      } else if (i === numOrdini - 1 && Math.random() > 0.8) {
        statusId = Math.random() > 0.5 ? 5 : 6;
      } else {
        statusId = 4;
      }
      
      ordini.push({
        userId: userId,
        spedizione: `${indirizzo}, ${citta_scelta}`,
        costo: parseFloat(costoTotale.toFixed(2)),
        data_partenza: dataPartenza,
        data_consegna: dataConsegna,
        statusId: statusId
      });
      
      orderId++;
    }
  }

  await prisma.order.createMany({ data: ordini, skipDuplicates: true });
  await prisma.orderList.createMany({ data: orderList, skipDuplicates: true });

  console.log(`Dati inseriti con successo:`);
  console.log(`- ${utenti.length} utenti`);
  console.log(`- ${prodotti.length} prodotti`);
  console.log(`- ${ordini.length} ordini`);
  console.log(`- ${orderList.length} righe di orderList`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });