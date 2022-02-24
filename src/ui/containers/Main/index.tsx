import React, { useState, FC, useEffect } from 'react';
import { Row, Col, Card } from 'antd';
import { nanoid } from 'nanoid';
// SVG icons
import Powered from '../../assets/svgs/Powered';
import Modal from '../../components/Modal';
import { ICheckoutPayload, Currency } from '../../../types';
import { initializeTransaction } from '../../../api/transaction';

const Main: FC<{ payload: ICheckoutPayload; destroyCheckout: () => void }> = ({ payload, destroyCheckout }) => {
  const [page, setPage] = useState('main');
  const [loading, setLoading] = useState(false);
  const [isTxError, setIsTxError] = useState(false);
  const [txRef, setTxRef] = useState<string | undefined>(undefined);
  // Todo handle when transaction reference is taken
  // Integrate Fingerprint.js to generate device fingerprint
  const fetchTxRef = async (): Promise<void> => {
    setLoading(true);
    payload.reference = payload.reference || `BPTR-${nanoid()}`;
    const response = await initializeTransaction(payload.key, {
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
    console.log(response?.data?.data);
    if (response?.data?.error) setIsTxError(true);
    else setTxRef((response?.data?.data as Record<string, unknown>)?.transactionReference as string);
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
