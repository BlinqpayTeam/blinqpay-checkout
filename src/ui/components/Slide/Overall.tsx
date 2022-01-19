import React, { ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ISlide } from './ISlide';

import './Slider.css';

const Overall: React.FC<ISlide.IOverall> = ({ activeSlide, firstSlide, secondSlide, thirdSlide }: ISlide.IOverall) => {
  const Slide = ({ children }: { children: ReactNode }) => {
    return <div className="slide">{children}</div>;
  };
  return (
    <div className="slider">
      <CSSTransition in={activeSlide === 'main'} unmountOnExit timeout={450} classNames="slide-1">
        <Slide>{firstSlide}</Slide>
      </CSSTransition>
      <CSSTransition in={activeSlide === 'secondary'} unmountOnExit timeout={450} classNames="slide-2">
        <Slide>{secondSlide}</Slide>
      </CSSTransition>
    </div>
  );
};
export default Overall;
