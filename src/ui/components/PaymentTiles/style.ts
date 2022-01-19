import styled from 'styled-components';

export const Container: any = styled.div`
  border: 0.922581px solid #7765c4;
  box-sizing: border-box;
  border-radius: 7.09677px;
  cursor: pointer;
  padding: 1.06em 2.21em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  height: 66px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0.5em 0;
  .left-item {
    display: flex;
    justify-content: left;
    .payment-icon {
      margin-right: 1.54em;
      display: flex;
      align-items:center;
    }
    .text {
      display:flex;
      flex-direction: column;
      align-content: center;
      .bold {
        color: #424242;
      }
      .light {
        color: #000000;
      }
    }
  }
  .right-item{
    display-flex;
    align-items: center;
  }
`;
