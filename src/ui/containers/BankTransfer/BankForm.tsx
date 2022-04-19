import React, { useEffect, useState, useContext } from 'react';
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
import BankExpired from '../Verification/BankExpired';
import HelpIcon from '../../assets/svgs/HelpIcon';
import { PaymentMethodContext } from '../../../context';
import { PaymentContextType, PaymentMethod } from '../../../types';

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
  const { setSelectedMethods } = useContext(PaymentMethodContext) as PaymentContextType;
  const handleVerification = async () => {
    const { data: verifyRes } = await verifyTransaction(publicKey, txRef);
    if ((verifyRes?.data as Record<string, boolean>)?.error === true)
      setSelectedMethods((curr) => [...curr, PaymentMethod.CARD_PAYMENT]);
    setTransferStatus((verifyRes?.data as Record<string, string>)?.paymentStatus);
  };
  const stopVerification = async () => {
    const { data: verifyRes } = await verifyTransaction(publicKey, txRef);
    setTransferStatus((verifyRes?.data as Record<string, string>)?.paymentStatus);
    setVerifying(false);
    setActiveSlide('second');
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
                    <Countdown seconds={5} callback={stopVerification} />
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
