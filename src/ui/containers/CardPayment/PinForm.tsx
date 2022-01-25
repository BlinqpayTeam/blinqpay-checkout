import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import { ICardPayment } from './ICardPayment';
import { PinFormContainer } from './style';

const PinForm: React.FC<ICardPayment.IPinProps> = ({ setActiveSlide }: ICardPayment.IPinProps) => {
  const [otp, setOtp] = useState('');
  const handleChange = (val: any) => {
    setOtp(val);
  };
  const handleClick = () => {
    console.log('clicked==>');
    setActiveSlide('third');
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
          disabled={!otp || ((otp && otp.length < 4) as boolean)}
          onClick={handleClick}
          type="button"
          text="Authorize"
        />
      </div>
    </PinFormContainer>
  );
};

export default PinForm;
