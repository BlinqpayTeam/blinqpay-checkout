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
  }
  & button {
    margin: 1.2rem auto;
    background: #7765c4;
    padding: 0.5rem 1.5rem;
    outline: none;
    border-style: none;
    border-radius: 6px;
    color: #fff;
    cursor: pointer;
    font-size: 0.8rem;
    transition: 0.4s ease-in-out all;
  }
  & button:hover {
    background: #7765c4bd;
  }
`;
