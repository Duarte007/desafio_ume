import { AccountAdapter } from "../../adapters/adapters/AccountAdapter";
import { Account } from "../../core/entities/account";
import { AccountRepository } from "../../core/repositories/AccountRepository";

export class AccountRepositoryMemory implements AccountRepository {
  accounts: Account[] = [];

  openAccount(documentId: string, owner: string, availableLimit: number): void {
    const account = AccountAdapter.create(documentId, owner, availableLimit);
    this.accounts.push(account);
  }
  getByDocumentId(documentId: string): Account | undefined {
    return this.accounts.find((account) => account.documentId === documentId);
  }
}
