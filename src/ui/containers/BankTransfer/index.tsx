import React, { useEffect, useState } from 'react';
import BankTransferIcon from '../../assets/svgs/BankTransferIcon';
import Spinner from '../../assets/svgs/Spinner';
import GenericHeader from '../../components/Headers/GenericHeader';
import { Body } from '../../components/Layout/style';
import Overall from '../../components/Slide/Overall';
import Error from '../Verification/Error';
import Success from '../Verification/success';
import BankForm from './BankForm';
import { IBankTransfer } from './IBankTransfer';
import { getBankDetails } from '../../../api/bankTransfer';
import Pending from '../Verification/Pending';
import Help from '../Verification/Help';

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

  const getAccDetails = async () => {
    setLoading(true);
    const res = await getBankDetails({
      collectionChannel: 'API_NOTIFICATION',
      transactionReference: txRef,
    });
    if (res?.data?.data) {
      setAcc(res?.data?.data as { bankName: string; accountNumber: string });
    } else {
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
            setPage={setPage}
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
            setPage={setPage}
            paymentText="Pay with Bank Transfer"
            user={payload?.customer?.name}
            setActiveSlide={setActiveSlide}
            logo={<BankTransferIcon />}
          />
        );
      case 'PARTIALLY_PAID':
        return (
          <Error
            setPage={setPage}
            paymentText="Pay with Bank Transfer"
            user={payload?.customer?.name}
            setActiveSlide={setActiveSlide}
            logo={<BankTransferIcon />}
          />
        );
      case 'OVERPAID':
        return (
          <Error
            setPage={setPage}
            paymentText="Pay with Bank Transfer"
            user={payload?.customer?.name}
            setActiveSlide={setActiveSlide}
            logo={<BankTransferIcon />}
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
            <Error
              setPage={setPage}
              paymentText="Pay with Bank Transfer"
              user={payload?.customer?.name}
              setActiveSlide={setActiveSlide}
              logo={<BankTransferIcon />}
              error={'An error occured while loading bank details'}
              pageLabel={'first'}
              setIsError={setIsError}
            />
          ) : (
            <>
              <GenericHeader
                paymentMethodIcon={<BankTransferIcon />}
                paymentText="Pay with Bank Transfer"
                payingCustomer={payload?.customer?.name}
                amount={amount}
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
