import styled from 'styled-components';

export const Container: any = styled.div`
  padding: 2rem;
  padding-bottom: 2.3rem;
  & .success-container {
    margin-top: 1.5rem;
    margin-bottom: 19px;
    min-height: 70%;
    display: flex;
    justify-content: center;
  }
  & .transfer-successful {
    display: block;
    padding: 0;
    text-align: center;
    color: #7765c4;
    font-weight: 500;
    font-size: 23.0559px;
    margin: 0 auto;
  }
  & .account-expired {
    display: block;
    text-align: center;
    margin: 0 auto;
    color: #0c0c0c;
    font-size: 15.0063px;
    font-weight: 900;
  }

  & .check {
    display: block;
    padding: 0;
    text-align: center;
    font-size: 17.2919px;
    color: rgba(0, 0, 0, 0.5);
    margin: 0 auto;
    margin-top: 27px !important;
    margin-bottom: 88px !important;
  }
  & .check-error {
    display: block;
    padding: 0;
    text-align: center;
    color: #000000;
    font-weight: 500;
    font-size: 14.5271px;
    margin: 0 auto;
    margin-top: 27px !important;
    margin-bottom: 88px !important;
  }
`;
