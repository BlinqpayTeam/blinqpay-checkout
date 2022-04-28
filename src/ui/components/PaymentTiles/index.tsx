import React from 'react';
import Tooltip from 'antd/es/tooltip';
import ArrowLeft from '../../assets/svgs/ArrowLeft';
import { IPaymentTiles } from './IPaymentTiles';
import { Container } from './style';

const PaymentTiles: React.FC<IPaymentTiles.IProps> = ({
  icon,
  payText,
  description,
  onClick,
  isUsed,
}: IPaymentTiles.IProps) => {
  const el = () => (
    <Container isUsed={isUsed} onClick={payText === 'Pay with Direct Debit' || isUsed ? '' : onClick}>
      <div className="left-item">
        <div className="payment-icon">{icon}</div>
        <div className="text">
          <p className="bold">{payText}</p>{' '}
          {payText === 'Pay with Direct Debit' ? (
            <p className="coming-soon-text">coming soon</p>
          ) : (
            <p className="light">{description}</p>
          )}
        </div>
      </div>
      <div className="right-item">{payText === 'Pay with Direct Debit' || isUsed ? ' ' : <ArrowLeft />}</div>
    </Container>
  );
  return isUsed ? (
    <Tooltip title="Try another payment method" placement="bottomRight" color={'gold'}>
      {el()}
    </Tooltip>
  ) : (
    el()
  );
};

export default PaymentTiles;
