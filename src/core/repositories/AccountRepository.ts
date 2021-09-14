import { Account } from "../entities/account";
import { Transaction } from "../entities/transaction";

export interface AccountRepository {
  openAccount(documentId: string, owner: string, availableLimit: number): void;
  getByDocumentId(documentId: string): Account | undefined;
  // updateAvailableLimitByDocumentId(documentId: string, value: number): void;
}
