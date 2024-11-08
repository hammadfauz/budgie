import * as React from 'react';
import { useState } from 'react';
import { db } from '../models/db';
import { useNavigate } from 'react-router-dom';

export const AddAccount = () => {
  const [name, setName] = useState<string>('');
  const navigate = useNavigate();

  const handleSave = async () => {
    await db.accounts.add({ name });
    navigate(-1);
    return true;
  };

  return (
    <>
      Create account
      <input type='text'
        value={name}
        onChange={e => setName(e.target.value)} />
      <button
        disabled={!name}
        onClick={handleSave}>
        Save
      </button>
    </>
  );
};
