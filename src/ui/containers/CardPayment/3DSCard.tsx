import React, { useContext, useEffect, useState } from 'react';
import { ThreeDSContainer } from './style';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import { ICardPayment } from './ICardPayment';
import { PaymentMethodContext } from '../../../context';
import { PaymentContextType, PaymentMethod } from '../../../types';
import { verifyTransaction } from '../../../api/transaction';

const DoubleCardLogo = React.lazy(() => import('../../assets/svgs/3DSCard'));
const Spinner = React.lazy(() => import('../../assets/svgs/Spinner'));

enum VerifyStatus {
  success = 'success',
  failed = 'failed',
  pending = 'pending',
  expired = 'expired',
}
const ThreeDSCard: React.FC<ICardPayment.I3DSProps> = ({
  setActiveSlide,
  setIsSuccess,
  txRef,
  publicKey,
  url,
  setPaymentStatus,
  setEnableChangeMethod,
  setIsCloseModal,
}: ICardPayment.I3DSProps) => {
  const { setSelectedMethods } = useContext(PaymentMethodContext) as PaymentContextType;
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<VerifyStatus>(VerifyStatus.pending);
  const [timerHandle, setTimerHandle] = useState<number | undefined>(undefined);
  const [continueValidationCount, setContinueValidationCount] = useState(0);
  const [toggleVisibilityCount, setToggleVisibilityCount] = useState(0);
  const [countDownStarted, setCountDownStarted] = useState(false);
  const handleClick = async (): Promise<void> => {
    window.open(url, '_blank');
    setLoading(true);
  };

  const onVisibilityChange = (): void => {
    if (document.visibilityState === 'visible') {
      setToggleVisibilityCount((v) => v + 1);
    }
  };
  const clearTimerHandle = () => {
    if (timerHandle) clearTimeout(timerHandle);
  };
  useEffect(() => {
    setEnableChangeMethod(false);
    return () => {
      clearTimerHandle();
    };
  }, []);

  useEffect(() => {
    if (status !== VerifyStatus.pending) {
      setIsSuccess(false);
      setSelectedMethods((curr) => [...curr, PaymentMethod.CARD_PAYMENT]);
      setEnableChangeMethod(true);
      if (status === VerifyStatus.expired) {
        setIsCloseModal(true);
        setEnableChangeMethod(false);
      }
      setActiveSlide('sixth');
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    if (continueValidationCount && status === VerifyStatus.pending) handleVerification();
  }, [continueValidationCount]);

  const handleVerification = async (): Promise<void> => {
    const { data: verifyRes } = await verifyTransaction(publicKey, txRef);
    if (
      verifyRes?.error ||
      ['failed', 'expired'].includes((verifyRes?.data as Record<string, string>)?.paymentStatus?.toLowerCase())
    ) {
      clearTimerHandle();
      const status =
        ((verifyRes?.data as Record<string, string>)?.paymentStatus?.toLowerCase() as VerifyStatus) ||
        VerifyStatus.failed;
      setPaymentStatus(status);
      setStatus(
        ((verifyRes?.data as Record<string, string>)?.paymentStatus?.toLowerCase() as VerifyStatus) ||
          VerifyStatus.failed,
      );
    } else if (['SUCCESSFUL', 'SUCCESS'].includes((verifyRes?.data as Record<string, string>)?.paymentStatus)) {
      clearTimerHandle();
      setPaymentStatus(VerifyStatus.success);
      setStatus(VerifyStatus.success);
    } else {
      window.setTimeout(() => {
        setContinueValidationCount((count) => count + 1);
      }, 600);
    }
  };

  useEffect(() => {
    if (countDownStarted && status === VerifyStatus.pending) {
      setTimerHandle(window.setTimeout(() => setStatus(VerifyStatus.expired), 300000));
      handleVerification();
    }
  }, [countDownStarted]);

  useEffect(() => {
    if (loading && !countDownStarted) {
      setCountDownStarted(true);
    }
  }, [toggleVisibilityCount]);

  useEffect(() => {
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);
  return (
    <ThreeDSContainer>
      <div className="icon-wrapper">
        <DoubleCardLogo />
      </div>
      <p>
        {loading
          ? 'we are waiting for a response from your card issuer'
          : 'By clicking the button below, you will be able to authenticate with your bank'}
      </p>
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <PrimaryButton type="submit" text="Authenticate" disabled={loading} loading={loading} onClick={handleClick} />
        )}
      </div>
    </ThreeDSContainer>
  );
};
export default ThreeDSCard;
