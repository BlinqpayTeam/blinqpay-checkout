import React, { useState } from 'react';
import BankTransferIcon from '../../assets/svgs/BankTransferIcon';
import GenericHeader from '../../components/Headers/GenericHeader';
import { Body } from '../../components/Layout/style';
import Overall from '../../components/Slide/Overall';
import Error from '../Verification/Error';
import Success from '../Verification/success';
import BankForm from './BankForm';
import { IBankTransfer } from './IBankTransfer';

const BankTransfer: React.FC<IBankTransfer.IProps> = ({ page, setPage }: IBankTransfer.IProps) => {
  const [activeSlide, setActiveSlide] = useState('first');
  const [success, setSuccess] = useState(false);

  return (
    <>
      <Overall
        activeSlide={activeSlide}
        firstSlide={
          <>
            <GenericHeader
              paymentMethodIcon={<BankTransferIcon />}
              paymentText="Pay with Card"
              payingCustomer="John.Doe@blinqpay.io"
              amount="N1000.5"
              setPage={setPage}
            />
            <Body>
              <BankForm setActiveSlide={setActiveSlide} setSuccess={setSuccess} />
            </Body>
          </>
        }
        secondSlide={
          <>
            {success ? (
              <Success
                setPage={setPage}
                paymentText="Pay with Bank Transfer"
                user="John.Doe@blinkpay.io"
                setActiveSlide={setActiveSlide}
                logo={<BankTransferIcon />}
              />
            ) : (
              <Error
                setPage={setPage}
                paymentText="Pay with Bank Transfer"
                user="John.Doe@blinkpay.io"
                setActiveSlide={setActiveSlide}
                logo={<BankTransferIcon />}
              />
            )}
          </>
        }
      />
    </>
  );
};
export default BankTransfer;
