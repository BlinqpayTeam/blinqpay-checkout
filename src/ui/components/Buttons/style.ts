import styled from 'styled-components';

export const ButtonContainer: any = styled.div`
  display: flex;
  justify-content: center;
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
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.4s ease-in-out all;
    &:disabled,
    &:disabled:active,
    &:disabled:hover {
      background-color: #e5e5e5;
      border-color: #e5e5e5;
      color: #ffffff;
      cursor: not-allowed;
      box-shadow: none;
    }
  }
  & button:hover {
    background: #7765c4bd;
  }
`;
