import React, { useContext, useEffect, useState } from 'react';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import 'antd/es/row/style/css';
import 'antd/es/col/style/css';
import 'antd/es/form/style/css';
import 'antd/es/input/style/css';
// import { Form, Input, Row, Col, Checkbox } from 'antd';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import { ICardPayment } from './ICardPayment';
import { PhoneFormContainer } from './style';
import { authorizeEnroll } from '../../../api/card';
import { PaymentContextType, PaymentMethod } from '../../../types';
import { PaymentMethodContext } from '../../../context';

const PhoneAuthorization: React.FC<ICardPayment.IPhoneProps> = ({
  setActiveSlide,
  isSuccess,
  setIsSuccess,
  txRef,
  setErrorText,
  setIsCloseModal,
  setRedirectUrl,
  setPaymentStatus,
  setEnableChangeMethod,
}: ICardPayment.IPhoneProps) => {
  const [loading, setLoading] = useState(false);
  const failedMsg = 'An error occurred while enrolling your phone number';
  const { setSelectedMethods } = useContext(PaymentMethodContext) as PaymentContextType;
  const closeModal = (data: Record<string, unknown>, payload?: unknown): void => {
    setLoading(false);
    setErrorText((data?.message as string) || failedMsg);
    setIsSuccess(false);
    setSelectedMethods((curr) => [...curr, PaymentMethod.CARD_PAYMENT]);
    setActiveSlide('sixth');
  };
  useEffect(() => {
    setEnableChangeMethod(false);
  }, []);
  const onFinish = async (value: Record<string, unknown>): Promise<void> => {
    console.log('finished', value);
    const payload = {
      phone: value.phone,
      transactionReference: txRef,
    };
    setLoading(true);
    const { data } = await authorizeEnroll(payload);
    setLoading(false);
    setEnableChangeMethod(true);
    const { data: res } = data as unknown as Record<string, Record<string, string> | undefined>;
    if (res?.redirect_url) setRedirectUrl(res.redirect_url);
    if (data?.error || res?.status === 'FAILED') {
      setPaymentStatus(res?.status || 'failed');
      closeModal(res as Record<string, string>);
    } else if (res?.authModel === 'OTP') {
      setActiveSlide('third');
    } else if (res?.authModel === 'AVS') {
      setActiveSlide('fifth');
    } else if (res?.authModel === '3DS') {
      setActiveSlide('seventh');
    } else {
      setPaymentStatus('success');
      setIsSuccess(true);
      setActiveSlide('sixth');
    }
    // formRef.current!.resetFields();
  };
  return (
    <PhoneFormContainer>
      <p className="top-text">Please enter Phone number to Authorize payment</p>
      <Form
        className="phone-form"
        layout="vertical"
        colon={false}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Row className="padded-x-5">
          <Col style={{ display: 'flex', alignItems: 'center' }} span={12}>
            <Form.Item className="margin-bottom--none" name="phone" rules={[]}>
              <Input className="normal-input" type="phone" name="phone" placeholder=" " />
            </Form.Item>
          </Col>
          <Col span={10} offset={2}>
            <PrimaryButton type="submit" text="Confirm" loading={loading} disabled={loading} />
          </Col>
        </Row>
      </Form>
      <p className="bottom-text">This might take a few minutes</p>
      {/* <p className="back" onClick={() => setActiveSlide('fourth')}>
        Back
      </p> */}
    </PhoneFormContainer>
  );
};
export default PhoneAuthorization;
