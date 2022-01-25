import React from 'react';
import { IButton } from './IButton';
import { ButtonContainer } from './style';

const PrimaryButton: React.FC<IButton.IProps> = ({ text, type, onClick, disabled }: IButton.IProps) => {
  return (
    <ButtonContainer>
      <button disabled={disabled} onClick={onClick} type={type}>
        {text}
      </button>
    </ButtonContainer>
  );
};

export default PrimaryButton;
