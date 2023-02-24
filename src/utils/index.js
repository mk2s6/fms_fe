import { roundedTo2 } from './numbers';

export const getLocalCurrencyFormat = (value, currency) => {
  const symbol = new Intl.NumberFormat('en', { style: 'currency', currency }).formatToParts(value).find(x => x.type === 'currency');
  return `${symbol && symbol.value}${roundedTo2(value)}`;
};

export const getCurrencyForListFormat = (value, type, currency) => {
  const symbol = ['CREDIT', 'CASHBACK', 'REFUND'].includes(type) ? '+' : ['DEBIT'].includes(type) ? '-' : '';
  return `${symbol}${getLocalCurrencyFormat(value, currency)}`;
};
