import React, { useEffect, useState } from 'react';
import GenericHeader from '../../components/Headers/GenericHeader';
import { Container } from './style';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import { IVerification } from './IVerification';
import ErrorIcon from '../../assets/svgs/ErrorIcon';

const Error: React.FC<IVerification.IProps> = ({
  page,
  setPage,
  logo,
  paymentText,
  user,
  setActiveSlide,
  noHeader,
}: IVerification.IProps) => {
  return (
    <>
      {!noHeader && <GenericHeader paymentMethodIcon={logo} paymentText={paymentText} setPage={setPage} />}
      <Container>
        <div className="success-container">
          <ErrorIcon />
        </div>
        <span className="transfer-successful"> </span>
        <span className="check-error">Payment cannot not be confirmed at this moment</span>

        <PrimaryButton type="submit" text="Try Again" />
      </Container>
    </>
  );
};

export default Error;
