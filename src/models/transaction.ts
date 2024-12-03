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

export const getAll = async () => {
  const transactions = await db.transactions.with({
    sourceAccount: 'sourceAccountId',
    destinationAccount: 'destinationAccountId',
  });
  return transactions;
};

export const add = async (transaction: ITransaction) => {
  const id = await db.transactions.add(transaction);
  if (transaction.type === ETransactionType.LoanTransfer) {
    transaction.id = id;
    await db.transactions.add(reverse(transaction));
  }
};

export { ITransaction, ETransactionType } from './db';
