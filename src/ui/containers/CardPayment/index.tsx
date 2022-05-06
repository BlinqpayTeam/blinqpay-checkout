import React, { useEffect, useState } from 'react';
import { Body } from '../../components/Layout/style';
import { ICardPayment } from './ICardPayment';
import { ModeFlag } from './style';

const Card = React.lazy(() => import('../../assets/svgs/Card'));
const ColoredCard = React.lazy(() => import('../../assets/svgs/ColoredCard'));
const GenericHeader = React.lazy(() => import('../../components/Headers/GenericHeader'));
const Overall = React.lazy(() => import('../../components/Slide/Overall'));
const ErrorWithAlt = React.lazy(() => import('../Verification/ErrorWithAlt'));
const Success = React.lazy(() => import('../Verification/Success'));
const ThreeDSCard = React.lazy(() => import('./3DSCard'));
const AddressForm = React.lazy(() => import('./AddressForm'));
const CardForm = React.lazy(() => import('./CardForm'));
const OTPForm = React.lazy(() => import('./OTPForm'));
const PhoneAuthorization = React.lazy(() => import('./PhoneAuthorization'));
const PinForm = React.lazy(() => import('./PinForm'));
const TestCards = React.lazy(() => import('./TestCards'));

const CardPayment: React.FC<ICardPayment.IProps> = ({ page, setPage, payload }: ICardPayment.IProps) => {
  const [activeSlide, setActiveSlide] = useState(payload?.testMode ? 'eighth' : 'first');
  const [isSuccess, setIsSuccess] = useState(true);
  const [isCloseModal, setIsCloseModal] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [prevSlide, setPrevSlide] = useState<string | undefined>(undefined);
  const [enableChangeMethod, setEnableChangeMethod] = useState(true);
  const amount = Number(payload?.amount || 'N1000.5').toFixed(2);
  return (
    <>
      <GenericHeader
        paymentMethodIcon={<ColoredCard />}
        paymentText="Pay with Card"
        payingCustomer={payload?.customer?.name || 'John.Doe@blinqpay.io'}
        amount={amount}
        showChangeMethod={enableChangeMethod}
        setPage={setPage}
      />
      {payload?.testMode ? <ModeFlag>TEST</ModeFlag> : ''}
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
                setPaymentStatus={setStatus}
                setEnableChangeMethod={setEnableChangeMethod}
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
                setPaymentStatus={setStatus}
                setEnableChangeMethod={setEnableChangeMethod}
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
                setPaymentStatus={setStatus}
                setEnableChangeMethod={setEnableChangeMethod}
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
                setPaymentStatus={setStatus}
                setEnableChangeMethod={setEnableChangeMethod}
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
                setPaymentStatus={setStatus}
                setEnableChangeMethod={setEnableChangeMethod}
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
                paymentStatus={status}
                checkoutDetails={payload}
                destroyCheckout={payload.destroyCheckout}
                txRef={payload.transactionReference as string}
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
                paymentStatus={status}
                checkoutDetails={payload}
                txRef={payload.transactionReference as string}
              />
            )
          }
          seventhSlide={
            <>
              <ThreeDSCard
                amount={amount}
                email={payload.customer?.email as string}
                txRef={payload.transactionReference as string}
                setIsSuccess={setIsSuccess}
                setIsCloseModal={setIsCloseModal}
                setActiveSlide={setActiveSlide}
                url={redirectUrl}
                publicKey={payload.publicKey}
                setPaymentStatus={setStatus}
                setEnableChangeMethod={setEnableChangeMethod}
                callbackUrl={payload.redirectUrl}
              />
            </>
          }
          eighthSlide={
            <>
              <TestCards
                setActiveSlide={setActiveSlide}
                txRef={payload.transactionReference as string}
                setIsSuccess={setIsSuccess}
                setErrorText={setErrorText}
                amount={amount}
                setRedirectUrl={setRedirectUrl}
                setPaymentStatus={setStatus}
                setEnableChangeMethod={setEnableChangeMethod}
              />
            </>
          }
        />
      </Body>
    </>
  );
};

export default CardPayment;
