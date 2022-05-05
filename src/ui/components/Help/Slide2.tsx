import React from 'react';
import Icon from '../../assets/illustrations/illustration2.svg';
import { Container } from './style';

const Slide2 = () => {
  return (
    <Container>
      <div>
        <img src={Icon} />
      </div>
      <div>
        Having insufficient balance can makes it impossible to complete a transfer. Fund your wallet first to increase
        your chances of transfer success.
      </div>
    </Container>
  );
};
export default Slide2;
