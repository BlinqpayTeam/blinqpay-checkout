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
  fifthSlide,
  sixthSlide,
  seventhSlide,
  eighthSlide,
}: ISlide.IOverall) => {
  const Slide = ({ children }: { children: ReactNode }) => {
    return <div className="slide">{children}</div>;
  };
  return (
    <div className="slider">
      <CSSTransition in={activeSlide === 'first'} unmountOnExit timeout={20} classNames="slide-1">
        <Slide>{firstSlide}</Slide>
      </CSSTransition>
      <CSSTransition in={activeSlide === 'second'} unmountOnExit timeout={200} classNames="slide-2">
        <Slide>{secondSlide}</Slide>
      </CSSTransition>
      {thirdSlide && (
        <CSSTransition in={activeSlide === 'third'} unmountOnExit timeout={200} classNames="slide-2">
          <Slide>{thirdSlide}</Slide>
        </CSSTransition>
      )}
      {fourthSlide && (
        <CSSTransition in={activeSlide === 'fourth'} unmountOnExit timeout={200} classNames="slide-2">
          <Slide>{fourthSlide}</Slide>
        </CSSTransition>
      )}
      {fifthSlide && (
        <CSSTransition in={activeSlide === 'fifth'} unmountOnExit timeout={200} classNames="slide-2">
          <Slide>{fifthSlide}</Slide>
        </CSSTransition>
      )}
      {sixthSlide && (
        <CSSTransition in={activeSlide === 'sixth'} unmountOnExit timeout={150} classNames="slide-2">
          <Slide>{sixthSlide}</Slide>
        </CSSTransition>
      )}
      {seventhSlide && (
        <CSSTransition in={activeSlide === 'seventh'} unmountOnExit timeout={150} classNames="slide-2">
          <Slide>{seventhSlide}</Slide>
        </CSSTransition>
      )}
      {eighthSlide && (
        <CSSTransition in={activeSlide === 'eighth'} unmountOnExit timeout={450} classNames="slide-2">
          <Slide>{eighthSlide}</Slide>
        </CSSTransition>
      )}
    </div>
  );
};
export default Overall;
