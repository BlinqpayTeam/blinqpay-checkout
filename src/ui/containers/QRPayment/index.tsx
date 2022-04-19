import React, { useContext, useEffect, useState } from 'react';
import GenericHeader from '../../components/Headers/GenericHeader';
import { Container } from './style';
import QrCode from '../../assets/svgs/QrCode';
import Spinner from '../../assets/svgs/Spinner';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import { IQRPayment } from './IQRPayment';
import QrIcon from '../../assets/svgs/QrIcon';
import { getQrCode } from '../../../api/qrpayment';
import ErrorIcon from '../../assets/svgs/ErrorIcon';
import { verifyTransaction } from '../../../api/transaction';
import Successful from '../../assets/svgs/Successful';
import ErrorWithAlt from '../Verification/ErrorWithAlt';
import { Body } from '../../components/Layout/style';
import { PaymentMethodContext } from '../../../context';
import { PaymentContextType, PaymentMethod } from '../../../types';
import Countdown from '../../components/Countdown';
import BankTransferIcon from '../../assets/svgs/BankTransferIcon';
import Pending from '../Verification/Pending';
import Success from '../Verification/success';
import LoadingBar from '../../assets/svgs/LoadingBar';

enum QRError {
  TIMEOUT = 'TIMEOUT',
  QR_FAILED = 'QR_FAILED',
  VERIFY_FAILED = 'VERIFY_FAILED',
}

enum QRSTATE {
  VERIFYING = 'VERIFYING',
  ERROR = 'ERROR',
  DEFAULT = 'DEFAULT',
  SUCCESS = 'SUCCESS',
  PROCESSING = 'PROCESSING',
}

const QRPayment: React.FC<IQRPayment.IProps> = ({
  page,
  setPage,
  txRef,
  publicKey,
  destroyCheckout,
  payingCustomer,
  amount,
  payingCustomerEmail,
}: IQRPayment.IProps) => {
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFetchingQR, setIsFetchingQR] = useState(true);
  const [url, setUrl] = useState('');
  const [isCountDownExpired, setIsCountDownExpired] = useState(false);
  const [errorType, setErrorType] = useState<QRError>(QRError.QR_FAILED);
  const [qrState, setQrState] = useState<QRSTATE>(QRSTATE.DEFAULT);
  const [timerHandle, setTimerHandle] = useState<number>();
  const { setSelectedMethods } = useContext(PaymentMethodContext) as PaymentContextType;
  const [errorText, setErrorText] = useState('An error occurred, please try again');

  const handleClick = async (): Promise<void> => {
    if (isError && errorType === QRError.QR_FAILED) {
      fetchQR();
    } else {
      setQrState(QRSTATE.VERIFYING);
    }
  };

  useEffect(() => {
    if (qrState === QRSTATE.VERIFYING) {
      setLoading(true);
      setIsError(false);
      const interval = window.setInterval(async () => {
        const { data: verifyRes } = await verifyTransaction(publicKey, txRef);
        if (verifyRes?.error || (verifyRes?.data as Record<string, string>)?.paymentStatus === 'FAILED') {
          setQrState(QRSTATE.ERROR);
          setIsCountDownExpired(true);
        } else if (['SUCCESSFUL', 'SUCCESS'].includes((verifyRes?.data as Record<string, string>)?.paymentStatus)) {
          setQrState(QRSTATE.SUCCESS);
          setIsCountDownExpired(true);
        }
      }, 600);
      setTimerHandle(interval);
      return () => clearInterval(interval);
    } // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [qrState]);

  const handleStopVerification = async () => {
    window.clearInterval(timerHandle);
    if (qrState === QRSTATE.VERIFYING) {
      const { data: verifyRes } = await verifyTransaction(publicKey, txRef);
      if (verifyRes?.error || (verifyRes?.data as Record<string, string>)?.paymentStatus === 'FAILED') {
        setQrState(QRSTATE.ERROR);
      } else if (['SUCCESSFUL', 'SUCCESS'].includes((verifyRes?.data as Record<string, string>)?.paymentStatus)) {
        setQrState(QRSTATE.SUCCESS);
      } else {
        setQrState(QRSTATE.PROCESSING);
        setTimeout(destroyCheckout, 2000);
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    if (timerHandle) {
      handleStopVerification();
    }
  }, [isCountDownExpired]);

  const fetchQR = async () => {
    setLoading(true);
    setIsError(false);
    setIsFetchingQR(true);
    const { data } = await getQrCode(txRef);
    setLoading(false);
    setIsFetchingQR(false);
    const res = data?.data as Record<string, string>;
    if (data?.error || !res?.svg) {
      setErrorText('An occured while trying to fetch the QR code');
      setErrorType(QRError.QR_FAILED);
      setIsError(true);
    } else {
      setUrl(res.svg);
    }
  };
  useEffect(() => {
    fetchQR();
  }, []);
  const renderUI = (uiState: QRSTATE) => {
    switch (uiState) {
      case QRSTATE.ERROR: {
        setSelectedMethods((curr) => [...curr, PaymentMethod.QR]);
        return (
          <Body>
            <ErrorWithAlt noHeader error={errorText} setPage={setPage} destroyCheckout={destroyCheckout} />
          </Body>
        );
      }
      case QRSTATE.VERIFYING: {
        return (
          <Container>
            <Body>
              <span>Please hold on while we verify your transaction</span>
              <div>
                <LoadingBar />
              </div>
              <Countdown expireCount={isCountDownExpired} setExpireCount={setIsCountDownExpired} minutes={2} />
            </Body>
          </Container>
        );
      }
      case QRSTATE.SUCCESS: {
        return <Success setPage={setPage} paymentText="Pay with Bank Transfer" noHeader user={payingCustomerEmail} />;
      }
      case QRSTATE.PROCESSING: {
        return (
          <Pending
            setPage={setPage}
            paymentText="Pay with Bank Transfer"
            logo={<BankTransferIcon />}
            noHeader
            pendingText={
              'Your bank currently receives slow payments. Slow payments are usually confirmed within 30 minutes. You will receive a receipt once your payment is confirmed by your bank'
            }
          />
        );
      }
      default:
        return isError ? (
          <>
            <Container>
              <div className="qr-container">
                <ErrorIcon />
              </div>
              <span>{errorText}</span>
              <div className="button-container">
                <PrimaryButton
                  type="submit"
                  text="Try again"
                  disabled={loading}
                  loading={loading}
                  onClick={handleClick}
                />
              </div>
            </Container>
          </>
        ) : (
          <>
            <Container>
              <div className="qr-container">
                <div className="qr-block">
                  {loading ? (
                    <>
                      <Spinner />
                      <div className="backdrop"></div>
                      <QrCode height="250" width="250" />
                    </>
                  ) : (
                    <svg height="250" width="250">
                      <image xlinkHref={url} height="250" width="250" />
                    </svg>
                  )}
                </div>
              </div>
              <span>Use your Blinqchat or your bank</span>
              <span>app to scan the code</span>
              <div className="button-container">
                {!isFetchingQR && (
                  <PrimaryButton
                    type="submit"
                    text="I have made this payment"
                    disabled={loading}
                    loading={loading}
                    onClick={handleClick}
                  />
                )}
              </div>
            </Container>
          </>
        );
    }
  };
  return (
    <>
      <GenericHeader
        paymentMethodIcon={<QrIcon />}
        paymentText="Pay with QR"
        payingCustomer={payingCustomer}
        amount={amount || '0.00'}
        setPage={setPage}
      />
      {renderUI(qrState)}
    </>
  );
};

export default QRPayment;
