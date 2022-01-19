import React from 'react';
import PaymentHeader from '../../components/Headers/PaymentHeader';
import CardForm from './CardForm';
import { CardBody } from './style';

const CardPayment = () => {
  return (
    <>
      <PaymentHeader />
      <CardBody>
        <CardForm />
      </CardBody>
    </>
  );
};

export default CardPayment;
