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
  noHeader,
  pendingText,
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
      status: 'pending',
    };
    setTimeout(async () => {
      if (checkoutDetails.redirectUrl)
        window.open(
          `${checkoutDetails.redirectUrl}?transactionReference=${payload.transactionReference}&amount=${payload.amount}&status=${payload.status}&paymentReference=${payload.paymentReference}`,
          '_self',
        );
      else {
        try {
          (checkoutDetails?.onPending as (data: Record<string, unknown>) => void)(payload);
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
          pendingText={pendingText}
        />
      )}
      <Container>
        <div className="success-container">
          <Alert />
        </div>
        <span className="transfer-successful"> </span>
        <span className="check"> </span>

        {/* <PrimaryButton onClick={() => (setPage ? setPage('main') : null)} type="submit" text="Make another Payment" /> */}
      </Container>
    </>
  );
};
export default Pending;
