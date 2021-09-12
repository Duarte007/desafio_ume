import { AccountRepository } from "../repositories/AccountRepository";

export class InitializeAccount {
  private accountRepository: AccountRepository;

  constructor(accountRepository: AccountRepository) {
    this.accountRepository = accountRepository;
  }

  public execute(userName: string, documentId: string, availableLimit: number) {
    return this.accountRepository.openAccount(
      userName,
      documentId,
      availableLimit
    );
  }
}
