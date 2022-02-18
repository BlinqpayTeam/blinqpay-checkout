import Payment from 'payment';
import amex from '../assets/cards/amex.png';
import diners from '../assets/cards/diners.png';
import discover from '../assets/cards/discover.png';
import msc from '../assets/cards/msc.png';
import visa from '../assets/cards/visa.png';

function clearNumber(value = '') {
  return value.replace(/\D+/g, '');
}
export const formatCreditCardNumber = (value: any) => {
  if (!value) {
    return value;
  }

  const issuer = Payment.fns.cardType(value);
  const clearValue = clearNumber(value);
  let nextValue;
  let image;
  //TODO: Let's change the images for card types
  switch (issuer) {
    case 'amex':
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 10)} ${clearValue.slice(10, 15)}`;
      image = amex;
      break;
    case 'dinersclub':
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 10)} ${clearValue.slice(10, 14)}`;
      image = diners;
      break;
    case 'visa':
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 8)} ${clearValue.slice(8, 12)} ${clearValue.slice(
        12,
        19,
      )}`;
      image = visa;
      break;
    case 'mastercard':
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 8)} ${clearValue.slice(8, 12)} ${clearValue.slice(
        12,
        19,
      )}`;
      image = msc;
      break;
    default:
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 8)} ${clearValue.slice(8, 12)} ${clearValue.slice(
        12,
        19,
      )}`;
      image = null;
      break;
  }
  // const nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 8)} ${clearValue.slice(8, 12)} ${clearValue.slice(
  //   12,
  //   19,
  // )}`;

  return { cardNumber: nextValue.trim(), image };
};

export const formatDate = (value: any) => {
  const clearValue = clearNumber(value);
  return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
};
