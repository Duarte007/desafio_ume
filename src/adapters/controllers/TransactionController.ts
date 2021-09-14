import { AccountRepository } from "../../core/repositories/AccountRepository";
import { TransactionRepository } from "../../core/repositories/TransactionRepository";
import { GetTransactionHistory } from "../../core/useCases/GetTransactionHistory";
import { Transfer } from "../../core/useCases/Transfer";
import { ResponseAdapter } from "../adapters/ResponseAdapter";

export class TransactionController {
  private accountRepository;
  private transactionRepository;

  constructor(accountRepository: AccountRepository, transactionRepository: TransactionRepository) {
    this.accountRepository = accountRepository;
    this.transactionRepository = transactionRepository;
  }

  public transfer(senderDocument: string, receiverDocument: string, datetime: string, value: number) {
    try {
      const transfer = new Transfer(this.transactionRepository, this.accountRepository);
      const response = transfer.execute(senderDocument, receiverDocument, datetime, value);
      console.log(`Transferencia ${senderDocument} -> ${receiverDocument} concluida!`);
      return ResponseAdapter.create("transaction", "success", response);
    } catch (error) {
      console.log(error);
      const status = error.status || "failure";
      const violation = error.violation || "unknown";
      console.log(`Falha ao realizar transferencia ${senderDocument} -> ${receiverDocument}.`);
      return ResponseAdapter.create("transaction", status, undefined, violation);
    }
  }

  public getTransactionHistory(documentId: string) {
    try {
      const getTransactionHistory = new GetTransactionHistory(this.transactionRepository);
      const response = getTransactionHistory.execute(documentId);
      console.log(`Historico da conta ${documentId} retornado!`);
      return ResponseAdapter.create("transaction_history", "success", response);
    } catch (error) {
      const status = error.status || "failure";
      const violation = error.violation || "unknown";
      console.log(`Falha ao retornar historico da conta ${documentId}.`);
      return ResponseAdapter.create("transaction_history", status, undefined, violation);
    }
  }
}
