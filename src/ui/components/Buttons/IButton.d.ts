import { Dispatch, SetStateAction } from 'react';

declare namespace IButton {
  export interface IProps {
    text: string;
    type: any;
    onClick?: () => void;
    disabled?: boolean;
  }
}

export { IButton };
