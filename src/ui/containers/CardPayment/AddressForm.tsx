import React from 'react';
import { Form, Input, Row, Col, Checkbox } from 'antd';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import { AddressFormContainer } from './style';
import { ICardPayment } from './ICardPayment';
const AddressForm: React.FC<ICardPayment.IAddressProps> = ({ setActiveSlide }: ICardPayment.IAddressProps) => {
  const onFinish = () => {
    console.log('finished');
    // formRef.current!.resetFields();
    setActiveSlide('fifth');
  };
  return (
    <AddressFormContainer>
      <Form layout="vertical" colon={false} initialValues={{ remember: true }} onFinish={onFinish}>
        <Row className="stretch">
          <Col span={24}>
            <Form.Item
              label="City"
              name="city"
              rules={[
                // { transform: (value) => formatCreditCardNumber(value) },
                { required: true, message: 'Please input your City' },
              ]}
            >
              <Input className="normal-input" type="text" placeholder="Port Harcourt" />
            </Form.Item>
          </Col>
        </Row>
        <Row className="stretch">
          <Col span={24}>
            <Form.Item
              label="State"
              name="state"
              rules={[
                // { transform: (value) => formatCreditCardNumber(value) },
                { required: true, message: 'Please input your State' },
              ]}
            >
              <Input className="normal-input" type="text" placeholder="Port Harcourt" />
            </Form.Item>
          </Col>
        </Row>
        <Row className="stretch">
          <Col span={24}>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                // { transform: (value) => formatCreditCardNumber(value) },
                { required: true, message: 'Please input your Address' },
              ]}
            >
              <Input className="normal-input" type="text" placeholder="Alcon Lane" />
            </Form.Item>
          </Col>
        </Row>
        <Row className="stretch">
          <Col span={24}>
            <Form.Item
              label="Zip Code"
              name="zip"
              rules={[
                // { transform: (value) => formatCreditCardNumber(value) },
                { required: true, message: 'Please input your Zip Code ' },
              ]}
            >
              <Input className="normal-input" type="text" placeholder="500000" />
            </Form.Item>
          </Col>
        </Row>
        <PrimaryButton type="submit" text="Authorize" />
      </Form>
    </AddressFormContainer>
  );
};

export default AddressForm;
