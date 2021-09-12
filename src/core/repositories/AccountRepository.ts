import { Account } from "../entities/account";
import { Transaction } from "../entities/transaction";

export interface AccountRepository {
  openAccount(
    userName: string,
    documentId: string,
    availableLimit: number
  ): void;
  getByDocumentId(documentId: string): Account;
}
