import { Dispatch, SetStateAction } from 'react';
import { ICheckoutPayload } from '../../../types';

declare namespace IQRPayment {
  export interface IProps {
    page: string;
    setPage: Dispatch<SetStateAction<string>>;
    txRef: string;
    publicKey: string;
    destroyCheckout: () => void;
    payingCustomer: string;
    amount: string;
    payingCustomerEmail: string;
    checkoutDetails: ICheckoutPayload;
  }
}

export { IQRPayment };
