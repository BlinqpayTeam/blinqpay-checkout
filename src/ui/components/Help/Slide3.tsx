import React from 'react';
import Icon from '../../assets/illustrations/illustration3.svg';
import { Container } from './style';

const Slide3 = () => {
  return (
    <Container>
      <div>
        <img src={Icon} />
      </div>
      <div>
        While we are not sure why you might be experiencing trouble with this transfer, you can try changing your debit
        card, or checking your network connection.
      </div>
    </Container>
  );
};
export default Slide3;
