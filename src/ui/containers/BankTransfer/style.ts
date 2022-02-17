import styled from 'styled-components';

export const BankFormContainer: any = styled.div`
  padding: 0.5rem 2.5rem;
  & .transfer-text {
    padding: 0 10%;
    color: #424242;
    font-size: 20px;
    text-align: center;
    display: flex;
    margin-bottom; 20px;
  }
`;
export const InputField: any = styled.div`
  height: 40px;
  background: rgba(255, 255, 255, 0.8);
  border: 0.361051px solid #424242;
  box-sizing: border-box;
  border-radius: 7.22103px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 21px;
  color: #0c0c0c;
  & span {
    cursor: pointer;
  }
`;
export const Label: any = styled.div`
  color: #7765c4;
  font-weight: normal;
  font-size: 14px;
`;
