import * as React from 'react';
import * as Transaction from '../models/transaction';

export type TTransactions = Awaited<ReturnType<typeof Transaction.getAll>>;
type TElement<T> = T extends (infer U)[] ? U : never;

export const TransactionTile = ({ transaction }: { transaction: TElement<TTransactions> }) => {
  const styles = {
    main: {
      border: '1px solid #cacaca',
      borderLeft: transaction.type === Transaction.ETransactionType.Income
        ? '4px solid green'
        : transaction.type === Transaction.ETransactionType.Expense
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
      {transaction.sourceAccount?.name ? <div>
        <strong>From</strong> {transaction.sourceAccount.name}
      </div> : null}
      {transaction.destinationAccount?.name ? <div>
        <strong>To</strong> {transaction.destinationAccount.name}
      </div> : null}
    </div>
    <div style={styles.amount}>
      {transaction.amount}
    </div>
  </div>);
};
