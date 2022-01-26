import React from 'react';
import BankTransfer from '../../../containers/BankTransfer';
import CardPayment from '../../../containers/CardPayment';
import QRPayment from '../../../containers/QRPayment';
import { ICombinepayment } from './ICombinePayment';

const CombinePayment: React.FC<ICombinepayment.IProps> = ({ page, setPage }: ICombinepayment.IProps) => {
  return (
    <div>
      {page === 'card' && <CardPayment page={page} setPage={setPage} />}
      {page === 'bank' && <BankTransfer page={page} setPage={setPage} />}
      {page === 'qr' && <QRPayment page={page} setPage={setPage} />}
    </div>
  );
};

export default CombinePayment;
