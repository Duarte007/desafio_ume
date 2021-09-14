import { AccountRepository } from "../repositories/AccountRepository";

export class InitializeAccount {
  private accountRepository: AccountRepository;

  constructor(accountRepository: AccountRepository) {
    this.accountRepository = accountRepository;
  }

  public execute(documentId: string, owner: string, availableLimit: number) {
    if (!documentId || !owner || !availableLimit) throw { status: "failure", violation: "invalid_data" };

    const accountAlreadyExists = this.accountRepository.getByDocumentId(documentId);
    if (accountAlreadyExists) throw { status: "failure", violation: "account_already_initialized" };

    this.accountRepository.openAccount(documentId, owner, availableLimit);

    return {
      name: owner,
      document: documentId,
      "available-limit": availableLimit,
    };
  }
}
