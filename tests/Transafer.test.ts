import { InitializeAccount } from "../src/core/useCases/InitializeAccount";
import { Transfer } from "../src/core/useCases/Transfer";
import { AccountRepositoryMemory } from "../src/infra/repositories/AccountRepositoryMemory";
import { TransactionRepositoryMemory } from "../src/infra/repositories/TransactionRepositoryMemory";

test("should make a transfer", async () => {
  const accountRepository = new AccountRepositoryMemory();
  const transactionRepository = new TransactionRepositoryMemory();
  const initializeAccount = new InitializeAccount(accountRepository);
  initializeAccount.execute("999.999.999-99", "Joana Bárbara Caldeira", 1000);
  initializeAccount.execute("111.111.111-11", "Andreia Cecília Rocha", 500);
  const transfer = new Transfer(transactionRepository, accountRepository);
  const response = transfer.execute("999.999.999-99", "111.111.111-11", "2021-08-12T14:30:30Z", 800);
  expect(response["available-limit"]).toBe(200);
  expect(response["sender-document"]).toBe("999.999.999-99");
  expect(response["receiver-document"]).toBe("111.111.111-11");
});

test("should return an error when trying to perform a transfer greater than the limit", async () => {
  try {
    const accountRepository = new AccountRepositoryMemory();
    const transactionRepository = new TransactionRepositoryMemory();
    const initializeAccount = new InitializeAccount(accountRepository);
    initializeAccount.execute("999.999.999-99", "Joana Bárbara Caldeira", 1000);
    initializeAccount.execute("111.111.111-11", "Andreia Cecília Rocha", 500);
    const transfer = new Transfer(transactionRepository, accountRepository);
    transfer.execute("999.999.999-99", "111.111.111-11", "2021-08-12T14:30:30Z", 1200);
  } catch (error) {
    expect(error.status).toBe("failure");
    expect(error.violation).toBe("insufficient_limit");
  }
});

test("should return an error when trying to perform a duplicated transfer", async () => {
  try {
    const accountRepository = new AccountRepositoryMemory();
    const transactionRepository = new TransactionRepositoryMemory();
    const initializeAccount = new InitializeAccount(accountRepository);
    initializeAccount.execute("999.999.999-99", "Joana Bárbara Caldeira", 1000);
    initializeAccount.execute("111.111.111-11", "Andreia Cecília Rocha", 500);
    const transfer = new Transfer(transactionRepository, accountRepository);
    transfer.execute("999.999.999-99", "111.111.111-11", "2021-08-12T14:30:30Z", 500);
    transfer.execute("999.999.999-99", "111.111.111-11", "2021-08-12T14:32:00Z", 500);
  } catch (error) {
    expect(error.status).toBe("failure");
    expect(error.violation).toBe("double_transaction");
  }
});
