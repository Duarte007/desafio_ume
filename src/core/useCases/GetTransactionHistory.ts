import { TransactionRepository } from "../repositories/TransactionRepository";

export class GetTransactionHistory {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  public execute(documentId: string) {
    const history = this.transactionRepository.getByAccount(documentId);
    if (!history) throw { status: "failure", violation: "account_not_initialized" };
    return history.map((transaction) => {
      return {
        "sender-document": transaction["sender-document"],
        "receiver-document": transaction["receiver-document"],
        value: transaction["sender-document"] === documentId ? transaction.value * -1 : transaction.value,
        datetime: transaction.datetime,
        "available-limit":
          transaction["sender-document"] === documentId
            ? transaction.availableLimitSenderAccount
            : transaction.availableLimitReceiverAccount,
      };
    });
  }
}
