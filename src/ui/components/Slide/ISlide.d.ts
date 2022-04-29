import { ReactNode } from 'react';

declare namespace ISlide {
  export interface IOverall {
    activeSlide: string;
    firstSlide: ReactNode;
    secondSlide?: ReactNode;
    thirdSlide?: ReactNode;
    fourthSlide?: ReactNode;
    fifthSlide?: ReactNode;
    sixthSlide?: ReactNode;
    seventhSlide?: ReactNode;
    eighthSlide?: ReactNode;
  }
}

export { ISlide };
