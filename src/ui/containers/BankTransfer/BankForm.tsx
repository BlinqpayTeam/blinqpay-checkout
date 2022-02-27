import React, { useState } from 'react';
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
  setActiveSlide,
  setSuccess,
  getAccDetails,
  loading,
  acc,
  setAcc,
  txRef = '',
  publicKey = '',
}: IBankTransfer.IBankProps) => {
  const [verifying, setVerifying] = useState(false);
  const handleVerification = async () => {
    setVerifying(true);
    const { data: verifyRes } = await verifyTransaction(publicKey, txRef);
    setVerifying(false);
    if (verifyRes?.error || (verifyRes?.data as Record<string, string>)?.paymentStatus === 'FAILED') {
      setSuccess(false);
      setActiveSlide('second');
    } else {
      setSuccess(true);
      setActiveSlide('second');
    }
  };
  const onFinish = () => {
    handleVerification();
  };
  const [copy, setCopy] = useState(false);

  return (
    <BankFormContainer>
      <span className="transfer-text">Transfer #1000.5 to Merchant (Blinqpay)</span>
      <CardFormContainer>
        {!loading && (
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
        )}

        <PrimaryButton loading={verifying} type="button" onClick={onFinish} text="I have made this payment" />
        {!loading && <Countdown minutes={1} Refresh={getAccDetails} />}
      </CardFormContainer>
    </BankFormContainer>
  );
};

export default BankForm;
