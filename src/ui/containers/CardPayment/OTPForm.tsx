import React, { useContext, useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import { OTPFormContainer } from './style';
import { ICardPayment } from './ICardPayment';
import { authorizeWithOTP } from '../../../api/card';
import { verifyTransaction } from '../../../api/transaction';
import { PaymentMethodContext } from '../../../context';
import { PaymentContextType, PaymentMethod } from '../../../types';

const OTPForm: React.FC<ICardPayment.IOTPProps> = ({
  setActiveSlide,
  txRef,
  setErrorText,
  setIsSuccess,
  publicKey,
  setPaymentStatus,
  setEnableChangeMethod,
}: ICardPayment.IOTPProps) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const handleChange = (val: any) => {
    setOtp(val);
  };
  const { setSelectedMethods } = useContext(PaymentMethodContext) as PaymentContextType;

  useEffect(() => {
    setEnableChangeMethod(false);
  }, []);

  const closeModal = (data: Record<string, unknown>): void => {
    setLoading(false);
    setErrorText(data?.message as string);
    setIsSuccess(false);
    setSelectedMethods((curr) => [...curr, PaymentMethod.CARD_PAYMENT]);
    setEnableChangeMethod(true);
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
      if (verifyRes?.error) {
        setPaymentStatus('failed');
        closeModal(verifyRes);
      } else {
        setLoading(false);
        const res = verifyRes?.data as Record<string, string>;
        setPaymentStatus(res?.paymentStatus);
        if (res?.paymentStatus === 'FAILED') {
          closeModal(verifyRes as Record<string, unknown>);
        } else {
          setIsSuccess(true);
          setActiveSlide('sixth');
        }
      }
    }
  };
  return (
    <OTPFormContainer>
      <div className="wrapper">
        <p>Please enter the OTP sent to your mobile number</p>
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
