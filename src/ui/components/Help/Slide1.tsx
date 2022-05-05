import React from 'react';
import Icon from '../../assets/illustrations/illustration1.svg';
import { Container } from './style';

const Slide1 = () => {
  return (
    <Container>
      <div>
        <img src={Icon} />
      </div>
      <div>
        Take a minute to make sure you got the receiver's name and account number right. This can help you completely
        transfers easily.
      </div>
    </Container>
  );
};
export default Slide1;
