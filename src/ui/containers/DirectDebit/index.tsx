import React, { useState } from 'react';
import BankTransferIcon from '../../assets/svgs/BankTransferIcon';
import GenericHeader from '../../components/Headers/GenericHeader';
import { Body } from '../../components/Layout/style';
import Overall from '../../components/Slide/Overall';
import Error from '../Verification/Error';
import Success from '../Verification/success';
import DirectDebitForm from './DirectDebitForm';
import { IDirectDebit } from './IDirectDebit';

const DirectDebit: React.FC<IDirectDebit.IProps> = ({ page, setPage }: IDirectDebit.IProps) => {
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
              paymentText="Pay with Direct Debit"
              payingCustomer="John.Doe@blinqpay.io"
              amount="N1000.5"
              setPage={setPage}
            />
            <Body>
              <DirectDebitForm setActiveSlide={setActiveSlide} setSuccess={setSuccess} />
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
export default DirectDebit;
