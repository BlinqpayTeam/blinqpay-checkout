import React, { useState } from 'react';
import { Body } from '../../components/Layout/style';
import { IDirectDebit } from './IDirectDebit';

const BankTransferIcon = React.lazy(() => import('../../assets/svgs/BankTransferIcon'));
const GenericHeader = React.lazy(() => import('../../components/Headers/GenericHeader'));
const Overall = React.lazy(() => import('../../components/Slide/Overall'));
const Error = React.lazy(() => import('../Verification/Error'));
const Success = React.lazy(() => import('../Verification/Success'));
const DirectDebitForm = React.lazy(() => import('./DirectDebitForm'));

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
