import React from 'react';
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
}) => {
  return (
    <PaymentHeaderContainer>
      <div className="top">
        <div>
          <span>{paymentMethodIcon}</span>
          <span> {paymentText}</span>
        </div>
        {showChangeMethod && <div> Change Method </div>}
      </div>
      {!!payingCustomer && !!amount && (
        <div className="bottom">
          <div>Logo</div>
          <div>
            <div>{payingCustomer}</div>
            <div>{amount}</div>
          </div>
        </div>
      )}
    </PaymentHeaderContainer>
  );
};
export default GenericHeader;
