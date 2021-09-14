import { AccountRepository } from "../../core/repositories/AccountRepository";
import { InitializeAccount } from "../../core/useCases/InitializeAccount";
import { ResponseAdapter } from "../adapters/ResponseAdapter";

export class AccountController {
  private accountRepository;

  constructor(accountRepository: AccountRepository) {
    this.accountRepository = accountRepository;
  }

  public initializeAccount(documentId: string, owner: string, availableLimit: number) {
    try {
      const initializeAccountUseCase = new InitializeAccount(this.accountRepository);
      const response = initializeAccountUseCase.execute(documentId, owner, availableLimit);
      console.log(`Conta ${documentId} criada com sucesso!`);
      return ResponseAdapter.create("initialize_account", "success", response);
    } catch (error) {
      const status = error.status || "failure";
      const violation = error.violation || "unknown";
      console.log(`Falha ao criar conta ${documentId}`);
      return ResponseAdapter.create("transaction", status, undefined, violation);
    }
  }
}
