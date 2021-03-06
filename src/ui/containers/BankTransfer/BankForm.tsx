import React, { useContext, useEffect, useState } from 'react';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import 'antd/es/row/style/css';
import 'antd/es/col/style/css';
// import { Row, Col } from 'antd';

import { BankFormContainer, InputField, Label } from './style';
import CheckCircleTwoTone from '@ant-design/icons/CheckCircleTwoTone';
import { IBankTransfer } from './IBankTransfer';
import { CardFormContainer } from '../CardPayment/style';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { verifyTransaction } from '../../../api/transaction';
import { PaymentMethodContext } from '../../../context';
import { PaymentContextType, PaymentMethod } from '../../../types';

const PrimaryButton = React.lazy(() => import('../../components/Buttons/PrimaryButton'));
const Copy = React.lazy(() => import('../../assets/svgs/Copy'));
const Countdown = React.lazy(() => import('../../components/Countdown'));
const BankExpired = React.lazy(() => import('../Verification/BankExpired'));
const HelpIcon = React.lazy(() => import('../../assets/svgs/HelpIcon'));

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
  amount,
  setActiveSlide,
}: IBankTransfer.IBankProps) => {
  const [expireCount, setExpireCount] = useState(false);
  const [over, setOver] = useState(false);
  const { setSelectedMethods, selectedMethods } = useContext(PaymentMethodContext) as PaymentContextType;
  const [triggerVerificationCount, setTriggerVerificationCount] = useState(0);
  const handleVerification = async (isVerifying: boolean) => {
    if (isVerifying) {
      const { data: verifyRes } = await verifyTransaction(publicKey, txRef);
      const response = verifyRes?.data as Record<string, string>;
      const status = response?.paymentStatus?.toLowerCase();
      setTransferStatus(response?.paymentStatus);
      if (!(status === 'pending' || status === 'processing')) {
        if (!selectedMethods.includes(PaymentMethod.BANK_TRANSFER))
          setSelectedMethods((curr) => [...curr, PaymentMethod.BANK_TRANSFER]);
        setOver(true);
        setVerifying(false);
        setActiveSlide('second');
      } else {
        setTimeout(() => {
          if (setTriggerVerificationCount) setTriggerVerificationCount((count) => count + 1);
        }, 400);
      }
    }
  };
  useEffect(() => {
    if (triggerVerificationCount !== 0) handleVerification(verifying);
  }, [triggerVerificationCount]);

  const stopVerification = async () => {
    const { data: verifyRes } = await verifyTransaction(publicKey, txRef);
    const response = verifyRes?.data as Record<string, string>;
    if (!selectedMethods.includes(PaymentMethod.BANK_TRANSFER))
      setSelectedMethods((curr) => [...curr, PaymentMethod.BANK_TRANSFER]);
    setTransferStatus(response?.paymentStatus);
    setVerifying(false);
    setActiveSlide('second');
  };
  const onFinish = () => {
    setVerifying(true);
  };
  const [copy, setCopy] = useState(false);

  useEffect(() => {
    if (verifying) {
      handleVerification(verifying);
    }
  }, [verifying]);

  // useEffect(() => {
  //   if (!acc?.bankName && !acc?.accountNumber) {
  //     getAccDetails();
  //   }
  // }, []);
  const handleBankExpired = () => {
    setExpireCount(false);
    getAccDetails();
  };

  return (
    <>
      {expireCount ? (
        <BankExpired callback={handleBankExpired} />
      ) : (
        <BankFormContainer>
          <span className="transfer-text">Transfer N{amount} to Merchant (Blinqpay)</span>
          <CardFormContainer>
            {!loading &&
              (verifying ? (
                <Row style={{ zIndex: 100 }} className="stretch">
                  <Col span={24}>
                    <div className="verification-text">Please wait while we verify your transaction</div>
                    <Countdown minutes={1} isOver={over} callback={stopVerification} />
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
            {!loading && !verifying && (
              <Countdown
                expireCount={expireCount}
                setExpireCount={setExpireCount}
                minutes={1}
                Refresh={getAccDetails}
              />
            )}
            <div className="help">
              <span className="help-container" onClick={() => setActiveSlide('third')}>
                <HelpIcon />
                <span className="help-text">help</span>
              </span>
            </div>
          </CardFormContainer>
        </BankFormContainer>
      )}
    </>
  );
};

export default BankForm;
