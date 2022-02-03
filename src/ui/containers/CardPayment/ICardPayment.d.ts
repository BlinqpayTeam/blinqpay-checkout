import { Dispatch, SetStateAction } from 'react';

declare namespace ICardPayment {
  export interface IProps {
    page: string;
    setPage: Dispatch<SetStateAction<string>>;
  }
  export interface ICardProps {
    setActiveSlide: Dispatch<SetStateAction<string>>;
  }
  export interface IPinProps {
    setActiveSlide: Dispatch<SetStateAction<string>>;
  }
  export interface IOTPProps {
    setActiveSlide: Dispatch<SetStateAction<string>>;
  }
  export interface IAddressProps {
    setActiveSlide: Dispatch<SetStateAction<string>>;
  }
  export interface IPhoneProps {
    setActiveSlide: Dispatch<SetStateAction<string>>;
    isSuccess: boolean;
    setIsSuccess: Dispatch<SetStateAction<boolean>>;
  }
}

export { ICardPayment };
