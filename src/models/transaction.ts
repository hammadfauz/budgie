import { db, ITransaction, ETransactionType } from './db';

export const reverse = (transaction: ITransaction): ITransaction => {
  return {
    type: ETransactionType.LoanTransfer,
    amount: transaction.amount,
    comments: transaction.comments,
    date: transaction.date,
    sourceAccountId: transaction.destinationAccountId,
    destinationAccountId: transaction.sourceAccountId,
    relatedTransactionId: transaction.id,
    dueDate: transaction.dueDate,
    settled: false,
  };
};

const sortByDateLatest = (transactions: ITransaction[]) => {
  return transactions
    .sort((t1, t2) => {
      return t1.date >= t2.date
        ? -1
        : 1;
    });
};

export const getByAccount = async (accountId: number) => {
  const transactions = await db.transactions
    .where("sourceAccountId").equals(accountId)
    .or("destinationAccountId").equals(accountId)
    .with({
      sourceAccount: 'sourceAccountId',
      destinationAccount: 'destinationAccountId',
    });
  return sortByDateLatest(transactions);
};

export const getAll = async () => {
  const transactions = await db.transactions.with({
    sourceAccount: 'sourceAccountId',
    destinationAccount: 'destinationAccountId',
  });
  return sortByDateLatest(transactions);
};

export const validate = (transaction: ITransaction) => {
  if (transaction.amount === 0)
    throw new Error('Transaction amount cannot be 0');
  if (
    transaction.type === ETransactionType.Income
    && transaction.destinationAccountId === undefined
  )
    throw new Error('Destination account cannot be empty for income transaction');
  if (
    transaction.type === ETransactionType.Expense
    && transaction.sourceAccountId === undefined
  )
    throw new Error('Source account cannot be empty for expense transaction');
  if (
    (
      transaction.type === ETransactionType.Transfer
      || transaction.type === ETransactionType.LoanTransfer
    )
    && (
      transaction.sourceAccountId === undefined
      || transaction.destinationAccountId === undefined
    )
  )
    throw new Error('Source or destination account cannot be empty for transfer transaction');
};

export const add = async (transaction: ITransaction) => {
  try {
    validate(transaction);
    const id = await db.transactions.add(transaction);
    if (transaction.type === ETransactionType.LoanTransfer) {
      transaction.id = id;
      await db.transactions.add(reverse(transaction));
    }
  } catch (e) {
    throw e;
  }
};

export { ETransactionType } from './db';
export type { ITransaction } from './db';
