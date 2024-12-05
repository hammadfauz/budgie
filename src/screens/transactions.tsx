import * as React from 'react';
import { useState, useEffect } from 'react';
import * as Transaction from '../models/transaction';
import { List } from '../components/list';
import { TTransactions, TransactionTile } from '../components/transactionTile';



export const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<TTransactions>([]);

  useEffect(() => {
    const getTransactions = async () => {
      const _transactions = await Transaction.getAll();
      setTransactions(_transactions);
      return null;
    };
    getTransactions();
  }, []);

  return (
    <List>
      {transactions.map(transaction => {
        return <TransactionTile key={transaction.id}
          transaction={transaction} />
      })}
    </List>
  );
};
