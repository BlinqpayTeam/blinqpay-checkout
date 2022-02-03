import styled from 'styled-components';

export const CardFormContainer: any = styled.div`
  background: #f0f1f2;
  box-shadow: 0px 4.343px 14.4767px rgba(0, 0, 0, 0.1);
  border-radius: 7.23834px;
  padding: 1.5rem 2.5rem;
`;
export const PinFormContainer: any = styled.div`
  padding: 1.5rem 2.5rem;
  display: flex;
  justify-content: center;
  & .wrapper {
    & p {
      text-align: center;
      font-size: 16px;
      font-family: 'Avenir';
      color: #0c0c0c;
      padding: 5% 10%;
    }
    & .otp-wrapper {
      padding: 0 25%;
      margin: 5% 0;
    }
  }
`;

export const OTPFormContainer: any = styled.div`
  padding: 0.5rem 2.5rem;
  display: flex;
  justify-content: center;
  & .wrapper {
    & p {
      text-align: center;
      font-size: 16px;
      font-family: 'Avenir';
      color: #0c0c0c;
      padding: 5% 10%;
    }
    & .otp-wrapper {
      padding: 0 2.5%;
      margin: 5% 0;
    }
  }
`;

export const AddressFormContainer: any = styled.div`
  padding: 0.5rem 2.5rem;
`;
export const PhoneFormContainer: any = styled.div`
  padding: 0.5rem 2.5rem;
  .top-text {
    color: #0c0c0c;
    padding: 0 10%;
    text-align: center;
    font-size: 16px;
  }
  .phone-form {
    margin: 5% 0;
  }
  .bottom-text {
    text-align: center;
    color: rgba(0, 0, 0, 0.5);
    font-size: 12px;
  }
  .back {
    margin-top: 25%;
    text-align: center;
    color: #7765c4;
    font-size: 20px;
    font-weight: 900;
    cursor: pointer;
  }
`;
