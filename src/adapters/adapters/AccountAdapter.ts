import { Account } from "../../core/entities/account";

export class AccountAdapter {
  static create(documentId: string, owner: string, availableLimit: number) {
    return new Account(documentId, owner, availableLimit);
  }
}
