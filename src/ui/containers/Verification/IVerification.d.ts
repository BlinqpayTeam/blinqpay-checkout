import { Dispatch, ReactNode, SetStateAction } from 'react';
import { ICheckoutPayload } from '../../../types';

declare namespace IVerification {
  export interface IProps {
    page?: string;
    setPage?: Dispatch<SetStateAction<string>> | null;
    logo?: ReactNode;
    paymentText?: string;
    user?: string;
    amount?: string;
    setActiveSlide?: Dispatch<SetStateAction<string>> | null;
    noHeader?: boolean;
    error?: string;
    isClose?: boolean;
    pageLabel?: string;
    destroyCheckout?: () => void | undefined;
    setIsError?: Dispatch<SetStateAction<boolean>>;
    pendingText?: string;
    callback?: () => void | null | Promise<void>;
    checkoutDetails: ICheckoutPayload;
    txRef: string;
    paymentStatus?: string;
  }
  export interface IBankProps {
    page?: string;
    setPage?: Dispatch<SetStateAction<string>> | null;
    logo?: ReactNode;
    paymentText?: string;
    user?: string;
    amount?: string;
    setActiveSlide?: Dispatch<SetStateAction<string>> | null;
    noHeader?: boolean;
    error?: string;
    isClose?: boolean;
    pageLabel?: string;
    destroyCheckout?: () => void | undefined;
    setIsError?: Dispatch<SetStateAction<boolean>>;
    pendingText?: string;
    callback?: () => void | null | Promise<void>;
  }
  export interface IHelp {
    setActiveSlide: Dispatch<SetStateAction<string>>;
  }
}

export { IVerification };
