import React, { useContext, useEffect, useMemo } from 'react';
import Bank from '../../assets/svgs/Bank';
import Card from '../../assets/svgs/Card';
import DirectDebit from '../../assets/svgs/DirectDebit';
import QrCode from '../../assets/svgs/QrCode';
import PaymentTiles from '../PaymentTiles';
import { IPaymentSelect } from './IPaymentSelect';
import { Container } from './style';
import { PaymentMethodContext } from '../../../context';
import { PaymentContextType, PaymentMethod } from '../../../types';

const PaymentSelect: React.FC<IPaymentSelect.IProps> = ({ setActiveSlide, setPage }: IPaymentSelect.IProps) => {
  const { selectedMethods } = useContext(PaymentMethodContext) as PaymentContextType;
  const handleProgress = (page: string) => {
    setActiveSlide('second');
    setPage(page);
  };
  const isUsedVal = useMemo(() => {
    return selectedMethods?.reduce((acc, type): Record<string, boolean> => {
      switch (type) {
        case PaymentMethod.BANK_TRANSFER: {
          acc[PaymentMethod.BANK_TRANSFER] = true;
          return acc;
        }
        case PaymentMethod.QR: {
          acc[PaymentMethod.QR] = true;
          return acc;
        }
        case PaymentMethod.DIRECT_DEBIT: {
          acc[PaymentMethod.DIRECT_DEBIT] = true;
          return acc;
        }
        case PaymentMethod.CARD_PAYMENT: {
          acc[PaymentMethod.CARD_PAYMENT] = true;
          return acc;
        }
        default:
          return acc;
      }
    }, {} as Record<string, boolean>);
  }, [selectedMethods?.length]);
  return (
    <Container>
      <PaymentTiles
        onClick={() => handleProgress('card')}
        icon={isUsedVal[PaymentMethod.CARD_PAYMENT] === true ? <Card fill="#00000080" /> : <Card />}
        payText="Pay with Card"
        description="Payment with your Debit card"
        isUsed={isUsedVal[PaymentMethod.CARD_PAYMENT] === true}
      />
      <PaymentTiles
        onClick={() => handleProgress('bank')}
        icon={isUsedVal[PaymentMethod.BANK_TRANSFER] === true ? <Bank fill="#00000080" /> : <Bank />}
        payText="Pay with Bank Transfer"
        description="Transfer to a Merchant Account"
        isUsed={isUsedVal[PaymentMethod.BANK_TRANSFER] === true}
      />
      <PaymentTiles
        onClick={() => handleProgress('qr')}
        icon={isUsedVal[PaymentMethod.QR] === true ? <QrCode fill="#00000080" /> : <QrCode />}
        payText="Pay with QR"
        description="Payment with QR scan"
        isUsed={isUsedVal[PaymentMethod.QR] === true}
      />
      <PaymentTiles
        onClick={() => handleProgress('direct-debit')}
        icon={<DirectDebit />}
        payText="Pay with Direct Debit"
        description="Transfer to from your account"
        isUsed={isUsedVal[PaymentMethod.DIRECT_DEBIT] === true}
      />
    </Container>
  );
};

export default PaymentSelect;
