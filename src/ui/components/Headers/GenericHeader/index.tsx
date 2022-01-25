import React from 'react';
import LogoSmallDark from '../../../assets/svgs/LogoSmallDark';
import { PaymentHeaderContainer } from '../style';
import { IGenericHeader } from './IGenericHeader';

// Todo:
// Add payment method change button
// Add and style logo
// style paymentText
const GenericHeader: React.FC<IGenericHeader.IProps> = ({
  showChangeMethod = true,
  paymentMethodIcon,
  paymentText,
  payingCustomer,
  amount,
  setPage,
}) => {
  return (
    <PaymentHeaderContainer>
      <div className="top">
        <div className="icon-and-text">
          <span className="icon">{paymentMethodIcon}</span>
          <span className="text"> {paymentText}</span>
        </div>
        {showChangeMethod && (
          <div onClick={() => setPage('main')} className="change">
            {' '}
            Change Method{' '}
          </div>
        )}
      </div>
      {!!payingCustomer && !!amount && (
        <div className="bottom">
          <div className="left-item">
            <LogoSmallDark />
          </div>
          <div className="right-item">
            <div className="email">{payingCustomer}</div>
            <div className="amount">{amount}</div>
          </div>
        </div>
      )}
    </PaymentHeaderContainer>
  );
};
export default GenericHeader;
