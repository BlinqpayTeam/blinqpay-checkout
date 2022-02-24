import { Customer } from './types';
import { Currency } from './enums';

/**
 * Checkout Configuration Payload
 */
export interface ICheckoutPayload {
  /**
   * Your public key from Blinqpay.
   */
  publicKey: string;
  /**
   * Unique transaction reference optionally provided by customer.
   */
  reference: string;
  /**
   * Amount to be collected.
   */
  amount: number;
  /**
   *  Currency of the charge. Default is NGN (Nigerian Naira)
   */
  currency?: Currency;
  /**
   * Customer details.
   */
  customer?: Customer;
  /**
   * Information/narration about the transaction
   */
  description?: string;
  /**
   * A url where users are redirected to after a payment is collected. It is optional but required if onSuccess and onFailure hooks are not provided.
   */
  redirectUrl?: string;
  onClose?: () => void;
  onSuccess?: (data: Record<string, unknown>) => void;
  onFailure?: (data: Record<string, unknown>) => void;
  onPending?: (data: Record<string, unknown>) => void;
}

export interface IApp extends ICheckoutPayload {
  destroyCheckout: () => void;
}
