import { ReactNode } from 'react';

declare namespace ISlide {
  export interface IOverall {
    activeSlide: string;
    firstSlide: ReactNode;
    secondSlide?: ReactNode;
    thirdSlide?: ReactNode;
  }
}

export { ISlide };
