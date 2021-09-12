export class Account {
  public documentId!: string;
  public owner!: string;
  public availableLimit!: number;

  constructor(documentId: string, owner: string, availableLimit: number) {
    this.documentId = documentId;
    this.owner = owner;
    this.availableLimit = availableLimit;
  }
}
