import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import { BankFormContainer, InputField, Label } from './style';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { IBankTransfer } from './IBankTransfer';
import { CardFormContainer } from '../CardPayment/style';
import Copy from '../../assets/svgs/Copy';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Countdown from '../../components/Countdown';
import { verifyTransaction } from '../../../api/transaction';

const BankForm: React.FC<IBankTransfer.IBankProps> = ({
  getAccDetails,
  loading,
  setLoading,
  verifying,
  setVerifying,
  acc,
  setTransferStatus,
  txRef = '',
  publicKey = '',
  amount
}: IBankTransfer.IBankProps) => {
  const handleVerification = async () => {
    const { data: verifyRes } = await verifyTransaction(publicKey, txRef);
    setTransferStatus((verifyRes?.data as Record<string, string>)?.paymentStatus);
    // if (verifyRes?.error || (verifyRes?.data as Record<string, string>)?.paymentStatus === 'FAILED') {
    //   setVerifying(false);
    //   setSuccess(false);
    //   setActiveSlide('second');
    // } else if ((verifyRes?.data as Record<string, string>)?.paymentStatus === 'PENDING') {
    //   setVerifying(true);
    // } else {
    //   setSuccess(true);
    //   setActiveSlide('second');
    // }
  };
  const onFinish = () => {
    setVerifying(true);
  };
  const [copy, setCopy] = useState(false);
  const MINUTE_MS = 60000;

  useEffect(() => {
    if (verifying) {
      const interval = setInterval(() => {
        handleVerification();
      }, MINUTE_MS);

      return () => clearInterval(interval);
    } // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [verifying]);

  useEffect(() => {
    if (!acc?.bankName && !acc?.accountNumber) {
      getAccDetails();
    }
  }, []);

  return (
    <BankFormContainer>
      <span className="transfer-text">Transfer N{amount} to Merchant (Blinqpay)</span>
      <CardFormContainer>
        {!loading &&
          (verifying ? (
            <Row style={{ zIndex: 100 }} className="stretch">
              <Col span={24}>
                <div className="verification-text">Please wait while we verify your transaction</div>
                <Countdown minutes={10} Refresh={getAccDetails} />
              </Col>
            </Row>
          ) : (
            <>
              <Row style={{ zIndex: 100 }} className="stretch">
                <Col span={24}>
                  <div>
                    <Label>Bank</Label>
                    <InputField>{acc?.bankName}</InputField>
                  </div>
                </Col>
              </Row>
              <Row className="stretch">
                <Col span={24}>
                  <div className="mt-20 mb-10">
                    <Label>Account Number</Label>
                    <InputField>
                      {acc?.accountNumber}
                      {copy
                        ? !loading && <CheckCircleTwoTone twoToneColor="#7765c4" />
                        : !loading && (
                            <CopyToClipboard text="9978511967" onCopy={() => setCopy(true)}>
                              <span>
                                <Copy />{' '}
                              </span>
                            </CopyToClipboard>
                          )}
                    </InputField>
                  </div>
                </Col>
              </Row>
            </>
          ))}

        <PrimaryButton
          type="button"
          onClick={onFinish}
          text={verifying ? 'Verifying...' : 'I have made this payment'}
        />
        {!loading && !verifying && <Countdown minutes={1} Refresh={getAccDetails} />}
      </CardFormContainer>
    </BankFormContainer>
  );
};

export default BankForm;
