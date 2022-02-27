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
  const [isCloseModal, setIsCloseModal] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [prevSlide, setPrevSlide] = useState<string | undefined>(undefined);
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
              <CardForm
                txRef={payload.transactionReference as string}
                setIsSuccess={setIsSuccess}
                setActiveSlide={setActiveSlide}
                setIsCloseModal={setIsCloseModal}
                setErrorText={setErrorText}
                amount={amount}
                setPrevSlide={setPrevSlide}
              />
            </>
          }
          secondSlide={
            <>
              <PinForm
                setIsCloseModal={setIsCloseModal}
                setErrorText={setErrorText}
                txRef={payload.transactionReference as string}
                setIsSuccess={setIsSuccess}
                setActiveSlide={setActiveSlide}
              />{' '}
            </>
          }
          thirdSlide={
            <>
              <OTPForm
                txRef={payload.transactionReference as string}
                setActiveSlide={setActiveSlide}
                setIsSuccess={setIsSuccess}
                setIsCloseModal={setIsCloseModal}
                setErrorText={setErrorText}
                publicKey={payload.publicKey}
              />{' '}
            </>
          }
          fourthSlide={
            <>
              <AddressForm
                txRef={payload.transactionReference as string}
                setIsSuccess={setIsSuccess}
                setIsCloseModal={setIsCloseModal}
                setErrorText={setErrorText}
                setActiveSlide={setActiveSlide}
              />
            </>
          }
          fifthSlide={
            <>
              <PhoneAuthorization
                isSuccess={isSuccess}
                txRef={payload.transactionReference as string}
                setIsSuccess={setIsSuccess}
                setIsCloseModal={setIsCloseModal}
                setErrorText={setErrorText}
                setActiveSlide={setActiveSlide}
              />
            </>
          }
          sixthSlide={
            isSuccess ? (
              <Success
                noHeader
                paymentText=""
                setPage={setPage}
                setActiveSlide={setActiveSlide}
                isClose={isCloseModal}
              />
            ) : (
              <Error
                noHeader
                paymentText=""
                error={errorText}
                isClose={isCloseModal}
                setPage={setPage}
                pageLabel={prevSlide || activeSlide}
                setActiveSlide={setActiveSlide}
                destroyCheckout={payload.destroyCheckout}
              />
            )
          }
        />
      </Body>
    </>
  );
};

export default CardPayment;
