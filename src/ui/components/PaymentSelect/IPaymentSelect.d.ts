import { Dispatch, MouseEvent, ReactNode, SetStateAction } from 'react';

declare namespace IPaymentSelect {
  export interface IProps {
    setActiveSlide: Dispatch<SetStateAction<string>>;
  }
}

export { IPaymentSelect };
