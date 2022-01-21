import React from 'react';
import Logo from '../../assets/svgs/Logo';
import { SelectHeaderContainer } from './style';

const SelectHeader = () => {
  return (
    <SelectHeaderContainer>
      <Logo />
      <div className="select-text">Choose a payment a payment method </div>
    </SelectHeaderContainer>
  );
};
export default SelectHeader;
