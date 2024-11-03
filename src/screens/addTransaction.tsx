import * as React from 'react';
import {
  useState,
  useEffect,
} from 'react';
import {
  ITransaction,
  ETransactionType,
  IAccount,
  IAccountNull,
  db,
} from '../models/db';

interface ITransactionTypeInputProps {
  value: ETransactionType,
  onChange: (v: ETransactionType) => void,
};

interface IAccountInputProps {
  value?: number;
  onChange: (v:number) => void;
};

const TransactionTypeInput = ({value,onChange}: ITransactionTypeInputProps) => {
  const styles = {
    main: {
      backgroundColor: 'rgba(0,0,0,0)',
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      borderBottom: '1px dashed #0056b3',
      fontSize: '1.6rem',
      color: '#0056b3',
    },
  };
  return (
    <select style={styles.main}
      value={value}
      onChange={(e) => onChange(e.target.value as ETransactionType)}
      >
      {Object.keys(ETransactionType).map(t => (
        <option key={t} value={t}>
         {t}
        </option>
      ))
      }
    </select>
  );
};

const AccountInput = ({value, onChange}: IAccountInputProps) => {
  const [accounts, setAccounts] = useState<(IAccount|IAccountNull)[]>([]);
  useEffect(() => {
    const getAccounts = async () => {
      const _accounts = await db.accounts.toArray();
      setAccounts([{name: 'none', id: 0},..._accounts]);
      return null;
    };
    getAccounts();
  },[])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === null) {
      onChange(null)
    }else{
      onChange(Number(value));
    }
  };
  return (
    <>
      <select value={value}
        onChange={e => onChange(Number(e.target.value))} >
        {accounts.map(a => (
          <option key={a.id} value={a.id}>
            {a.name}
          </option>
        ))}
      </select>
    </>
  );
}

export const AddTransaction = () => {
  const styles = {
    form: {
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'flex-start',
      gap: '10px 0',
      maxWidth: '500px',
    },
    headerWithInput: {
      fontSize: '2rem',
      marginBottom: '20px',
    },
    field: {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'space-between',
    },
  };
  const [transaction, setTransaction] = useState<ITransaction>({
    type: ETransactionType.Expense,
    amount: 0,
    date: new Date(),
    sourceAccountId: 0,
    destinationAccountId: 0,
    settled: true,
  });

  useEffect(() => {
    setTransaction({
      ...transaction,
      sourceAccountId: 0,
      destinationAccountId: 0,
    });
  },[transaction.type]);
  return (<div style={styles.form}>
    <div style={styles.headerWithInput}>
      Add new <TransactionTypeInput value={transaction.type}
        onChange={v => setTransaction({
          ...transaction,
          type: v,
        })} />
    </div>
    <div style={styles.field}>
      On: <input type='date'
        value={transaction.date.toISOString().split('T')[0]}
        onChange={e => {
          if (e.target.valueAsDate) {
            setTransaction({
              ...transaction,
              date: e.target.valueAsDate,
            })
          }
        }} />
    </div>
    <div style={styles.field}>
      {transaction.type !== ETransactionType.Income?<>
        From account: 
        <AccountInput value={transaction.sourceAccountId}
          onChange={v => setTransaction({
            ...transaction,
            sourceAccountId: v,
          })} />
      </>:null}
    </div>
    <div style={styles.field}>
      {transaction.type !== ETransactionType.Expense?<>
        To account: 
        <AccountInput value={transaction.destinationAccountId}
          onChange={v => setTransaction({
            ...transaction,
            destinationAccountId: v,
          })} />
      </>:null}
    </div>
    <div style={styles.field}>
      Amount: <input type='number'
        value={transaction.amount}
        onChange={(e) => setTransaction({
          ...transaction,
          amount: Number(e.target.value),
        })}/>
    </div>
  </div>);
};
