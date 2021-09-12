import { Account } from "../entities/account";
import { Transaction } from "../entities/transaction";

export interface TransactionRepository {
  performTransaction(
    senderAccount: Account,
    receiverAccount: Account,
    datetime: string,
    value: number
  ): void;
  getByAccount(documentId: string): Transaction[];
}
