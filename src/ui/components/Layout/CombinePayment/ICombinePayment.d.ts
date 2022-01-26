import { Dispatch, SetStateAction } from 'react';

declare namespace ICombinepayment {
  export interface IProps {
    page: string;
    setPage: Dispatch<SetStateAction<string>>;
  }
}

export { ICombinepayment };
