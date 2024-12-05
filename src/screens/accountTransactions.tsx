import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import * as Transaction from '../models/transaction';
import * as Account from '../models/account';
import { List } from '../components/list';
import { TTransactions, TransactionTile } from '../components/transactionTile';

export const AccountTransactions: React.FC = () => {
  const [transactions, setTransactions] = useState<TTransactions>([]);
  const [account, setAccount] = useState<Account.IAccount | null>(null);
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    const getTransactions = async (account: number) => {
      const _transactions = await Transaction.getByAccount(account);
      setTransactions(_transactions);
    };
    const getAccount = async (accountId: number) => {
      if (location.state) {
        setAccount(location.state);
      } else {
        const _account = await Account.get(accountId);
        if (_account) setAccount(_account);
      }
    }
    const accountId = Number(params.accountid);
    getTransactions(accountId);
    getAccount(accountId);
  }, []);

  return (<>
    {account ? <h2>Transactions for {account.name}</h2> : null}
    <List>
      {transactions.map(transaction => {
        return <TransactionTile key={transaction.id}
          transaction={transaction} />
      })}
    </List>
  </>);
};
