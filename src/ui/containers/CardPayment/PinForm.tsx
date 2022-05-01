import React, { useContext, useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { authorizeWithPin } from '../../../api/card';
import { PaymentMethodContext } from '../../../context';
import { PaymentContextType, PaymentMethod } from '../../../types';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import { ICardPayment } from './ICardPayment';
import { PinFormContainer } from './style';

const PinForm: React.FC<ICardPayment.IPinProps> = ({
  setActiveSlide,
  txRef,
  setErrorText,
  setIsSuccess,
  setIsCloseModal,
  setRedirectUrl,
  setPaymentStatus,
  setEnableChangeMethod,
}: ICardPayment.IPinProps) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const failedMsg = 'An error occurred while verifying your pin';
  const { setSelectedMethods } = useContext(PaymentMethodContext) as PaymentContextType;
  const handleChange = (val: any) => {
    setOtp(val);
  };
  useEffect(() => {
    setEnableChangeMethod(false);
  }, []);
  const handleClick = async () => {
    setLoading(true);
    const { data } = await authorizeWithPin({
      pin: otp,
      transactionReference: txRef,
    });
    setLoading(false);
    setEnableChangeMethod(true);
    const { data: res } = data as unknown as Record<string, Record<string, string> | undefined>;
    if (res?.redirect_url) setRedirectUrl(res.redirect_url);
    if (data?.error || res?.status === 'FAILED') {
      setPaymentStatus(res?.status || 'failed');
      setErrorText((data?.message as string) || failedMsg);
      setIsSuccess(false);
      setSelectedMethods((curr) => [...curr, PaymentMethod.CARD_PAYMENT]);
      setActiveSlide('sixth');
    } else if (res?.authModel === 'CARD_ENROLL') {
      setActiveSlide('fifth');
    } else if (res?.authModel === 'OTP') {
      setActiveSlide('third');
    } else if (res?.authModel === '3DS') {
      setActiveSlide('seventh');
    } else {
      setEnableChangeMethod(false);
      setPaymentStatus('success');
      setIsSuccess(true);
      setActiveSlide('sixth');
    }
  };

  return (
    <PinFormContainer>
      <div className="wrapper">
        <p>Please enter the four dight card pin to authorize this transaction</p>
        <div className="otp-wrapper">
          <OtpInput
            value={otp}
            onChange={handleChange}
            numInputs={4}
            inputStyle="otp-field"
            isInputNum
            containerStyle="otpinput-container"
          />
        </div>

        <PrimaryButton
          disabled={!otp || ((otp && otp.length < 4) as boolean) || loading}
          loading={loading}
          onClick={handleClick}
          type="button"
          text="Authorize"
        />
      </div>
    </PinFormContainer>
  );
};

export default PinForm;
