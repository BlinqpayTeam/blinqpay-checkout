import React, { Dispatch, SetStateAction, useContext, useEffect, useMemo } from 'react';
import GenericHeader from '../../components/Headers/GenericHeader';
import { Container } from './style';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import { IVerification } from './IVerification';
import ErrorIcon from '../../assets/svgs/ErrorIcon';
import Spinner from '../../assets/svgs/Spinner';
import { PaymentMethodContext } from '../../../context';
import { PaymentContextType, PaymentMethod } from '../../../types';
import { Body } from '../../components/Layout/style';

const ErrorWithAlt: React.FC<IVerification.IProps> = ({
  setPage,
  logo,
  paymentText = '',
  setActiveSlide,
  noHeader,
  error,
  isClose,
  destroyCheckout,
  setIsError,
  user,
  amount,
}: IVerification.IProps) => {
  const { selectedMethods } = useContext(PaymentMethodContext) as PaymentContextType;
  useEffect(() => {
    if (isClose) {
      if (destroyCheckout) {
        setTimeout(destroyCheckout, 4000);
      }
    }
  }, [isClose, destroyCheckout]);
  const handleClick = (type: PaymentMethod) => {
    (setPage as Dispatch<SetStateAction<string>>)(type);

    if (error && setIsError) {
      setIsError(false);
    }
  };

  const getBtnText = (type: PaymentMethod): string => {
    switch (type) {
      case PaymentMethod.CARD_PAYMENT:
        return 'Try paying with card';

      case PaymentMethod.BANK_TRANSFER:
        return 'Try paying with transfer';

      default:
        return 'Try paying with QR';
    }
  };

  const altMethods = useMemo(() => {
    if (!selectedMethods?.length) return [];
    const methods = [PaymentMethod.CARD_PAYMENT, PaymentMethod.BANK_TRANSFER, PaymentMethod.QR].filter(
      (method) => !selectedMethods.includes(method),
    );
    return methods.map((method) => (
      <PrimaryButton
        key={method}
        type="submit"
        altMethod
        text={getBtnText(method)}
        onClick={() => handleClick(method)}
      />
    ));
  }, [selectedMethods?.length]);

  return !noHeader ? (
    <>
      <GenericHeader
        paymentMethodIcon={logo}
        paymentText={paymentText}
        setPage={setPage || null}
        payingCustomer={user || 'John.Doe@blinqpay.io'}
        amount={amount || '0.00'}
      />
      <Body>
        <Container padding="0.5rem">
          <div className="success-container">
            <ErrorIcon />
          </div>
          <span className="transfer-successful"> </span>
          <span className="check-error-2"> {error || 'Payment cannot not be confirmed at this moment'}</span>
          {altMethods?.length ? altMethods : <Spinner xClasses={['close-spinner']} />}
        </Container>
      </Body>
    </>
  ) : (
    <>
      <Container padding="0.5rem">
        <div className="success-container">
          <ErrorIcon />
        </div>
        <span className="transfer-successful"> </span>
        <span className="check-error-2"> {error || 'Payment cannot not be confirmed at this moment'}</span>
        {altMethods?.length ? altMethods : <Spinner xClasses={['close-spinner']} />}
      </Container>
    </>
  );
};

export default ErrorWithAlt;
