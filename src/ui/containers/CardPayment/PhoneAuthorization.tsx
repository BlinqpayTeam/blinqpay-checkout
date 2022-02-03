import React, { useState } from 'react';
import { Form, Input, Row, Col, Checkbox } from 'antd';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import { ICardPayment } from './ICardPayment';
import { PhoneFormContainer } from './style';

const PhoneAuthorization: React.FC<ICardPayment.IPhoneProps> = ({
  setActiveSlide,
  isSuccess,
  setIsSuccess,
}: ICardPayment.IPhoneProps) => {
  const onFinish = () => {
    console.log('finished');
    // formRef.current!.resetFields();
    setActiveSlide('sixth');
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
            <Input className="normal-input" type="phone" placeholder=" " />
          </Col>
          <Col span={10} offset={2}>
            <PrimaryButton type="submit" text="Confirm" />
          </Col>
        </Row>
      </Form>
      <p className="bottom-text">This might take a few minutes</p>
      <p className="back" onClick={() => setActiveSlide('fourth')}>
        Back
      </p>
    </PhoneFormContainer>
  );
};
export default PhoneAuthorization;
