import React from 'react';
import { IButton } from './IButton';
import { ButtonContainer } from './style';
import Spinner from '../../assets/svgs/Spinner';

const PrimaryButton: React.FC<IButton.IProps> = ({
  text,
  type,
  onClick,
  disabled,
  loading,
  notFilled,
}: IButton.IProps) => {
  return (
    <ButtonContainer
      theme={{
        border: notFilled ? '1px solid #212121' : '',
        width: notFilled ? '60%' : '100%',
        background: notFilled ? 'transparent' : '#7765c4',
        color: notFilled ? '#252D3E' : '#ffffff',
      }}
    >
      <button disabled={disabled} onClick={onClick} type={type}>
        {loading ? <Spinner xClasses={['button-spinner']} /> : text}
      </button>
    </ButtonContainer>
  );
};

export default PrimaryButton;
