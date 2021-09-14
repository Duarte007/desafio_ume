import fs from "fs";
import readline from "readline";
import { AccountControllerFactory, TransactionControllerFactory } from "./adapters/factories/ControllerFactory";

const AccountController = AccountControllerFactory();
const TransactionController = TransactionControllerFactory();

async function processLineByLine() {
  const fileStream = fs.createReadStream("input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  fs.appendFileSync("output.txt", "", { flag: "w" });
  for await (const line of rl) {
    const obj = JSON.parse(line);
    let response;
    switch (obj.type) {
      case "initialize_account":
        response = AccountController.initializeAccount(
          obj.payload["document"],
          obj.payload["name"],
          obj.payload["available-limit"]
        );
        break;
      case "transaction":
        response = TransactionController.transfer(
          obj.payload["sender-document"],
          obj.payload["receiver-document"],
          obj.payload["datetime"],
          obj.payload["value"]
        );
        break;
      case "transaction_history":
        response = TransactionController.getTransactionHistory(obj.payload["document"]);
        break;
    }
    fs.appendFileSync("output.txt", `${JSON.stringify(response)}\n`);
  }
}

if (fs.existsSync("input.txt")) {
  processLineByLine();
} else {
  console.log("Arquivo 'input.txt' nao encontrado.");
}
