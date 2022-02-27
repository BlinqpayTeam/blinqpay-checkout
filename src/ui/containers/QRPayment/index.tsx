import React, { useEffect, useState } from 'react';
import GenericHeader from '../../components/Headers/GenericHeader';
import { Container } from './style';
import QrCode from '../../assets/svgs/QrCode';
import Spinner from '../../assets/svgs/Spinner';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import { IQRPayment } from './IQRPayment';
import QrIcon from '../../assets/svgs/QrIcon';
import { getQrCode } from '../../../api/qrpayment';
import ErrorIcon from '../../assets/svgs/ErrorIcon';
import { verifyTransaction } from '../../../api/transaction';
import Successful from '../../assets/svgs/Successful';

enum QRError {
  TIMEOUT = 'TIMEOUT',
  QR_FAILED = 'QR_FAILED',
  VERIFY_FAILED = 'VERIFY_FAILED',
}

const QRPayment: React.FC<IQRPayment.IProps> = ({
  page,
  setPage,
  txRef,
  publicKey,
  destroyCheckout,
}: IQRPayment.IProps) => {
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [url, setUrl] = useState('');
  const [errorType, setErrorType] = useState<QRError>(QRError.QR_FAILED);
  const [errorText, setErrorText] = useState('An error occurred, please try again');
  const handleClick = async (): Promise<void> => {
    if (isError) {
      fetchQR();
    } else {
      setLoading(true);
      setIsError(false);
      const { data: verifyRes } = await verifyTransaction(publicKey, txRef);
      setLoading(false);
      if (verifyRes?.error || (verifyRes?.data as Record<string, string>)?.paymentStatus === 'FAILED') {
        setErrorType(QRError.VERIFY_FAILED);
        setErrorText('Payment was not successful');
        setIsError(true);
        setTimeout(destroyCheckout, 2000);
      } else {
        setIsSuccess(true);
        setTimeout(destroyCheckout, 2000);
      }
    }
  };
  const fetchQR = async () => {
    setLoading(true);
    setIsError(false);
    const { data } = await getQrCode(txRef);
    setLoading(false);
    const res = data?.data as Record<string, string>;
    if (data?.error || !res?.svg) {
      setErrorText('An occured while trying to fetch the QR code');
      setIsError(true);
    } else {
      setUrl(res.svg);
    }
  };
  useEffect(() => {
    fetchQR();
  }, []);
  return (
    <>
      <GenericHeader paymentMethodIcon={<QrIcon />} paymentText="Pay with QR" setPage={setPage} />
      <Container>
        <div className="qr-container">
          {isError || isSuccess ? (
            isSuccess ? (
              <div className="success-container">
                <Successful />
              </div>
            ) : (
              <ErrorIcon />
            )
          ) : (
            <div className="qr-block">
              {loading ? (
                <>
                  <Spinner />
                  <div className="backdrop"></div>
                  <QrCode height="250" width="250" />
                </>
              ) : (
                <svg height="250" width="250">
                  <image xlinkHref={url} height="250" width="250" />
                </svg>
              )}
            </div>
          )}
        </div>
        {isSuccess && <span className="transfer-successful">Transaction Successful!</span>}
        {isError && <span>{errorText}</span>}
        {isSuccess || (!isError && !loading) ? <span>Use your Blinqchat or your bank</span> : ''}
        {isSuccess || (!isError && !loading) ? <span>app to scan the code</span> : ''}
        {errorType === QRError.VERIFY_FAILED || isSuccess || !url ? (
          ''
        ) : (
          <div className="button-container">
            <PrimaryButton
              type="submit"
              text={isError ? 'Try again' : 'I have made this payment'}
              disabled={loading}
              loading={loading}
              onClick={handleClick}
            />
          </div>
        )}
      </Container>
    </>
  );
};

export default QRPayment;
