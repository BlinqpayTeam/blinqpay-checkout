import { Dispatch, SetStateAction } from 'react';

declare namespace IBankTransfer {
  export interface IProps {
    page: string;
    setPage: Dispatch<SetStateAction<string>>;
  }
  export interface IBankProps {
    setActiveSlide: Dispatch<SetStateAction<string>>;
    setSuccess: Dispatch<SetStateAction<boolean>>;
    getAccDetails: () => void;
    loading?: boolean;
    acc: Record<string, unknown>;
    setAcc: Dispatch<SetStateAction<Record<string, unknown>>>;
  }
}

export { IBankTransfer };
