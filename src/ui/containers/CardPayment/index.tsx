import React, { useState } from 'react';
import ColoredCard from '../../assets/svgs/ColoredCard';
import GenericHeader from '../../components/Headers/GenericHeader';
import { Body } from '../../components/Layout/style';
import Overall from '../../components/Slide/Overall';
import Error from '../Verification/Error';
import Success from '../Verification/success';
import AddressForm from './AddressForm';
import CardForm from './CardForm';
import { ICardPayment } from './ICardPayment';
import OTPForm from './OTPForm';
import PhoneAuthorization from './PhoneAuthorization';
import PinForm from './PinForm';

const CardPayment: React.FC<ICardPayment.IProps> = ({ page, setPage, payload }: ICardPayment.IProps) => {
  const [activeSlide, setActiveSlide] = useState('first');
  const [isSuccess, setIsSuccess] = useState(true);
  const amount = Number(payload?.amount || 'N1000.5').toFixed(2);
  return (
    <>
      <GenericHeader
        paymentMethodIcon={<ColoredCard />}
        paymentText="Pay with Card"
        payingCustomer={payload?.customer?.name || 'John.Doe@blinqpay.io'}
        amount={amount}
        setPage={setPage}
      />
      <Body>
        <Overall
          activeSlide={activeSlide}
          firstSlide={
            <>
              <CardForm setActiveSlide={setActiveSlide} amount={amount} />
            </>
          }
          secondSlide={
            <>
              <PinForm setActiveSlide={setActiveSlide} />{' '}
            </>
          }
          thirdSlide={
            <>
              <OTPForm setActiveSlide={setActiveSlide} />{' '}
            </>
          }
          fourthSlide={
            <>
              <AddressForm setActiveSlide={setActiveSlide} />
            </>
          }
          fifthSlide={
            <>
              <PhoneAuthorization isSuccess={isSuccess} setIsSuccess={setIsSuccess} setActiveSlide={setActiveSlide} />
            </>
          }
          sixthSlide={
            isSuccess ? (
              <Success noHeader paymentText="" setPage={setPage} setActiveSlide={setActiveSlide} />
            ) : (
              <Error noHeader paymentText="" setPage={setPage} setActiveSlide={setActiveSlide} />
            )
          }
        />
      </Body>
    </>
  );
};

export default CardPayment;
