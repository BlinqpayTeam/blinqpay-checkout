import React, { useEffect, useState } from 'react';
import GenericHeader from '../../components/Headers/GenericHeader';
import { Container } from './style';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import Alert from '../../assets/svgs/Alert';
import { IVerification } from './IVerification';

const Pending: React.FC<IVerification.IProps> = ({
  page,
  setPage,
  logo,
  paymentText = '',
  user,
  setActiveSlide,
  noHeader,
  pendingText,
}: IVerification.IProps) => {
  return (
    <>
      <GenericHeader
        paymentMethodIcon={logo}
        paymentText={paymentText}
        setPage={setPage || null}
        pendingText={pendingText}
      />
      <Container>
        <div className="success-container">
          <Alert />
        </div>
        <span className="transfer-successful"> </span>
        <span className="check"> </span>

        <PrimaryButton onClick={() => (setPage ? setPage('main') : null)} type="submit" text="Make another Payment" />
      </Container>
    </>
  );
};
export default Pending;
