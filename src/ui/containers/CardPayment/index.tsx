import React, { useState } from 'react';
import Card from '../../assets/svgs/Card';
import ColoredCard from '../../assets/svgs/ColoredCard';
import GenericHeader from '../../components/Headers/GenericHeader';
import CombinePayment from '../../components/Layout/CombinePayment';
import { Body } from '../../components/Layout/style';
import Overall from '../../components/Slide/Overall';
// import Error from '../Verification/Error';
import ErrorWithAlt from '../Verification/ErrorWithAlt';
import Success from '../Verification/Success';
import ThreeDSCard from './3DSCard';
import AddressForm from './AddressForm';
import CardForm from './CardForm';
import { ICardPayment } from './ICardPayment';
import OTPForm from './OTPForm';
import PhoneAuthorization from './PhoneAuthorization';
import PinForm from './PinForm';
import { ModeFlag } from './style';
import TestCards from './TestCards';

const CardPayment: React.FC<ICardPayment.IProps> = ({ page, setPage, payload }: ICardPayment.IProps) => {
  const [activeSlide, setActiveSlide] = useState('eighth');
  const [isSuccess, setIsSuccess] = useState(true);
  const [isCloseModal, setIsCloseModal] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');
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
      <ModeFlag>TEST</ModeFlag>
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
                setRedirectUrl={setRedirectUrl}
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
                setRedirectUrl={setRedirectUrl}
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
                setRedirectUrl={setRedirectUrl}
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
                setRedirectUrl={setRedirectUrl}
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
                setRedirectUrl={setRedirectUrl}
              />
            </>
          }
          sixthSlide={
            isSuccess ? (
              <Success
                noHeader
                logo={<Card />}
                paymentText="Pay with Card"
                setPage={setPage}
                setActiveSlide={setActiveSlide}
                isClose={isCloseModal}
                user={payload.customer?.email}
              />
            ) : (
              <ErrorWithAlt
                noHeader
                logo={<Card />}
                paymentText="Pay with Card"
                error={errorText}
                isClose={isCloseModal}
                setPage={setPage}
                pageLabel={prevSlide || activeSlide}
                setActiveSlide={setActiveSlide}
                destroyCheckout={payload.destroyCheckout}
              />
            )
          }
          seventhSlide={
            <>
              <ThreeDSCard
                txRef={payload.transactionReference as string}
                setIsSuccess={setIsSuccess}
                setIsCloseModal={setIsCloseModal}
                setActiveSlide={setActiveSlide}
                url={redirectUrl}
                publicKey={payload.publicKey}
              />
            </>
          }
          eighthSlide={
            <>
              <TestCards setActiveSlide={setActiveSlide} />
            </>
          }
        />
      </Body>
    </>
  );
};

export default CardPayment;
