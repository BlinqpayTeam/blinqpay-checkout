import React from 'react';
import ArrowLeft from '../../assets/svgs/ArrowLeft';
import { IPaymentTiles } from './IPaymentTiles';
import { Container } from './style';

const PaymentTiles: React.FC<IPaymentTiles.IProps> = ({
  icon,
  payText,
  description,
  onClick,
}: IPaymentTiles.IProps) => {
  return (
    <Container onClick={  payText ==="Pay with Direct Debit"? "" :onClick}>
      <div className="left-item">
        <div className="payment-icon">{icon}</div>
        <div className="text">
          <p className="bold">{payText}</p> {
            payText ==="Pay with Direct Debit"?
            <p className="coming-soon-text">coming soon</p> :
            <p className="light">{description}</p>
            }
        </div>
      </div>
      <div className="right-item">
       {payText ==="Pay with Direct Debit"? " " :<ArrowLeft />}
      </div>
    </Container>
  );
};

export default PaymentTiles;
