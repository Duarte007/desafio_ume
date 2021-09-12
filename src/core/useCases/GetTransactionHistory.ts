import { TransactionRepository } from "../repositories/TransactionRepository";

export class GetTransactionHistory {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  public execute(documentId: string) {
    return this.transactionRepository.getByAccount(documentId);
  }
}
