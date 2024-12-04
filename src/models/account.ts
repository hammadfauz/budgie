import { db, IAccount, ITransaction } from './db';
import { paisa } from '../utils/paisa';

interface IBalances {
  settledBalance: number;
  pendingBalance: number;
};

export interface IAccountWithBalance extends IAccount {
  pendingBalance: number;
  settledBalance: number;
};

const sumTransactions = (
  transactions: ITransaction[]
): number => {
  return transactions.map(tx => tx.amount)
    .reduce((a, b) => paisa(b).add(a), paisa(0))
    .value;
};

const getAllCreditTransactions = (
  account: IAccount
): Promise<ITransaction[]> => {
  return db.transactions.where('destinationAccountId')
    .equals(account.id!)
    .toArray();
};

const getAllDebitTransactions = (
  account: IAccount
): Promise<ITransaction[]> => {
  if (!account?.id) return Promise.resolve([]);
  return db.transactions.where('sourceAccountId')
    .equals(account.id)
    .toArray();
};

const getSettledCreditTransactions = (
  account: IAccount
): Promise<ITransaction[]> => {
  if (!account?.id) return Promise.resolve([]);
  return db.transactions.where('destinationAccountId')
    .equals(account.id)
    .and((transaction: ITransaction) => transaction.settled)
    .toArray();
};

const getSettledDebitTransactions = (
  account: IAccount
): Promise<ITransaction[]> => {
  if (!account?.id) return Promise.resolve([]);
  return db.transactions.where('sourceAccountId')
    .equals(account.id)
    .and((transaction: ITransaction) => transaction.settled)
    .toArray();
};

export const getBalance = async (
  account: IAccount
): Promise<IBalances> => {
  const creditTxs = await getAllCreditTransactions(account);
  const debitTxs = await getAllDebitTransactions(account);
  const credit = sumTransactions(creditTxs);
  const debit = sumTransactions(debitTxs);

  const settledCreditTxs = await getSettledCreditTransactions(account);
  const settledDebitTxs = await getSettledDebitTransactions(account);
  const settledCredit = sumTransactions(settledCreditTxs);
  const settledDebit = sumTransactions(settledDebitTxs);

  return {
    pendingBalance: credit - debit,
    settledBalance: settledCredit - settledDebit,
  };
}

export const getAll = async (): Promise<IAccountWithBalance[]> => {
  const accounts = await db.accounts.toArray();
  const accountsWithBalances = await Promise.all(
    accounts.map(async (account) => {
      const {
        settledBalance,
        pendingBalance,
      } = await getBalance(account);
      return {
        ...account,
        pendingBalance,
        settledBalance,
      };
    })
  );
  return accountsWithBalances;
};

export const add = async (account: IAccount) => {
  await db.accounts.add(account);
};

export const get = async (id: number): Promise<IAccount | undefined> => {
  return db.accounts.get(id);
};

export const put = async (account: IAccount) => {
  await db.accounts.put(account);
};
export type { IAccount, IAccountNull } from './db';
