import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import { OTPFormContainer } from './style';
import { ICardPayment } from './ICardPayment';

const OTPForm: React.FC<ICardPayment.IOTPProps> = ({ setActiveSlide }: ICardPayment.IOTPProps) => {
  const [otp, setOtp] = useState('');
  const handleChange = (val: any) => {
    setOtp(val);
  };
  const handleClick = () => {
    setActiveSlide('fourth');
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
          disabled={!otp || ((otp && otp.length < 6) as boolean)}
          onClick={handleClick}
          type="button"
          text="Authorize"
        />
      </div>
    </OTPFormContainer>
  );
};

export default OTPForm;
