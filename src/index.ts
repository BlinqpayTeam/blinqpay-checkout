/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Currency } from './types';
import './ui/assets/css/index.css';
import { initializeTransaction } from './api/transaction';
import { nanoid } from 'nanoid';

const closeButton = () => `
            <div class="close-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-13 -13 50 50" width="50" height="50">
            <path fill="none" d="M0 0h80v80H0z" />
            <path
              class="inner"
              d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
              fill="#7765c4"
            />
          </svg>
            </div>
`;
const toQueryString = (payload: Record<string, string>): string =>
  '?' +
  Object.keys(payload)
    .map((key) => {
      return `${key}=${encodeURIComponent(payload[key])}`;
    })
    .join('&');
const addListener = (el: HTMLElement, eventName: string, fn: () => void): void => {
  el.addEventListener(eventName, fn);
};
const removeListener = (el: HTMLElement, eventName: string, fn: () => void): void => {
  el.removeEventListener(eventName, fn);
};
const findEl = (elId: string): Element | null => {
  const element = document.querySelector(`#${elId}`);
  return element;
};

export const destroyCheckout = (cb?: () => void | Promise<void>): void => {
  const checkout = findEl('blinqpay_checkout_root');
  const closeBtn = findEl('blinqpay_checkout_destroy_root');
  try {
    if (cb) cb();
  } catch (error) {
    console.log(error);
  }
  if (closeBtn) {
    removeListener(closeBtn as unknown as HTMLElement, 'click', destroyCheckout);
    closeBtn.remove();
  }
  if (checkout) checkout.remove();
};

const closeModalBtn = (data: Record<string, unknown>) => {
  if (data?.onClose) (data as Record<string, () => void>).onClose();
  destroyCheckout();
};

export const init = async (data: Record<string, unknown>): Promise<void> => {
  // Create message Handler
  const subscribeToMessage = (message: MessageEvent) => {
    if (!message.data) return;
    const payload = JSON.parse(message.data || null);
    if (payload.blinqID === 'SDK') {
      if (payload.status === 'success') {
        if (data?.redirectUrl) {
          window.open((data?.redirectUrl + toQueryString(payload?.payload)) as string);
        } else if (data.onSuccess) {
          (data as Record<string, (data: unknown) => void>).onSuccess(payload?.payload);
          destroyCheckout();
        }
      } else if (payload.status === 'pending') {
        if (data?.redirectUrl) {
          window.open((data?.redirectUrl + toQueryString(payload?.payload)) as string);
        } else if (data.onPending) {
          (data as Record<string, (data: unknown) => void>).onPending(payload?.payload);
          destroyCheckout();
        }
      } else {
        if (data?.redirectUrl) {
          window.open((data?.redirectUrl + toQueryString(payload?.payload)) as string);
        } else if (data.onPending) {
          (data as Record<string, (data: unknown) => void>).onPending(payload?.payload);
          destroyCheckout();
        }
      }
    }
    // Remove message event
    window.removeEventListener('message', subscribeToMessage, false);
  };
  destroyCheckout();
  window.addEventListener('message', subscribeToMessage, false);
  // Add close Button
  const closeBtn = document.createElement('div');
  closeBtn.className = 'close-button';
  closeBtn.id = 'blinqpay_checkout_destroy_root';
  closeBtn.innerHTML = closeButton();
  // Add close event
  addListener(closeBtn, 'click', () => {
    // Remove message event
    window.removeEventListener('message', subscribeToMessage, false);
    closeModalBtn(data);
  });
  // Add iframe
  const element = document.createElement('iframe');
  element.id = 'blinqpay_checkout_root';
  element.setAttribute('style', 'position: fixed; top: 0; left: 0; border-width: 0; z-index: 88888888888');
  element.setAttribute('width', '100%');
  element.setAttribute('height', '100%');
  element.setAttribute('allowTransparency', 'true');
  const reference = data.reference || `BPTR-${nanoid()}`;
  // Todo:  Use a loader at this point.
  const response = await initializeTransaction(data.publicKey as string, {
    amount: data.amount,
    customerName: data.customerName || '',
    customerEmail: data.customerEmail || '',
    phoneNumber: data.phoneNumber || '',
    paymentReference: reference,
    currency: data.currency || Currency.NGN,
    deviceFingerPrint: '79e6b7f0b72037aa8428b70fbe03986c',
    callbackUrl: data.redirectUrl || 'https://blinqpay.io/transaction/confirm',
  });
  // Todo: Show proper error
  if (response?.data?.error) {
    // Remove message event
    window.removeEventListener('message', subscribeToMessage, false);
    throw new Error('Checkout cannot be initialised, please try again.');
  }
  const transRef = (response?.data?.data as Record<string, unknown>)?.transactionReference as string;
  element.setAttribute('src', process.env.CHECKOUT_BASE_URL + transRef + `?sdk-app=${window.location.href}`);
  element.setAttribute('sandbox', 'allow-same-origin allow-forms allow-scripts allow-popups');
  document.body.appendChild(element);
  document.body.appendChild(closeBtn);
};
