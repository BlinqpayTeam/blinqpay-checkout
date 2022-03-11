import React, { useEffect, useState } from 'react';
import GenericHeader from '../../components/Headers/GenericHeader';
import { Container } from './style';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import Alert from '../../assets/svgs/Alert';
import { IVerification } from './IVerification';

const BankExpired: React.FC<IVerification.IProps> = ({ callback }: IVerification.IProps) => {
  return (
    <>
      <Container>
        <div className="success-container">
          <Alert />
        </div>
        <span className="account-expired"> Account Expired</span>
        <span className="check"> </span>

        <PrimaryButton notFilled onClick={callback} type="submit" text="Try again" />
      </Container>
    </>
  );
};
export default BankExpired;
