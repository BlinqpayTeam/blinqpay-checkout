import React from 'react';
import Bank from '../../assets/svgs/Bank';
import Card from '../../assets/svgs/Card';
import DirectDebit from '../../assets/svgs/DirectDebit';
import QrCode from '../../assets/svgs/QrCode';
import PaymentTiles from '../PaymentTiles';
import { IPaymentSelect } from './IPaymentSelect';
import { Container } from './style';

const PaymentSelect: React.FC<IPaymentSelect.IProps> = ({ setActiveSlide, setPage }: IPaymentSelect.IProps) => {
  const handleProgress = (page: string) => {
    setActiveSlide('second');
    setPage(page);
  };
  return (
    <Container>
      <PaymentTiles
        onClick={() => handleProgress('card')}
        icon={<Card />}
        payText="Pay with Card"
        description="Payment with your Debit card"
      />
      <PaymentTiles
        onClick={() => handleProgress('bank')}
        icon={<Bank />}
        payText="Pay with Bank Transfer"
        description="Transfer to a Merchant Account"
      />
      <PaymentTiles
        onClick={() => handleProgress('direct')}
        icon={<DirectDebit />}
        payText="Pay with Direct Debit"
        description="Transfer to from your account"
      />
      <PaymentTiles
        onClick={() => handleProgress('qr')}
        icon={<QrCode />}
        payText="Pay with QR"
        description="Payment with QR scan"
      />
    </Container>
  );
};

export default PaymentSelect;
