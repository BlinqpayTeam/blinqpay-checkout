import React from 'react';
import { IButton } from './IButton';
import { ButtonContainer } from './style';
import Spinner from '../../assets/svgs/Spinner';

const PrimaryButton: React.FC<IButton.IProps> = ({ text, type, onClick, disabled, loading }: IButton.IProps) => {
  return (
    <ButtonContainer>
      <button disabled={disabled} onClick={onClick} type={type}>
        {loading ? <Spinner xClasses={['button-spinner']} /> : text}
      </button>
    </ButtonContainer>
  );
};

export default PrimaryButton;
