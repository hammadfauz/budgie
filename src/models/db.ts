import Dexie, { Table } from 'dexie';
import relationships from 'dexie-relationships';

type TRelationships<T> = {
  [key: string]: keyof T;
};

interface IRelationshipTable<T, U = undefined> extends Table<T> {
  with: (relationsShips: TRelationships<T>) => Dexie.Promise<(
    U extends undefined
    ? T
    : T & U
  )[]>;
};

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

interface ITransactionJoins {
  sourceAccount?: IAccount,
  destinationAccount?: IAccount,
}

export class Db extends Dexie {
  accounts!: IRelationshipTable<IAccount>;
  transactions!: IRelationshipTable<ITransaction, ITransactionJoins>;

  constructor() {
    super('BudgieDB', { addons: [relationships] });
    this.version(1).stores({
      accounts: '++id, &name',
      transactions: '++id, type, date, sourceAccountId -> accounts.id, destinationAccountId -> accounts.id, relatedTransactionId',
    });
  }
}

export const db = new Db();

