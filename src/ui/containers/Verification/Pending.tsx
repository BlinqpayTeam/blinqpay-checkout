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
  paymentText,
  user,
  setActiveSlide,
  noHeader,
}: IVerification.IProps) => {
  return (
    <>
      <GenericHeader paymentMethodIcon={logo} paymentText={paymentText} setPage={setPage} />
      <Container>
        <div className="success-container">
          <Alert />
        </div>
        <span className="transfer-successful">Transaction Successful!</span>
        <span className="check">Please check your mail. We sent your receipt to {user}</span>

        <PrimaryButton onClick={() => setPage('main')} type="submit" text="Make another Payment" />
      </Container>
    </>
  );
};
export default Pending;
