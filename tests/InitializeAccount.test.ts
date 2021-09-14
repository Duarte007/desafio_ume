import { InitializeAccount } from "../src/core/useCases/InitializeAccount";
import { AccountRepositoryMemory } from "../src/infra/repositories/AccountRepositoryMemory";

test("should initialize a account", () => {
  const accountRepository = new AccountRepositoryMemory();
  const initializeAccount = new InitializeAccount(accountRepository);
  const response = initializeAccount.execute("999.999.999-99", "Joana Bárbara Caldeira", 1000);
  expect(response.document).toBe("999.999.999-99");
});

test("should return an erro when try initialize a account already initialized", () => {
  try {
    const accountRepository = new AccountRepositoryMemory();
    const initializeAccount = new InitializeAccount(accountRepository);
    const response = initializeAccount.execute("999.999.999-99", "Joana Bárbara Caldeira", 1000);
    expect(response.document).toBe("999.999.999-99");
    initializeAccount.execute("999.999.999-99", "Nelson de Paulo", 200);
  } catch (error) {
    expect(error.status).toBe("failure");
    expect(error.violation).toBe("account_already_initialized");
  }
});

test("should return an erro when try initialize a account with invalid data", () => {
  try {
    const accountRepository = new AccountRepositoryMemory();
    const initializeAccount = new InitializeAccount(accountRepository);
    initializeAccount.execute("", "Joana Bárbara Caldeira", 1000);
  } catch (error) {
    expect(error.status).toBe("failure");
    expect(error.violation).toBe("invalid_data");
  }
});
