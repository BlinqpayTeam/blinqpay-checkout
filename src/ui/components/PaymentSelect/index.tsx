import React from 'react';
import Bank from '../../assets/svgs/Bank';
import Card from '../../assets/svgs/Card';
import DirectDebit from '../../assets/svgs/DirectDebit';
import QrCode from '../../assets/svgs/QrCode';
import PaymentTiles from '../PaymentTiles';
import { IPaymentSelect } from './IPaymentSelect';
import { Container } from './style';

const PaymentSelect: React.FC<IPaymentSelect.IProps> = ({ setActiveSlide }: IPaymentSelect.IProps) => {
  return (
    <Container>
      <PaymentTiles
        onClick={() => setActiveSlide('secondary')}
        icon={<Card />}
        payText="Pay with Card"
        description="Payment with your Debit card"
      />
      <PaymentTiles
        onClick={() => setActiveSlide('secondary')}
        icon={<Bank />}
        payText="Pay with Bank Transfer"
        description="Transfer to a Merchant Account"
      />
      <PaymentTiles
        onClick={() => setActiveSlide('secondary')}
        icon={<DirectDebit />}
        payText="Pay with Direct Debit"
        description="Transfer to from your account"
      />
      <PaymentTiles
        onClick={() => setActiveSlide('secondary')}
        icon={<QrCode />}
        payText="Pay with QR"
        description="Payment with QR scan"
      />
    </Container>
  );
};

export default PaymentSelect;
