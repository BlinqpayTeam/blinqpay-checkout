import styled from 'styled-components';

export const Container: any = styled.div`
  padding: 2rem;
  padding-bottom: 2.3rem;
  & .qr-container {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    min-height: 70%;
    display: flex;
    justify-content: center;
  }
  & .qr-block {
    position: relative;
    height: 250px;
    width: 250px;
  }
  & .backdrop {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #f7f8f8;
    opacity: 0.9;
  }
  & span {
    display: block;
    margin: 0 auto !important;
    padding: 0;
    text-align: center;
    font-size: 0.8rem;
    color: rgba(0, 0, 0, 0.5);
  }
  & span + span {
    margin-top: 0.1rem !important;
  }
  & .button-container {
    display: flex;
    justify-content: center;
    padding: 0 10%;
  }
`;
