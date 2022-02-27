import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { authorizeWithPin } from '../../../api/card';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import { ICardPayment } from './ICardPayment';
import { PinFormContainer } from './style';

const PinForm: React.FC<ICardPayment.IPinProps> = ({
  setActiveSlide,
  txRef,
  setErrorText,
  setIsSuccess,
  setIsCloseModal,
}: ICardPayment.IPinProps) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const failedMsg = 'An error occurred while verifying your pin';
  const handleChange = (val: any) => {
    setOtp(val);
  };
  const handleClick = async () => {
    setLoading(true);
    const { data } = await authorizeWithPin({
      pin: otp,
      transactionReference: txRef,
    });
    setLoading(false);
    const { data: res } = data as unknown as Record<string, Record<string, string> | undefined>;
    if (data?.error || res?.status === 'FAILED') {
      setErrorText((data?.message as string) || failedMsg);
      setIsSuccess(false);
      setIsCloseModal(true);
      setActiveSlide('sixth');
    } else if (res?.authModel === 'CARD_ENROLL') {
      setActiveSlide('fifth');
    } else if (res?.authModel === 'OTP') {
      setActiveSlide('third');
    } else {
      setIsSuccess(true);
      setIsCloseModal(true);
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
