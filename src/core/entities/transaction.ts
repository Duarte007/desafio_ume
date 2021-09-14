import { Account } from "./account";

export class Transaction {
  public senderAccount!: Account;
  public receiverAccount!: Account;
  public datetime!: string;
  public value!: number;
  public availableLimit!: number;

  constructor(senderAccount: Account, receiverAccount: Account, datetime: string, value: number) {
    this.receiverAccount = receiverAccount;
    this.senderAccount = senderAccount;
    this.datetime = datetime;
    this.value = value;
  }

  public setAvailableLimit(availableLimit: number) {
    this.availableLimit = availableLimit;
  }
}
