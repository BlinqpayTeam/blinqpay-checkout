import { Dispatch, SetStateAction } from 'react';

declare namespace IQRPayment {
  export interface IProps {
    page: string;
    setPage: Dispatch<SetStateAction<string>>;
    txRef: string;
    publicKey: string;
    destroyCheckout: () => void;
  }
}

export { IQRPayment };
