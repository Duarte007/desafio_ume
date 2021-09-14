import { Account } from "../entities/account";
import { Transaction } from "../entities/transaction";

export interface ITransaction {
  "sender-document": string;
  "receiver-document": string;
  value: number;
  datetime: string;
  availableLimitSenderAccount: number;
  availableLimitReceiverAccount: number;
}

export interface TransactionRepository {
  transfer(senderAccount: Account, receiverAccount: Account, datetime: string, value: number): Transaction;
  getByAccount(documentId: string): ITransaction[];
  checkDuplicity(senderDocumentId: string, receiverDocumentId: string, value: number, datetime: string): boolean;
}
