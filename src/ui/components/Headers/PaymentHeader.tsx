import React from 'react';
import { PaymentHeaderContainer } from './style';

const PaymentHeader = () => {
  return (
    <PaymentHeaderContainer>
      <div className="top">
        <div>
          <span>Logo</span>
          <span> Pay with Card </span>
        </div>
        <div> Change Method </div>
      </div>
      <div className="bottom">
        <div>Logo</div>
        <div>
          <div>John.Doe@blinqpay.io</div>
          <div>N1000.5</div>
        </div>
      </div>
    </PaymentHeaderContainer>
  );
};
export default PaymentHeader;
