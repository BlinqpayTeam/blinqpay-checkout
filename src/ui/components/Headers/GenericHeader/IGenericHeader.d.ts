import { Dispatch, SetStateAction, ReactNode } from 'react';

declare namespace IGenericHeader {
  export interface IProps {
    showChangeMethod?: boolean;
    paymentMethodIcon: ReactNode;
    paymentText: string;
    payingCustomer?: string;
    amount?: string;
    pendingText?: string;
    setPage: Dispatch<SetStateAction<string>> | null;
  }
}

export { IGenericHeader };
