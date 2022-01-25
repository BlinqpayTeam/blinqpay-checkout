import styled from 'styled-components';

export const SelectHeaderContainer: any = styled.div`
  padding: 1.5rem 3rem;
  .select-text {
    width: 217.16px;
    height: 56.77px;
    box-sizing: border-box;
    color: #7765c4;
    font-style: normal;
    font-weight: 900;
    font-size: 22.7097px;
    line-height: 28px;
    margin-top: 20px;
  }
`;

export const PaymentHeaderContainer: any = styled.div`
  .top {
    background: #dfdaf1;
    display: flex;
    justify-content: space-between;
    padding: 1.06em 1em 1.06em 2.21em;
    border-radius: 14.1935px 14.1935px 0 0;
    .icon-and-text {
      display: flex;
      align-items: center;
      .icon {
        margin-right: 10px;
      }
      .text {
        color: #212121;
        font-weight: 500;
        font-size: 16px;
      }
    }
    .change {
      color: #443586;
      font-weight: 900;
      font-size: 13.9512px;
      cursor: pointer;
    }
  }
  .bottom {
    padding: 1.06em 1em 2em 1.2em;
    border-bottom: 0.140373px solid #212121;
    display: flex;
    justify-content: space-between;
    & .right-item {
      .email {
        color: #0c0c0c;
        font-size: 13.029px;
      }
      .amount {
        color: #7765c4;
        font-weight: 800;
        font-size: 14.4767px;
        line-height: 22px;
      }
    }
  }
`;
