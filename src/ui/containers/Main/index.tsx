import React, { useState, FC, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ICheckoutPayload, Currency } from '../../../types';
import { initializeTransaction } from '../../../api/transaction';
// SVG icons
const Powered = React.lazy(() => import('../../assets/svgs/Powered'));
const Modal = React.lazy(() => import('../../components/Modal'));

const Main: FC<{ payload: ICheckoutPayload; destroyCheckout: () => void }> = ({ payload, destroyCheckout }) => {
  const [page, setPage] = useState('main');
  const [loading, setLoading] = useState(false);
  const [isTxError, setIsTxError] = useState(false);
  const [txRef, setTxRef] = useState<string | undefined>(undefined);
  const [testMode, setTestMode] = useState(false);
  // Todo handle when transaction reference is taken
  // Integrate Fingerprint.js to generate device fingerprint
  const fetchTxRef = async (): Promise<void> => {
    setLoading(true);
    payload.reference = payload.reference || `BPTR-${nanoid()}`;
    const response = await initializeTransaction(payload.publicKey, {
      amount: payload.amount,
      customerName: payload?.customer?.name || '',
      customerEmail: payload?.customer?.email || '',
      phoneNumber: payload?.customer?.phoneNumber || '',
      paymentReference: payload?.reference,
      currency: payload.currency || Currency.NGN,
      deviceFingerPrint: '79e6b7f0b72037aa8428b70fbe03986c',
      callbackUrl: payload.redirectUrl || 'https://blinqpay.io/transaction/confirm',
    });
    setLoading(false);
    if (response?.data?.error) setIsTxError(true);
    else {
      setTxRef((response?.data?.data as Record<string, unknown>)?.transactionReference as string);
      setTestMode(((response?.data?.data as Record<string, unknown>)?.mode as string) === 'TEST_MODE');
    }
  };
  useEffect(() => {
    fetchTxRef();
  }, []);
  return (
    <div className="main-wrapper">
      <Modal
        page={page}
        setPage={setPage}
        payload={{
          ...payload,
          loading,
          isError: isTxError,
          transactionReference: txRef,
          testMode: testMode,
        }}
        destroyCheckout={destroyCheckout}
      />
      <div className="d-flex centered mt-20">
        <Powered />
      </div>
    </div>
  );
};

export default Main;
