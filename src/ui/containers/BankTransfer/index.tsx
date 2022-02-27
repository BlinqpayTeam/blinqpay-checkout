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

const BankTransfer: React.FC<IBankTransfer.IProps> = ({ page, setPage, txRef, publicKey }: IBankTransfer.IProps) => {
  const [activeSlide, setActiveSlide] = useState('first');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [acc, setAcc] = useState({ bankName: '', accountNumber: '' });

  const getAccDetails = async () => {
    setLoading(true);
    const res = await getBankDetails({
      collectionChannel: 'API_NOTIFICATION',
      transactionReference: txRef,
    });
    setAcc(res?.data?.data as { bankName: string; accountNumber: string });
    setLoading(false);
  };
  useEffect(() => {
    getAccDetails();
  }, []);

  return (
    <>
      <Overall
        activeSlide={activeSlide}
        firstSlide={
          <>
            <GenericHeader
              paymentMethodIcon={<BankTransferIcon />}
              paymentText="Pay with Bank Transfer"
              payingCustomer="John.Doe@blinqpay.io"
              amount="N1000.5"
              setPage={setPage}
            />
            <Body>
              {loading ? (
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
                />
              )}
            </Body>
          </>
        }
        secondSlide={
          <>
            {success ? (
              <Success
                setPage={setPage}
                paymentText="Pay with Bank Transfer"
                user="John.Doe@blinkpay.io"
                setActiveSlide={setActiveSlide}
                logo={<BankTransferIcon />}
              />
            ) : (
              <Error
                setPage={setPage}
                paymentText="Pay with Bank Transfer"
                user="John.Doe@blinkpay.io"
                setActiveSlide={setActiveSlide}
                logo={<BankTransferIcon />}
              />
            )}
          </>
        }
      />
    </>
  );
};
export default BankTransfer;
