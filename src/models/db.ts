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
}

export interface IAccountNull {
  id: 0;
  name: 'none';
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
  settled: boolean;
}

export class Db extends Dexie {
  accounts!: Table<IAccount>;
  transactions!: Table<ITransaction>;

  constructor() {
    super('BudgieDB');
    this.version(1).stores({
      accounts: '++id, name',
      transactions: '++id, type, date, sourceAccountId, destinationAccountId, relatedTransactionId',
    });
  }
}

export const db = new Db();

