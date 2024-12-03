import * as React from 'react';
import { useState, useEffect } from 'react';
import * as Account from '../models/account';
import {
  useNavigate,
  useLocation,
  useParams,
} from 'react-router-dom';

export const EditAccount = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [account, setAccount] = useState<IAccount | undefined>();

  useEffect(() => {
    if (location.state?.account) {
      setAccount(location.state.account);
    } else {
      const getAccounts = async () => {
        const _account = await Account.get(Number(id));
        setAccount(_account);
      };
      getAccounts();
    }
  }, []);


  const handleSave = async (e: React.MouseEvent) => {
    if (!!account)
      await Account.put(account);
    navigate(-1);
    return true;
  };

  return (
    <>
      Edit account
      <input type='text'
        value={account ? account.name : ''}
        onChange={e => setAccount({
          ...account,
          name: e.target.value,
        })} />
      <button
        disabled={!account?.name}
        onClick={handleSave}>
        Save
      </button>
    </>
  );
};

