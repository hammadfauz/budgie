import currency from 'currency.js';

interface ICurrencySettings {
  symbol: string;
  precision: number;
};

const storedSettings = window.localStorage.getItem('currencySettings');
const currencySettings: ICurrencySettings = storedSettings
  ? JSON.parse(storedSettings)
  :{
    symbol: 'PKR',
    precision: 2,
  };

export const paisa = (amount: number) => currency(amount, currencySettings);
