import moment from "moment";
import { TransactionAdapter } from "../../adapters/adapters/TransactionAdapter";
import { Account } from "../../core/entities/account";
import { Transaction } from "../../core/entities/transaction";
import { ITransaction, TransactionRepository } from "../../core/repositories/TransactionRepository";

export class TransactionRepositoryMemory implements TransactionRepository {
  transactions: ITransaction[] = [];
  transfer(senderAccount: Account, receiverAccount: Account, datetime: string, value: number): Transaction {
    const transaction = TransactionAdapter.create(senderAccount, receiverAccount, datetime, value);
    senderAccount.updateAvailableLimit(value * -1);
    receiverAccount.updateAvailableLimit(value);
    this.transactions.push({
      "sender-document": senderAccount.documentId,
      "receiver-document": receiverAccount.documentId,
      value: value,
      datetime: datetime,
      availableLimitSenderAccount: senderAccount.availableLimit,
      availableLimitReceiverAccount: receiverAccount.availableLimit,
    });
    return transaction;
  }
  getByAccount(documentId: string): ITransaction[] {
    return this.transactions.filter(
      (transaction) => transaction["sender-document"] === documentId || transaction["receiver-document"] === documentId
    );
  }
  checkDuplicity(senderDocumentId: string, receiverDocumentId: string, value: number, datetime: string): boolean {
    return this.transactions.some(
      (transaction) =>
        transaction["sender-document"] === senderDocumentId &&
        transaction["receiver-document"] === receiverDocumentId &&
        transaction.value === value &&
        moment(transaction.datetime) >= moment(datetime).subtract(5, "minutes")
    );
  }
}
