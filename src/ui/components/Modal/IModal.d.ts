import { Dispatch, SetStateAction } from 'react';
import { ICheckoutPayload } from '../../../types';

declare namespace IModal {
  export interface IProps {
    page: string;
    setPage: Dispatch<SetStateAction<string>>;
    payload: ICheckoutPayload & {
      transactionReference?: string;
      loading: boolean;
      isError: boolean;
    };
    destroyCheckout: () => void;
  }
}

export { IModal };
