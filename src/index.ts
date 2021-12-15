import ReactDOM from 'react-dom';
import { App } from './ui/app';
import './ui/assets/css/index.css';

export const init = (): void => {
  const element = document.createElement('div');
  element.id = 'blinqpay_checkout_root';
  document.body.appendChild(element);
};

const findCheckout = (): Element => {
  const element = document.querySelector('#blinqpay_checkout_root');
  if (!element) throw new Error('Checkout has not yet been initialised');
  return element;
};

export const triggerCheckout = (): void => {
  findCheckout();
  ReactDOM.render(App(), document.getElementById('blinqpay_checkout_root'));
};

export const destroyCheckout = (): void => {
  const checkout = findCheckout();
  checkout.remove();
};
