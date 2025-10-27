import readline from "readline";
import { auth } from "./function/auth.js";
import { auth2 } from "./function/auth2.js";
import { ordineStatus } from "./function/ordineStatus.js";
import { ordineSummary } from "./function/ordineSummary.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  console.log("Benvenuto nel tuo assistente ordini!");
  console.log("--------------------------------------");

  const phone = await ask("Inserisci il tuo numero di telefono: ");
  try {
    const res1 = await auth(phone.trim());
    console.log(res1.message);
  } catch (err) {
    console.error("Errore:", (err as Error).message);
    rl.close();
    return;
  }

  const code = await ask("Inserisci il codice ricevuto via email: ");
  let userId: number;
  try {
    const res2 = await auth2(phone.trim(), code.trim());
    console.log(res2.message);
    userId = res2.userId;
  } catch (err) {
    console.error("Errore:", (err as Error).message);
    rl.close();
    return;
  }

  let continua = true;
  let orderId = await ask("\nInserisci il numero dell'ordine da controllare: ");
  while (continua) {

    const action = await ask("Vuoi sapere lo stato o il riepilogo? (stato/riepilogo): ");

    try {
      if (action.toLowerCase() === "stato") {
        const stato = await ordineStatus(userId, Number(orderId));
        console.log("\nDettagli ordine:");
        console.log(`ID ordine: ${stato.orderId}`);
        console.log(`Stato: ${stato.stato}`);
        console.log(`Partenza: ${stato.data_partenza}`);
        console.log(`Consegna: ${stato.data_consegna}`);
      } else if (action.toLowerCase() === "riepilogo") {
        const summary = await ordineSummary(userId, Number(orderId));
        console.log("\nRiepilogo ordine:");
        console.log(`Costo totale: ${summary.costo_totale}€`);
        summary.items.forEach((item: any, i: number) => {
          console.log(` ${i + 1}. ${item.nome} x${item.quantita} - ${item.prezzo}€`);
        });
      } else {
        console.log("Scelta non valida. Riprova.");
      }
    } catch (err) {
      console.error("Errore:", (err as Error).message);
    }
    const risp = await ask("Hai bisogno di altre informazioni? (si/no): ");
    if (risp.toLowerCase() === "no") {
      break;
    }

    const newOrderId = await ask("\nSe vuoi avere informazioni sullo stesso ordine premi invio, sennò digita il codice dell'ordine: ");
    if (newOrderId.trim() !== "") {
      orderId = newOrderId;
    }


  }
  

  console.log("\nGrazie per aver usato l'assistente ordini. Arrivederci!");
  rl.close();
}

main();
