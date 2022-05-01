import React, { useContext } from 'react';
import BankTransfer from '../../../containers/BankTransfer';
import CardPayment from '../../../containers/CardPayment';
import DirectDebit from '../../../containers/DirectDebit';
import QRPayment from '../../../containers/QRPayment';
import { ICombinepayment } from './ICombinePayment';

const CombinePayment: React.FC<ICombinepayment.IProps> = ({ page, setPage, payload }: ICombinepayment.IProps) => {
  return (
    <div>
      {page === 'card' && <CardPayment page={page} setPage={setPage} payload={payload} />}
      {page === 'bank' && (
        <BankTransfer
          page={page}
          setPage={setPage}
          payload={payload}
          publicKey={payload.publicKey}
          txRef={payload.transactionReference as string}
        />
      )}
      {page === 'direct-debit' && <DirectDebit page={page} setPage={setPage} />}
      {page === 'qr' && (
        <QRPayment
          page={page}
          setPage={setPage}
          publicKey={payload.publicKey}
          txRef={payload.transactionReference as string}
          destroyCheckout={payload.destroyCheckout}
          amount={String(payload.amount)}
          checkoutDetails={payload}
          payingCustomer={payload.customer?.name || ''}
          payingCustomerEmail={payload.customer?.email || ''}
        />
      )}
    </div>
  );
};

export default CombinePayment;
