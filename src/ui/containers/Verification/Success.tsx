import React, { useEffect, useState } from 'react';
import GenericHeader from '../../components/Headers/GenericHeader';
import { Container } from './style';
import Successful from '../../assets/svgs/Successful';
import { IVerification } from './IVerification';

const Success: React.FC<IVerification.IProps> = ({
  setPage,
  logo,
  paymentText = '',
  user,
  noHeader,
  checkoutDetails,
  destroyCheckout,
  amount,
  txRef,
}: IVerification.IProps) => {
  useEffect(() => {
    const payload = {
      transactionReference: txRef,
      amount,
      paymentReference: checkoutDetails.reference,
      status: 'success',
    };
    setTimeout(async () => {
      if (checkoutDetails.redirectUrl)
        window.open(
          `${checkoutDetails.redirectUrl}?transactionReference=${payload.transactionReference}&amount=${payload.amount}&status=${payload.status}&paymentReference=${payload.paymentReference}`,
          '_self',
        );
      else {
        try {
          (checkoutDetails?.onSuccess as (data: Record<string, unknown>) => void)(payload);
        } catch (error) {
          console.log(error);
        }
      }
      if (destroyCheckout) destroyCheckout();
    }, 4000);
  }, []);
  return (
    <>
      {!noHeader && (
        <GenericHeader
          showChangeMethod={false}
          paymentMethodIcon={logo}
          paymentText={paymentText}
          setPage={setPage || null}
        />
      )}
      <Container>
        <div className="success-container">
          <Successful />
        </div>
        <span className="transfer-successful">Transaction Successful!</span>
        <span className="check">Please check your mail. We sent your receipt to {user}</span>
      </Container>
    </>
  );
};

export default Success;
