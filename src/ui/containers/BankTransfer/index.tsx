import React, { useContext, useEffect, useState } from 'react';
import { Body } from '../../components/Layout/style';
import { IBankTransfer } from './IBankTransfer';
import { getBankDetails } from '../../../api/bankTransfer';
import { PaymentMethodContext } from '../../../context';
import { PaymentContextType, PaymentMethod } from '../../../types';

const BankTransferIcon = React.lazy(() => import('../../assets/svgs/BankTransferIcon'));
const Spinner = React.lazy(() => import('../../assets/svgs/Spinner'));
const GenericHeader = React.lazy(() => import('../../components/Headers/GenericHeader'));
const Overall = React.lazy(() => import('../../components/Slide/Overall'));
const Success = React.lazy(() => import('../Verification/Success'));
const BankForm = React.lazy(() => import('./BankForm'));
const Pending = React.lazy(() => import('../Verification/Pending'));
const Help = React.lazy(() => import('../Verification/Help'));
const ErrorWithAlt = React.lazy(() => import('../Verification/ErrorWithAlt'));
const Bank = React.lazy(() => import('../../assets/svgs/Bank'));

const BankTransfer: React.FC<IBankTransfer.IProps> = ({
  page,
  setPage,
  txRef,
  publicKey,
  payload,
}: IBankTransfer.IProps) => {
  const [activeSlide, setActiveSlide] = useState('first');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [acc, setAcc] = useState({ bankName: '', accountNumber: '' });
  const [verifying, setVerifying] = useState(false);
  const [transferStatus, setTransferStatus] = useState('');
  const [isError, setIsError] = useState(false);
  const amount = Number(payload?.amount || 'N1000.5').toFixed(2);
  const { setSelectedMethods, selectedMethods } = useContext(PaymentMethodContext) as PaymentContextType;
  const getAccDetails = async () => {
    setLoading(true);
    const res = await getBankDetails({
      collectionChannel: 'API_NOTIFICATION',
      transactionReference: txRef,
    });
    if (res?.data?.data) {
      setAcc(res?.data?.data as { bankName: string; accountNumber: string });
    } else {
      if (!selectedMethods.includes(PaymentMethod.BANK_TRANSFER))
        setSelectedMethods((curr) => [...curr, PaymentMethod.BANK_TRANSFER]);
      setIsError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAccDetails();
  }, []);

  const renderByResponse = () => {
    switch (transferStatus) {
      case 'PENDING':
        return (
          <Pending
            amount={amount}
            paymentStatus="pending"
            setPage={setPage}
            checkoutDetails={payload}
            txRef={txRef}
            isClose={true}
            destroyCheckout={payload.destroyCheckout}
            paymentText="Pay with Bank Transfer"
            user={payload?.customer?.name}
            setActiveSlide={setActiveSlide}
            logo={<BankTransferIcon />}
            pendingText={
              'Your bank currently receives slow payments. Slow payments are usually confirmed within 30 minutes. You will receive a receipt once your payment is confirmed by your bank'
            }
          />
        );
      case 'PAID':
        return (
          <Success
            amount={amount}
            setPage={setPage}
            checkoutDetails={payload}
            txRef={txRef}
            destroyCheckout={payload.destroyCheckout}
            paymentText="Pay with Bank Transfer"
            user={payload?.customer?.name}
            setActiveSlide={setActiveSlide}
            logo={<BankTransferIcon />}
          />
        );
      case 'PARTIALLY_PAID':
        return (
          <ErrorWithAlt
            setPage={setPage}
            isClose={true}
            checkoutDetails={payload}
            txRef={txRef}
            destroyCheckout={payload.destroyCheckout}
            paymentStatus="failed"
            paymentText="Pay with Bank Transfer"
            user={payload?.customer?.name}
            setActiveSlide={setActiveSlide}
            logo={<BankTransferIcon />}
            error="You have paid less than the expected amount"
          />
        );
      case 'OVERPAID':
        return (
          <ErrorWithAlt
            paymentText="Pay with Bank Transfer"
            error="You have paid in excess of the expected amount"
            isClose={true}
            checkoutDetails={payload}
            txRef={txRef}
            paymentStatus="failed"
            setPage={setPage}
            logo={<Bank />}
            user={payload?.customer?.name}
            amount={amount}
            setActiveSlide={setActiveSlide}
            destroyCheckout={payload.destroyCheckout}
          />
        );
      default:
        return (
          <ErrorWithAlt
            paymentText="Pay with Bank Transfer"
            error="We are unable to process transfers at this time"
            setPage={setPage}
            logo={<Bank />}
            user={payload?.customer?.name}
            amount={amount}
            checkoutDetails={payload}
            txRef={txRef}
            paymentStatus="failed"
            setActiveSlide={setActiveSlide}
            destroyCheckout={payload.destroyCheckout}
          />
        );
    }
  };

  return (
    <>
      <Overall
        activeSlide={activeSlide}
        firstSlide={
          isError ? (
            <ErrorWithAlt
              paymentText="Pay with Bank Transfer"
              error="An error occurred while loading bank details"
              checkoutDetails={payload}
              txRef={txRef}
              paymentStatus="failed"
              setPage={setPage}
              logo={<Bank />}
              user={payload?.customer?.name}
              amount={amount}
              setActiveSlide={setActiveSlide}
              destroyCheckout={payload.destroyCheckout}
            />
          ) : (
            <>
              <GenericHeader
                paymentMethodIcon={<BankTransferIcon />}
                paymentText="Pay with Bank Transfer"
                payingCustomer={payload?.customer?.name}
                amount={amount}
                showChangeMethod={!loading && !verifying}
                setPage={setPage}
              />
              <Body>
                {loading || verifying ? (
                  <>
                    {' '}
                    <Spinner /> <div className="backdrop"></div>
                    <BankForm
                      getAccDetails={getAccDetails}
                      setActiveSlide={setActiveSlide}
                      setSuccess={setSuccess}
                      loading={loading}
                      acc={acc}
                      setAcc={setAcc}
                      txRef={txRef}
                      publicKey={publicKey}
                      verifying={verifying}
                      setVerifying={setVerifying}
                      setLoading={setLoading}
                      setTransferStatus={setTransferStatus}
                      amount={amount}
                    />
                  </>
                ) : (
                  <BankForm
                    getAccDetails={getAccDetails}
                    setActiveSlide={setActiveSlide}
                    setSuccess={setSuccess}
                    loading={loading}
                    acc={acc}
                    setAcc={setAcc}
                    txRef={txRef}
                    publicKey={publicKey}
                    verifying={verifying}
                    setVerifying={setVerifying}
                    setLoading={setLoading}
                    setTransferStatus={setTransferStatus}
                    amount={amount}
                  />
                )}
              </Body>
            </>
          )
        }
        secondSlide={<>{renderByResponse()}</>}
        thirdSlide={<Help setActiveSlide={setActiveSlide} />}
      />
    </>
  );
};
export default BankTransfer;
