import React from 'react';
import { HelpContainer } from './style';
import Carousel from 'react-elastic-carousel';
import Slide1 from '../../components/Help/Slide1';
import Slide2 from '../../components/Help/Slide2';
import Slide3 from '../../components/Help/Slide3';
import { IVerification } from './IVerification';

const Help: React.FC<IVerification.IHelp> = ({ setActiveSlide }: IVerification.IHelp) => {
  return (
    <HelpContainer>
      <div className="need-help">
        Need Help
        <div className="trouble">Having trouble transferring?</div>
      </div>

      <div className="carousel">
        <Carousel showArrows={false} isRTL={false} itemsToShow={1}>
          <>
            {' '}
            <Slide1 />
          </>
          <>
            {' '}
            <Slide2 />{' '}
          </>
          <>
            {' '}
            <Slide3 />
          </>
        </Carousel>
      </div>
      <div onClick={() => setActiveSlide('first')} className="back">
        Back
      </div>
    </HelpContainer>
  );
};
export default Help;
