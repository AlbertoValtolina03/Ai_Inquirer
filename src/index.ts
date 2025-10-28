import { auth } from "./function/auth.js";
import { auth2 } from "./function/auth2.js";
import { ordineStatus } from "./function/ordineStatus.js";
import { ordineSummary } from "./function/ordineSummary.js";
import { ordiniCorrenti } from "./function/ordiniCorrenti.js";
import inquirer from "inquirer";

async function main() {
  console.log("Benvenuto nel tuo assistente ordini!");
  console.log("--------------------------------------");

  try {
    let phone = ""
    let count_generatedCode = 0
    while(count_generatedCode < 3){
      const response = await inquirer.prompt([
        {
          type: "input",
          name: "phone",
          message: "Inserisci il numero di telefono:",
          validate(value: string) {
            const pass = value.match(
              /^([01])?[\s.-]?\(?(\d{3})\)?[\s.-]?(\d{3})[\s.-]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?)(?:\d+)?)?$/
            );
            return pass ? true : "Inserisci un numero di telefono valido";
          },
        },
      ]);
      phone = response.phone.trim();
      const generatedCode = await auth(phone);

      console.log("Assistente: ", generatedCode);

      //TODO: Se è "Error", deve richiedermelo, un massimo di 3 volte.
      //TODO: Alla terza, fare "THROW"
      if (generatedCode.status === "Error"){
        count_generatedCode++
      }
      if (generatedCode.status === "Success"){
        count_generatedCode = 4
      }
    }
    if (count_generatedCode == 3){
      throw new Error(" Too many failed attempts. Your session has been temporarily locked for security reasons. Please try again later. ");
    }
    

    
    let code = ""
    let count_checkCode = 0
    let user_id_volatile = 0
    while(count_checkCode < 3){

      const response  = await inquirer.prompt([
      {
        type: "input",
        name: "code",
        message: "Inserisci il codice ricevuto via email:",
        validate(value: string) {
          const pass = value.match(/^\d{6}$/);
          return pass ? true : "Il codice è di 6 numeri";
        },
      },
    ]);
    code = response.code.trim();

      let checkCode = await auth2(phone.trim(), code.trim(), true);
      console.log("Assistente: ", checkCode);

      //TODO: Se è "Error", deve richiedermelo, un massimo di 3 volte.
      //TODO: Alla terza, fare "THROW"
      if (checkCode.status === "Error"){
        count_checkCode++
      }
      if (checkCode.status === "Success" && checkCode.response !== null ){
        count_checkCode = 4
        user_id_volatile = checkCode.response
      }
    }
    if (count_checkCode == 3){
      throw new Error(" Too many failed attempts. Your session has been temporarily locked for security reasons. Please try again later. ");
    }

    const userId = user_id_volatile;
    if (userId){
      
    let continue_loop = true;
    let orderId = "";

    while (continue_loop) {
      const { scelta } = await inquirer.prompt([
        {
          type: "list",
          name: "scelta",
          message: "Cosa vuoi fare?",
          choices: [
            "Visualizza tutti gli ordini in corso",
            "Controlla un ordine specifico",
            "Esci",
          ],
        },
      ]);

      if (scelta === "Esci") {
        continue_loop = false;
        break;
      }

      if (scelta === "Visualizza tutti gli ordini in corso") {
        try {
          const ordini = await ordiniCorrenti(userId, phone.trim(), code.trim());
          
          console.log("Assistente: ", JSON.stringify(ordini, null, 2));
          
          // vecchio modo
          /*console.log(`\n=== HAI ${ordini.length} ORDINI IN CORSO ===\n`);
          if (ordini.response)
          ordini.forEach((ordine, index) => {
            console.log(`--- ORDINE #${ordine.orderId} ---`);
            console.log(`Stato: ${ordine.stato}`);
            console.log(`Partenza: ${ordine.data_partenza}`);
            console.log(`Consegna: ${ordine.data_consegna}`);
            console.log(`Indirizzo: ${ordine.spedizione}`);
            console.log(`Costo totale: ${ordine.costo_totale}€`);
            console.log("Prodotti:");
            
            ordine.items.forEach((item: any, i: any) => {
              console.log(
                `  ${i + 1}. ${item.nome} x${item.quantita} - ${item.prezzo}€`
              );
            });
            if (index < ordini.length - 1) {
              console.log();
            }
          });
          */

          const { dettaglio } = await inquirer.prompt([
            {
              type: "confirm",
              name: "dettaglio",
              message: "Vuoi controllare un ordine specifico?",
              default: false,
            },
          ]);

          if (!dettaglio) {
            continue_loop = false;
            break;
          }
        } catch (err) {
          console.error("Errore:", (err as Error).message);
          break;
        }
      }

      const orderInputAnswer = await inquirer.prompt<{ orderInput: string }>([
        {
          type: "input",
          name: "orderInput",
          message: "Inserisci il numero dell'ordine da controllare:",
          default: orderId || "",
        },
      ]);
      const orderInput = orderInputAnswer.orderInput;
      orderId = orderInput;

      const { action } = await inquirer.prompt([
        {
          type: "list",
          name: "action",
          message: "Vuoi sapere lo stato o il riepilogo?",
          choices: ["stato", "riepilogo"],
        },
      ]);

      try {
        if (action === "stato") {
          const stato = await ordineStatus(userId, Number(orderId), phone.trim(), code.trim());

          console.log("Assistente: ", stato);


          // vecchio modo
          /*
          console.log("\n=== STATO ORDINE ===");
          console.log(`ID ordine: ${stato.orderId}`);
          console.log(`Stato: ${stato.stato}`);
          console.log(`Partenza: ${stato.data_partenza}`);
          console.log(`Consegna: ${stato.data_consegna}`);
          */

        } 
        if (action === "riepilogo") {
          const riepilogo = await ordineSummary(userId, Number(orderId), phone.trim(), code.trim());

          console.log("Assistente: ", JSON.stringify(riepilogo, null, 2));

          //vecchio modo
          /*
          console.log("\n=== RIEPILOGO ORDINE ===");
          console.log(`Costo totale: ${summary.costo_totale}€`);
          console.log("Prodotti:");
          summary.items.forEach((item: any, i: number) => {
            console.log(
              `  ${i + 1}. ${item.nome} x${item.quantita} - ${item.prezzo}€`
            );
          });
          */
        }
      } catch (err) {
        console.error("Errore:", (err as Error).message);
      }

      const { continuaAnswer } = await inquirer.prompt([
        {
          type: "confirm",
          name: "continuaAnswer",
          message: "Hai bisogno di altre informazioni?",
          default: true,
        },
      ]);
      continue_loop = continuaAnswer;
    }

    }
    console.log("\nGrazie per aver usato l'assistente ordini. Arrivederci!");
  } catch (err) {
    console.error("Errore:", (err as Error).message);
  }
}

main();
