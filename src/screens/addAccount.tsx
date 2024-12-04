import * as React from 'react';
import { useState } from 'react';
import { add } from '../models/account';
import { useNavigate } from 'react-router-dom';

export const AddAccount = () => {
  const [name, setName] = useState<string>('');
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      await add({ name });
      navigate(-1);
      return true;
    } catch (e) {
      console.error((e as Error).message);
    }
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
