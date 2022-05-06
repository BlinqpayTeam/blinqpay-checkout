import { Dispatch, SetStateAction } from 'react';
import { ICheckoutPayload } from '../../../types';

declare namespace ICardPayment {
  export interface IProps {
    page: string;
    setPage: Dispatch<SetStateAction<string>>;
    payload: ICheckoutPayload & {
      transactionReference?: string;
      testMode: boolean;
      destroyCheckout: () => void;
    };
  }
  export interface ICardProps {
    setActiveSlide: Dispatch<SetStateAction<string>>;
    amount: string;
    setIsSuccess: Dispatch<SetStateAction<boolean>>;
    txRef: string;
    setIsCloseModal: Dispatch<SetStateAction<boolean>>;
    setErrorText: Dispatch<SetStateAction<string>>;
    setPrevSlide: Dispatch<SetStateAction<string>>;
    setRedirectUrl: Dispatch<SetStateAction<string>>;
    setPaymentStatus: Dispatch<SetStateAction<string | undefined>>;
    setEnableChangeMethod: Dispatch<SetStateAction<boolean>>;
  }
  export interface I3DSProps {
    setActiveSlide: Dispatch<SetStateAction<string>>;
    setIsSuccess: Dispatch<SetStateAction<boolean>>;
    amount: string;
    email: string;
    txRef: string;
    url?: string;
    publicKey: string;
    setIsCloseModal: Dispatch<SetStateAction<boolean>>;
    setPaymentStatus: Dispatch<SetStateAction<string | undefined>>;
    setEnableChangeMethod: Dispatch<SetStateAction<boolean>>;
    callbackUrl?: string;
  }
  export interface ITestCardsProps {
    setActiveSlide: Dispatch<SetStateAction<string>>;
    txRef: string;
    setErrorText: Dispatch<SetStateAction<string>>;
    setRedirectUrl: Dispatch<SetStateAction<string>>;
    setIsSuccess: Dispatch<SetStateAction<boolean>>;
    amount: string;
    setPaymentStatus: Dispatch<SetStateAction<string | undefined>>;
    setEnableChangeMethod: Dispatch<SetStateAction<boolean>>;
  }
  export interface IPinProps {
    setActiveSlide: Dispatch<SetStateAction<string>>;
    txRef: string;
    setErrorText: Dispatch<SetStateAction<string>>;
    setIsCloseModal: Dispatch<SetStateAction<boolean>>;
    setIsSuccess: Dispatch<SetStateAction<boolean>>;
    setRedirectUrl: Dispatch<SetStateAction<string>>;
    setPaymentStatus: Dispatch<SetStateAction<string | undefined>>;
    setEnableChangeMethod: Dispatch<SetStateAction<boolean>>;
  }
  export interface IOTPProps {
    setActiveSlide: Dispatch<SetStateAction<string>>;
    txRef: string;
    setErrorText: Dispatch<SetStateAction<string>>;
    setIsCloseModal: Dispatch<SetStateAction<boolean>>;
    setIsSuccess: Dispatch<SetStateAction<boolean>>;
    publicKey: string;
    setRedirectUrl: Dispatch<SetStateAction<string>>;
    setPaymentStatus: Dispatch<SetStateAction<string | undefined>>;
    setEnableChangeMethod: Dispatch<SetStateAction<boolean>>;
  }
  export interface IAddressProps {
    setActiveSlide: Dispatch<SetStateAction<string>>;
    txRef: string;
    setErrorText: Dispatch<SetStateAction<string>>;
    setIsCloseModal: Dispatch<SetStateAction<boolean>>;
    setIsSuccess: Dispatch<SetStateAction<boolean>>;
    setRedirectUrl: Dispatch<SetStateAction<string>>;
    setPaymentStatus: Dispatch<SetStateAction<string | undefined>>;
    setEnableChangeMethod: Dispatch<SetStateAction<boolean>>;
  }
  export interface IPhoneProps {
    setActiveSlide: Dispatch<SetStateAction<string>>;
    isSuccess: boolean;
    txRef: string;
    setErrorText: Dispatch<SetStateAction<string>>;
    setIsCloseModal: Dispatch<SetStateAction<boolean>>;
    setIsSuccess: Dispatch<SetStateAction<boolean>>;
    setRedirectUrl: Dispatch<SetStateAction<string>>;
    setPaymentStatus: Dispatch<SetStateAction<string | undefined>>;
    setEnableChangeMethod: Dispatch<SetStateAction<boolean>>;
  }
}

export { ICardPayment };
