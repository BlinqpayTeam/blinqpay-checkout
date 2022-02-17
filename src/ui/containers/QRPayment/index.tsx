import React, { useEffect, useState } from 'react';
import GenericHeader from '../../components/Headers/GenericHeader';
import { Container } from './style';
import QrCode from '../../assets/svgs/QrCode';
import Spinner from '../../assets/svgs/Spinner';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import { IQRPayment } from './IQRPayment';
import QrIcon from '../../assets/svgs/QrIcon';

const QRPayment: React.FC<IQRPayment.IProps> = ({ page, setPage }: IQRPayment.IProps) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  return (
    <>
      <GenericHeader paymentMethodIcon={<QrIcon />} paymentText="Pay with QR" setPage={setPage} />
      <Container>
        <div className="qr-container">
          <div className="qr-block">
            {loading ? (
              <>
                <Spinner />
                <div className="backdrop"></div>
                <QrCode height="250" width="250" />
              </>
            ) : (
              <QrCode height="250" width="250" />
            )}
          </div>
        </div>
        <span>Use your Blinqchat or your bank</span>
        <span>app to scan the code</span>
        <div className="button-container">
          <PrimaryButton type="submit" text="I have made this payment" />
        </div>
      </Container>
    </>
  );
};

export default QRPayment;
