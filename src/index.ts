import { auth } from "./function/auth.js";
import { auth2 } from "./function/auth2.js";
import { ordineStatus } from "./function/ordineStatus.js";
import { ordineSummary } from "./function/ordineSummary.js";
import { ordiniCorrenti } from "./function/ordiniCorrenti.js";
import { isDemoMode } from "./function/isDemoMode.js";
import inquirer from "inquirer";
import readline from "readline";

/*
TODO: tabella sessione, coin session_id autoincrement, attemps_phone, attemps_code
okay, allora, ritornato id sessione,
*/

async function main() {
  console.log("Benvenuto nel tuo assistente ordini!");
  console.log("--------------------------------------");

  try {
    let demoMode = await isDemoMode(); // true o false a seconda del flag nel DB
    if (demoMode) {
      console.log("\n[Modalità demo attivata]");
    }

    // ---------------------------
    // LOGIN NUMERO/CODICE
    // ---------------------------
    let phone = "";
    let count_generatedCode = 0;

    while (count_generatedCode < 3) {
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

      // ---------------------------
      // GESTIONE DEMO MODE
      // ---------------------------
      let generatedCode;
      if (demoMode) {
        phone="3275305690"
      }

      generatedCode = await auth(phone);
      console.log("Assistente: ", generatedCode)

      if (generatedCode.status === "Error") {
        count_generatedCode++;
      } else {
        break;
      }
    }

    if (count_generatedCode == 3) {
      throw new Error(
        "Too many failed attempts. We will need to generate a new code."
      );
    }

    let code = "";
    let count_checkCode = 0;
    let user_id_volatile = 0;

    while (count_checkCode < 3) {
      const response = await inquirer.prompt([
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

      // ---------------------------
      // GESTIONE DEMO MODE
      // ---------------------------
      let checkCode;
      if (demoMode) {
        code = "123456"
      } 
      checkCode = await auth2(phone.trim(), code.trim(), true);
      console.log("Assistente: ", checkCode);
      
      if (checkCode.status === "Error"){
        count_generatedCode++
      }else{
        if (checkCode.response != null)
        {
          user_id_volatile = checkCode.response
          break
        }
      }
      
    }
    if (count_checkCode == 3) {
      throw new Error(
        "Too many failed attempts. Your session has been temporarily locked for security reasons. Please try again later."
      );
    }

    const userId = user_id_volatile;

    if (userId) {
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
            const ordini = await ordiniCorrenti(
              userId,
              phone.trim(),
              code.trim()
            );
            console.log("Assistente: ", JSON.stringify(ordini, null, 2));

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
            const stato = await ordineStatus(
              userId,
              Number(orderId),
              phone.trim(),
              code.trim()
            );
            console.log("Assistente: ", stato);
          }
          if (action === "riepilogo") {
            const riepilogo = await ordineSummary(
              userId,
              Number(orderId),
              phone.trim(),
              code.trim()
            );
            console.log("Assistente: ", JSON.stringify(riepilogo, null, 2));
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
