import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import { OTPFormContainer } from './style';
import { ICardPayment } from './ICardPayment';
import { authorizeWithOTP } from '../../../api/card';
import { verifyTransaction } from '../../../api/transaction';

const OTPForm: React.FC<ICardPayment.IOTPProps> = ({
  setActiveSlide,
  txRef,
  setErrorText,
  setIsCloseModal,
  setIsSuccess,
  publicKey,
}: ICardPayment.IOTPProps) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const handleChange = (val: any) => {
    setOtp(val);
  };
  const closeModal = (data: Record<string, unknown>, payload?: unknown): void => {
    setLoading(false);
    setErrorText(data?.message as string);
    setIsSuccess(false);
    setIsCloseModal(true);
    setActiveSlide('sixth');
  };
  const handleClick = async () => {
    setLoading(true);
    const { data } = await authorizeWithOTP({
      otp,
      transactionReference: txRef,
    });
    if (data?.error) closeModal(data);
    else {
      const { data: verifyRes } = await verifyTransaction(publicKey, txRef);
      if (verifyRes?.error) closeModal(verifyRes);
      else {
        setLoading(false);
        const res = verifyRes?.data as Record<string, string>;
        if (res?.paymentStatus === 'FAILED') closeModal(verifyRes as Record<string, unknown>);
        else {
          //Todo: pass success payload for redirect or call hooks
          setIsSuccess(true);
          setIsCloseModal(true);
          setActiveSlide('sixth');
        }
      }
    }
  };
  return (
    <OTPFormContainer>
      <div className="wrapper">
        <p>Please enter the OTP sent to your ********999</p>
        <div className="otp-wrapper">
          <OtpInput
            value={otp}
            onChange={handleChange}
            numInputs={6}
            inputStyle="otp-field"
            isInputNum
            containerStyle="otpinput-container"
          />
        </div>

        <PrimaryButton
          disabled={!otp || ((otp && otp.length < 4) as boolean) || loading}
          onClick={handleClick}
          type="button"
          text="Authorize"
        />
      </div>
    </OTPFormContainer>
  );
};

export default OTPForm;
