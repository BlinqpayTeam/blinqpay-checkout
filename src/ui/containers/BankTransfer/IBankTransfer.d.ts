import { Dispatch, SetStateAction } from 'react';
import { ICheckoutPayload } from '../../../types';

declare namespace IBankTransfer {
  export interface IProps {
    page: string;
    setPage: Dispatch<SetStateAction<string>>;
    txRef: string;
    publicKey: string;
    payload: ICheckoutPayload & {
      transactionReference?: string;
      testMode: boolean;
      destroyCheckout: () => void;
    };
  }
  export interface IBankProps {
    setActiveSlide: Dispatch<SetStateAction<string>>;
    setSuccess: Dispatch<SetStateAction<boolean>>;
    getAccDetails: () => void;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    verifying: boolean;
    setVerifying: Dispatch<SetStateAction<boolean>>;
    acc: Record<string, unknown>;
    setAcc: Dispatch<SetStateAction<Record<string, unknown>>>;
    txRef?: string;
    publicKey?: string;
    setTransferStatus: Dispatch<SetStateAction<string>>;
    amount: string;
  }
}

export { IBankTransfer };
