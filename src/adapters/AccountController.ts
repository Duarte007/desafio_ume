import { AccountRepository } from "../core/repositories/AccountRepository";
import { InitializeAccount } from "../core/useCases/InitializeAccount";

export class AccountController {
  private accountRepository;

  constructor(accountRepository: AccountRepository) {
    this.accountRepository = accountRepository;
  }

  public initializeAccount(
    userName: string,
    documentId: string,
    availableLimit: number
  ) {
    const initializeAccountUseCase = new InitializeAccount(
      this.accountRepository
    );
    return initializeAccountUseCase.execute(
      userName,
      documentId,
      availableLimit
    );
  }
}
