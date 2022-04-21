import styled from 'styled-components';

export const Container: any = styled.div`
  background: #e5e5e5;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
`;
export const Body: any = styled.div`
  padding: 1rem 2rem;
  position: relative;
  & .backdrop {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #f7f8f8;
    opacity: 0.9;
    top: 0;
    left: 0;
    z-index-200;
  }
  & .inner-container {
    text-align: center;
  }
`;
