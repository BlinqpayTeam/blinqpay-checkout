import { Dispatch, ReactNode, SetStateAction } from 'react';

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
  }
  export interface IHelp {
    setActiveSlide: Dispatch<SetStateAction<string>>;
  }
}

export { IVerification };
