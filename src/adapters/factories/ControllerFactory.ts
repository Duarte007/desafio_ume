import { AccountRepositoryMemory } from "../../infra/repositories/AccountRepositoryMemory";
import { TransactionRepositoryMemory } from "../../infra/repositories/TransactionRepositoryMemory";
import { AccountController } from "../controllers/AccountController";
import { TransactionController } from "../controllers/TransactionController";

const accountRepository = new AccountRepositoryMemory();
const transactionRepository = new TransactionRepositoryMemory();

export const AccountControllerFactory = () => {
  return new AccountController(accountRepository);
};

export const TransactionControllerFactory = () => {
  return new TransactionController(accountRepository, transactionRepository);
};
