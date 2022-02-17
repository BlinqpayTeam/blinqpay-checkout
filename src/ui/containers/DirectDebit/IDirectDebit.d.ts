import { Dispatch, SetStateAction } from 'react';

declare namespace IDirectDebit {
  export interface IProps {
    page: string;
    setPage: Dispatch<SetStateAction<string>>;
  }
  export interface IBankProps {
    setActiveSlide: Dispatch<SetStateAction<string>>;
    setSuccess: Dispatch<SetStateAction<boolean>>;
  }
}

export { IDirectDebit };
