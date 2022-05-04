import React, { useCallback, useContext, useEffect, useState } from 'react';
import GenericHeader from '../../components/Headers/GenericHeader';
import { Container } from './style';
import QrCode from '../../assets/svgs/QrCode';
import Spinner from '../../assets/svgs/Spinner';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import { IQRPayment } from './IQRPayment';
import { getQrCode } from '../../../api/qrpayment';
import { verifyTransaction } from '../../../api/transaction';
import { Body } from '../../components/Layout/style';
import { PaymentMethodContext } from '../../../context';
import { PaymentContextType, PaymentMethod } from '../../../types';
import Countdown from '../../components/Countdown';


const LoadingBar = React.lazy(() => import('../../assets/svgs/LoadingBar'));
const ErrorIcon = React.lazy(() => import('../../assets/svgs/ErrorIcon'));
const QrIcon = React.lazy(() => import('../../assets/svgs/QrIcon'));
const Alert = React.lazy(() => import('../../assets/svgs/Alert'));
const Success = React.lazy(() => import('../Verification/Success'));
const ErrorWithAlt = React.lazy(() => import('../Verification/ErrorWithAlt'));

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
  checkoutDetails,
}: IQRPayment.IProps) => {
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFetchingQR, setIsFetchingQR] = useState(true);
  const [url, setUrl] = useState('');
  const [isCountDownExpired, setIsCountDownExpired] = useState(false);
  const [errorType, setErrorType] = useState<QRError>(QRError.QR_FAILED);
  const [qrState, setQrState] = useState<QRSTATE>(QRSTATE.DEFAULT);
  const { setSelectedMethods, selectedMethods } = useContext(PaymentMethodContext) as PaymentContextType;
  const [triggerVerificationCount, setTriggerVerificationCount] = useState(0);
  const [errorText, setErrorText] = useState('An error occurred, please try again');
  const [amountPaid, setAmountPaid] = useState<string | undefined>();

  const handleClick = async (): Promise<void> => {
    if (isError && errorType === QRError.QR_FAILED) {
      fetchQR();
    } else {
      setQrState(QRSTATE.VERIFYING);
    }
  };

  const handleReVerification = async (isExpired: boolean): Promise<void> => {
    if (!isExpired) {
      const { data: verifyRes } = await verifyTransaction(publicKey, txRef);
      const response = verifyRes?.data as Record<string, string>;
      if (verifyRes?.error || response?.paymentStatus === 'FAILED') {
        setQrState(QRSTATE.ERROR);
        setIsCountDownExpired(true);
      } else if (['SUCCESSFUL', 'SUCCESS'].includes(response?.paymentStatus)) {
        setAmountPaid(response?.amount || amount);
        setQrState(QRSTATE.SUCCESS);
        setIsCountDownExpired(true);
      } else {
        window.setTimeout(() => {
          if (setTriggerVerificationCount) setTriggerVerificationCount((count) => count + 1);
        }, 600);
      }
    }
  };

  useEffect(() => {
    if (qrState === QRSTATE.VERIFYING) {
      setLoading(true);
      setIsError(false);
      handleReVerification(isCountDownExpired);
    }
  }, [qrState]);

  useEffect(() => {
    if (triggerVerificationCount !== 0) handleReVerification(isCountDownExpired);
  }, [triggerVerificationCount]);

  const handleStopVerification = async () => {
    if (qrState === QRSTATE.VERIFYING) {
      const { data: verifyRes } = await verifyTransaction(publicKey, txRef);
      const response = verifyRes?.data as Record<string, string>;
      const paid = response?.amount || amount;
      if (verifyRes?.error || response?.paymentStatus === 'FAILED') {
        setQrState(QRSTATE.ERROR);
      } else if (['SUCCESSFUL', 'SUCCESS'].includes(response?.paymentStatus)) {
        setAmountPaid(paid);
        setQrState(QRSTATE.SUCCESS);
      } else {
        setQrState(QRSTATE.PROCESSING);
        const payload = {
          transactionReference: txRef,
          amount: paid,
          paymentReference: checkoutDetails.reference,
          status: 'pending',
        };
        setTimeout(() => {
          if (checkoutDetails.redirectUrl)
            window.open(
              `${checkoutDetails.redirectUrl}?transactionReference=${payload.transactionReference}&amount=${payload.amount}&status=${payload.status}&paymentReference=${payload.paymentReference}`,
              '_self',
            );
          else {
            (checkoutDetails?.onPending as (data: Record<string, unknown>) => void)(payload);
          }
          if (destroyCheckout) destroyCheckout();
        }, 2000);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    handleStopVerification();
  }, [isCountDownExpired]);

  const fetchQR = async () => {
    setLoading(true);
    setIsError(false);
    setIsFetchingQR(true);
    const { data } = await getQrCode(txRef, publicKey);
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
            <ErrorWithAlt
              noHeader
              error={errorText}
              txRef={txRef}
              checkoutDetails={checkoutDetails}
              setPage={setPage}
              destroyCheckout={destroyCheckout}
              amount={amountPaid}
            />
          </Body>
        );
      }
      case QRSTATE.VERIFYING: {
        return (
          <Container>
            <Body>
              <div>Please hold on while we verify your transaction</div>
              <div>
                <LoadingBar />
              </div>
              <Countdown expireCount={isCountDownExpired} setExpireCount={setIsCountDownExpired} minutes={2} />
            </Body>
          </Container>
        );
      }
      case QRSTATE.SUCCESS: {
        return (
          <Success
            paymentStatus="success"
            txRef={txRef}
            checkoutDetails={checkoutDetails}
            setPage={setPage}
            paymentText="Pay with Bank Transfer"
            noHeader
            user={payingCustomerEmail}
            destroyCheckout={destroyCheckout}
            amount={amountPaid}
          />
        );
      }
      case QRSTATE.PROCESSING: {
        return (
          <Container>
            <div className="alert-container">
              <Alert />
            </div>
            <div className="text">
              Your bank currently receives slow payments. Slow payments are usually confirmed within 30 minutes. You
              will receive a receipt once your payment is confirmed by your bank
            </div>
          </Container>
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
        showChangeMethod={qrState === QRSTATE.DEFAULT || (qrState === QRSTATE.ERROR && selectedMethods.length < 3)}
      />
      {renderUI(qrState)}
    </>
  );
};

export default QRPayment;
