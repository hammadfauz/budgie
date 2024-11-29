import * as React from 'react';
import { useState, useEffect } from 'react';
import * as transaction from '../models/transaction';
import { ETransactionType } from '../models/db';

type TTransactions = Awaited<ReturnType<typeof transaction.getAll>>;
type TElement<T> = T extends (infer U)[] ? U : never;

const IncomeTransactionTile = ({ transaction }: { transaction: TElement<TTransactions> }) => {
  const styles = {
    main: {
      border: '1px solid #cacaca',
      borderLeft: '4px solid green',
      borderRadius: '10px',
      padding: '10px 15px',
    },
  };
  return (<div style={styles.main}>
    {transaction.destinationAccount!.name} {transaction.amount}
  </div>);
};

const TransactionTile = ({ transaction }: { transaction: TElement<TTransactions> }) => {
  const styles = {
    main: {
      border: '1px solid #cacaca',
      borderLeft: transaction.type === ETransactionType.Income
        ? '4px solid green'
        : transaction.type === ETransactionType.Expense
          ? '4px solid red'
          : '4px solid blue',
      borderRadius: '10px',
      padding: '10px 15px',
      display: 'grid',
      gridTemplateColumns: '1fr min-content',
      gridTemplateAreas: '"date date" "accounts amount"',
      gridAlignItems: 'space-between',
      gap: '5px',
    },
    date: {
      gridArea: 'date',
      fontSize: 'small',
      color: '#555',
    },
    accounts: {
      gridArea: 'accounts',
    },
    amount: {
      gridArea: 'amount',
      color: transaction.settled ? 'initial' : 'red',
    },
  };
  return (<div style={styles.main}>
    <div style={styles.date}>{transaction.date.toLocaleString()}</div>
    <div style={styles.accounts}>
      {transaction.type === ETransactionType.Income ?
        transaction.destinationAccount!.name
        : transaction.type === ETransactionType.Expense ?
          transaction.sourceAccount!.name
          : `${transaction.sourceAccount?.name} ➡️  ${transaction.destinationAccount?.name}`
      }

    </div>
    <div style={styles.amount}>
      {transaction.amount}
    </div>
  </div>);
};

export const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<TTransactions>([]);

  const styles = {
    main: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      gap: '15px',
    },
  };

  useEffect(() => {
    const getTransactions = async () => {
      const _transactions = await transaction.getAll();
      setTransactions(_transactions);
      return null;
    };
    getTransactions();
  }, []);

  return (
    <div style={styles.main}>
      {transactions.map(transaction => {
        return <TransactionTile transaction={transaction} />
      })}
    </div>
  );
};
