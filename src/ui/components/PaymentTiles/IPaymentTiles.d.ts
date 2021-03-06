import { ReactNode } from 'react';

declare namespace IPaymentTiles {
  export interface IProps {
    icon: ReactNode;
    payText: string;
    description: string;
    onClick: () => any;
    isUsed: boolean;
  }
}

export { IPaymentTiles };
