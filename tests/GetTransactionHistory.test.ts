import { GetTransactionHistory } from "../src/core/useCases/GetTransactionHistory";
import { InitializeAccount } from "../src/core/useCases/InitializeAccount";
import { Transfer } from "../src/core/useCases/Transfer";
import { AccountRepositoryMemory } from "../src/infra/repositories/AccountRepositoryMemory";
import { TransactionRepositoryMemory } from "../src/infra/repositories/TransactionRepositoryMemory";

test("should return the transaction history", async () => {
  const accountRepository = new AccountRepositoryMemory();
  const transactionRepository = new TransactionRepositoryMemory();
  const initializeAccount = new InitializeAccount(accountRepository);
  initializeAccount.execute("999.999.999-99", "Joana Bárbara Caldeira", 1000);
  initializeAccount.execute("111.111.111-11", "Andreia Cecília Rocha", 500);
  const transfer = new Transfer(transactionRepository, accountRepository);
  transfer.execute("999.999.999-99", "111.111.111-11", "2021-08-12T14:30:30Z", 800);
  const getTransactionHistory = new GetTransactionHistory(transactionRepository);
  const senderResponse = getTransactionHistory.execute("999.999.999-99");
  expect(senderResponse[0]["available-limit"]).toBe(200);
  expect(senderResponse[0]["sender-document"]).toBe("999.999.999-99");
  expect(senderResponse[0]["receiver-document"]).toBe("111.111.111-11");
  expect(senderResponse[0]["value"]).toBe(-800);
  const receiverResponse = getTransactionHistory.execute("111.111.111-11");
  expect(receiverResponse[0]["value"]).toBe(800);
});

test("should return an error when trying to get the transaction history of an uninitialized account", async () => {
  try {
    const transactionRepository = new TransactionRepositoryMemory();
    const getTransactionHistory = new GetTransactionHistory(transactionRepository);
    getTransactionHistory.execute("999.999.999-98");
  } catch (error) {
    expect(error.status).toBe("failure");
    expect(error.violation).toBe("account_not_initialized");
  }
});
