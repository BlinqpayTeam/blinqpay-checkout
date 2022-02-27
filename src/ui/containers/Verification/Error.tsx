import React, { useEffect, useState } from 'react';
import GenericHeader from '../../components/Headers/GenericHeader';
import { Container } from './style';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import { IVerification } from './IVerification';
import ErrorIcon from '../../assets/svgs/ErrorIcon';
import Spinner from '../../assets/svgs/Spinner';

const Error: React.FC<IVerification.IProps> = ({
  page,
  setPage,
  logo,
  paymentText,
  user,
  setActiveSlide,
  noHeader,
  error,
  isClose,
  pageLabel,
  destroyCheckout,
}: IVerification.IProps) => {
  useEffect(() => {
    if (isClose) {
      if (destroyCheckout) {
        setTimeout(destroyCheckout, 4000);
      }
    }
  }, [isClose, destroyCheckout]);
  const handleTryAgainClick = () => {
    console.log('Retry clicked for page:', pageLabel);
    if (pageLabel && !isClose) {
      setActiveSlide(pageLabel);
    }
  };
  return (
    <>
      {!noHeader && <GenericHeader paymentMethodIcon={logo} paymentText={paymentText} setPage={setPage} />}
      <Container>
        <div className="success-container">
          <ErrorIcon />
        </div>
        <span className="transfer-successful"> </span>
        <span className="check-error"> {error || 'Payment cannot not be confirmed at this moment'}</span>

        {isClose ? (
          <Spinner xClasses={['close-spinner']} />
        ) : (
          <PrimaryButton type="submit" text="Try Again" onClick={handleTryAgainClick} />
        )}
      </Container>
    </>
  );
};

export default Error;
