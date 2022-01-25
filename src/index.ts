import ReactDOM from 'react-dom';
import React from 'react';
import { App } from './ui/app';
import { ICheckoutPayload } from './types';
import './ui/assets/css/index.css';

export const init = (data: ICheckoutPayload): void => {
  destroyCheckout();
  const element = document.createElement('div');
  element.id = 'blinqpay_checkout_root';
  document.body.appendChild(element);
  triggerCheckout(data);
};

const findCheckout = (): Element | null => {
  const element = document.querySelector('#blinqpay_checkout_root');
  return element;
};

export const destroyCheckout = (): void => {
  const checkout = findCheckout();
  if (checkout) checkout.remove();
};

export const triggerCheckout = (data: ICheckoutPayload): void => {
  const el = findCheckout();
  if (!el) throw new Error('Checkout cannot be initialised, please try again.');
  ReactDOM.render(
    React.createElement(App, { ...data, destroyCheckout }),
    document.getElementById('blinqpay_checkout_root'),
  );
};
