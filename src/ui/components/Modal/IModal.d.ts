import { Dispatch, SetStateAction } from 'react';

declare namespace IModal {
  export interface IProps {
    page: string;
    setPage: Dispatch<SetStateAction<string>>;
  }
}

export { IModal };
