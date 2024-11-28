import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as account from '../models/account';
import { paisa } from '../utils/paisa';
import {
  edit,
  caretRight,
} from '../utils/icons';

export const Accounts = () => {

  const [accounts, setAccounts] = useState<account.IAccountWithBalance[]>([]);

  const styles = {
    main: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      gap: '15px',
    },
    createButton: {
      padding: '5px 10px',
    },
    tile: {
      display: 'grid',
      gridTemplateAreas: '"title title actions" "fields fields actions"',
      border: '1px solid #cacaca',
      borderRadius: '10px',
      padding: '10px 15px',
      gap: '5px',
    },
    title: {
      gridArea: 'title',
      fontWeight: '600',
      fontSize: '1.2rem',
    },
    editLink: {
      color: 'initial',
      marginLeft: '10px',
    },
    editIcon: {
      height: '16px',
    },
    fields: {
      gridArea: 'fields',
      display: 'flex',
      flexDirection: 'column' as 'column',
    },
    actions: {
      gridArea: 'actions',
      textAlign: 'right' as 'right',
    },
    enterButton: {
      height: '49px',
    },
  };

  useEffect(() => {
    const getAccounts = async () => {
      const _accounts = await account.getAll();
      setAccounts(_accounts)
      return null;
    };
    getAccounts();
  }, []);

  return (
    <div style={styles.main}>
      <Link to='/account/add'>
        <button style={styles.createButton}>
          ➕ Create Account
        </button>
      </Link>
      {accounts.map(_account => (
        <div style={styles.tile} key={_account.id}>
          <div style={styles.title}>
            {_account.name}
            <Link style={styles.editLink}
              to={`/account/${_account.id}`}
              state={{ account: _account }}>
              <img style={styles.editIcon} src={edit} />
            </Link>
          </div>
          <div style={styles.fields}>
            <div>Balance: {_account.settledBalance}</div>
            {paisa(_account.pendingBalance).value !== paisa(_account.settledBalance).value ?
              <div>Pending balance: {_account.pendingBalance}</div>
              : null}
          </div>
          <div style={styles.actions}>
            <img src={caretRight} style={styles.enterButton} />
          </div>
        </div>
      ))}
    </div>
  )
};
