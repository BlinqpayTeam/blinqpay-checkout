import { Dispatch, ReactNode, SetStateAction } from 'react';

declare namespace IVerification {
  export interface IProps {
    page?: string;
    setPage: Dispatch<SetStateAction<string>>;
    logo: ReactNode;
    paymentText: string;
    user: string;
    setActiveSlide: Dispatch<SetStateAction<string>>;
  }
}

export { IVerification };
