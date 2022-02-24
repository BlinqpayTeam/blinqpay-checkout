import { Dispatch, SetStateAction } from 'react';
import { ICheckoutPayload } from '../../../../types';

declare namespace ICombinepayment {
  export interface IProps {
    page: string;
    setPage: Dispatch<SetStateAction<string>>;
    payload: ICheckoutPayload & {
      transactionReference?: string;
    };
  }
}

export { ICombinepayment };
