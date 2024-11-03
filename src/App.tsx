import * as React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { Layout } from './layout';
import { Transactions } from './screens/transactions';
import { AddTransaction } from './screens/addTransaction';
import { Accounts } from './screens/accounts';
import { AddAccount } from './screens/addAccount';
import { EditAccount } from './screens/editAccount';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route path='transactions' element={<Transactions />} />
          <Route path='transaction/add' element={<AddTransaction />} />
          <Route path='accounts' element={<Accounts />} />
          <Route path='account/add' element={<AddAccount />} />
          <Route path='account/:id' element={<EditAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
};

export default App;
