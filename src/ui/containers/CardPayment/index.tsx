import React, { useState } from 'react';
import ColoredCard from '../../assets/svgs/ColoredCard';
import GenericHeader from '../../components/Headers/GenericHeader';
import { Body } from '../../components/Layout/style';
import Overall from '../../components/Slide/Overall';
import AddressForm from './AddressForm';
import CardForm from './CardForm';
import { ICardPayment } from './ICardPayment';
import OTPForm from './OTPForm';
import PinForm from './PinForm';

const CardPayment: React.FC<ICardPayment.IProps> = ({ page, setPage }: ICardPayment.IProps) => {
  const [activeSlide, setActiveSlide] = useState('first');
  return (
    <>
      <GenericHeader
        paymentMethodIcon={<ColoredCard />}
        paymentText="Pay with Card"
        payingCustomer="John.Doe@blinqpay.io"
        amount="N1000.5"
        setPage={setPage}
      />
      <Body>
        <Overall
          activeSlide={activeSlide}
          firstSlide={
            <>
              <CardForm setActiveSlide={setActiveSlide} />
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
              <AddressForm />
            </>
          }
        />
      </Body>
    </>
  );
};

export default CardPayment;
