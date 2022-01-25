import React, { ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ISlide } from './ISlide';

import './Slider.css';

const Overall: React.FC<ISlide.IOverall> = ({
  activeSlide,
  firstSlide,
  secondSlide,
  thirdSlide,
  fourthSlide,
}: ISlide.IOverall) => {
  const Slide = ({ children }: { children: ReactNode }) => {
    return <div className="slide">{children}</div>;
  };
  return (
    <div className="slider">
      <CSSTransition in={activeSlide === 'first'} unmountOnExit timeout={450} classNames="slide-1">
        <Slide>{firstSlide}</Slide>
      </CSSTransition>
      <CSSTransition in={activeSlide === 'second'} unmountOnExit timeout={450} classNames="slide-2">
        <Slide>{secondSlide}</Slide>
      </CSSTransition>
      {thirdSlide && (
        <CSSTransition in={activeSlide === 'third'} unmountOnExit timeout={450} classNames="slide-2">
          <Slide>{thirdSlide}</Slide>
        </CSSTransition>
      )}
      {fourthSlide && (
        <CSSTransition in={activeSlide === 'fourth'} unmountOnExit timeout={450} classNames="slide-2">
          <Slide>{fourthSlide}</Slide>
        </CSSTransition>
      )}
    </div>
  );
};
export default Overall;
