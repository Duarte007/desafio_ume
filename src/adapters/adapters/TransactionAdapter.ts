import { Account } from "../../core/entities/account";
import { Transaction } from "../../core/entities/transaction";

export class TransactionAdapter {
  static create(receiverAccount: Account, senderAccount: Account, datetime: string, value: number) {
    return new Transaction(receiverAccount, senderAccount, datetime, value);
  }
}
