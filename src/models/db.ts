import Dexie, { Table } from 'dexie';

export enum ETransactionType {
  Income = 'Income',
  Expense = 'Expense',
  Transfer = 'Transfer',
  LoanTransfer = 'LoanTransfer',
}

export interface IAccount {
  id?: number;
  name: string;
  icon: string;
}

export interface ITransaction {
  id?: number;
  type: ETransactionType;
  amount: number;
  comments?: string;
  date: Date;
  sourceAccountId?: number;
  destinationAccountId?: number;
  relatedTransactionId?: number;
  dueDate?: Date;
  remainingAmount?: number;
}

export class Db extends Dexie {
  accounts!: Table<IAccount>;
  transactions!: Table<ITransaction>;

  constructor() {
    super('BudgieDB');
    this.version(1).stores({
      accounts: '++id, name, icon',
      transactions: '++id, type, date, sourceAccountId, destinationAccountId, relatedTransactionId, dueDate, remainingAmount',
    });
  }
}

export const db = new Db();

