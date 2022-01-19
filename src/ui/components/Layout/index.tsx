import React from 'react';
import { Container } from './style';

const Layout: React.FC<any> = ({ children }: any) => {
  return <Container>{children}</Container>;
};
export default Layout;
