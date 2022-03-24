import styled, { css } from 'styled-components';

export const ButtonContainer: any = styled.div`
  display: flex;
  justify-content: center;
  & button {
    margin: 1.2rem auto;
    background: ${({ theme }) => theme.background};
    padding: 0.5rem 1.5rem;
    outline: none;
    border-style: none;
    border: ${({ theme }) => theme.border};
    border-radius: 6px;
    color: ${({ theme }) => theme.color};
    cursor: pointer;
    font-size: 0.8rem;
    width: ${({ theme }) => theme.width};
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
    border: none;
  }
  & + & {
    margin-top: 1rem;
  }
  ${(props: Record<string, boolean>) =>
    props.altMethod &&
    css`
      & button {
        background: #ffffff5e;
        color: #212121;
        border: 0.6px solid #0000004f;
        margin: 0 auto;
      }
      & button:hover {
        background: #f5f5f5;
        border: 0.6px solid #0000004f;
      }
    `}
`;
