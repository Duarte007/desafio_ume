import { AccountRepository } from "../repositories/AccountRepository";
import { TransactionRepository } from "../repositories/TransactionRepository";

export class Transfer {
  private transactionRepository: TransactionRepository;
  private accountRepository: AccountRepository;

  constructor(transactionRepository: TransactionRepository, accountRepository: AccountRepository) {
    this.transactionRepository = transactionRepository;
    this.accountRepository = accountRepository;
  }

  public execute(senderDocument: string, receiverDocument: string, datetime: string, value: number) {
    const senderAccount = this.accountRepository.getByDocumentId(senderDocument);
    const receiverAccount = this.accountRepository.getByDocumentId(receiverDocument);

    if (!senderAccount || !receiverAccount) throw { status: "failure", violation: "account_not_initialized" };

    if (senderAccount.availableLimit < value) throw { status: "failure", violation: "insufficient_limit" };

    const duplicateTransaction = this.transactionRepository.checkDuplicity(senderDocument, receiverDocument, value, datetime);

    if (duplicateTransaction) throw { status: "failure", violation: "double_transaction" };

    const transaction = this.transactionRepository.transfer(senderAccount, receiverAccount, datetime, value);

    return {
      "available-limit": transaction.senderAccount.availableLimit,
      "receiver-document": receiverDocument,
      "sender-document": senderDocument,
      datetime,
    };
  }
}
