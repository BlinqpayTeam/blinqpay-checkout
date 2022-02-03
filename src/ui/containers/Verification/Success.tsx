import React, { useEffect, useState } from 'react';
import GenericHeader from '../../components/Headers/GenericHeader';
import { Container } from './style';
import PrimaryButton from '../../components/Buttons/PrimaryButton';

import Successful from '../../assets/svgs/Successful';
import { IVerification } from './IVerification';

const Success: React.FC<IVerification.IProps> = ({
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
          <Successful />
        </div>
        <span className="transfer-successful">Transaction Succesful!</span>
        <span className="check">Please check your mail. We sent your receipt to {user}</span>

        <PrimaryButton type="submit" text="Make another Payment" />
      </Container>
    </>
  );
};

export default Success;
