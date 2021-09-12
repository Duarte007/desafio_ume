import { AccountRepository } from "../repositories/AccountRepository";
import { TransactionRepository } from "../repositories/TransactionRepository";

export class PerformTransaction {
  private transactionRepository: TransactionRepository;
  private accountRepository: AccountRepository;

  constructor(
    transactionRepository: TransactionRepository,
    accountRepository: AccountRepository
  ) {
    this.transactionRepository = transactionRepository;
    this.accountRepository = accountRepository;
  }

  public execute(
    senderDocument: string,
    receiverDocument: string,
    datetime: string,
    value: number
  ) {
    const senderAccount =
      this.accountRepository.getByDocumentId(senderDocument);
    const receiverAccount =
      this.accountRepository.getByDocumentId(receiverDocument);
    if (senderAccount && receiverAccount)
      return this.transactionRepository.performTransaction(
        senderAccount,
        receiverAccount,
        datetime,
        value
      );

    throw new Error("Invalid Transaction");
  }
}
