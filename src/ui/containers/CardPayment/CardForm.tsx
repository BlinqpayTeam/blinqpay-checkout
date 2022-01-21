import React from 'react';
import { Form, Input, Row, Col, Checkbox } from 'antd';
import CardSmall from '../../assets/svgs/CardSmall';
import { CardFormContainer } from './style';
import Lock from '../../assets/svgs/Lock';
import { FormInstance } from 'antd/es/form';

const CardForm = () => {
  const formRef = React.createRef<FormInstance>();
  const onFinish = () => {
    console.log('finished');
    formRef.current!.resetFields();
  };
  return (
    <CardFormContainer>
      <Form layout="vertical" colon={false} initialValues={{ remember: true }} onFinish={onFinish}>
        <Row className="stretch">
          <Col span={24}>
            <Form.Item
              label="Card Number"
              name="username"
              // rules={[{ required: true, message: 'Please input your Card Number' }]}
            >
              <Input prefix={<CardSmall />} placeholder="4444 4444 4444 4444" />
            </Form.Item>
          </Col>
        </Row>
        <Row className="strench" justify="space-between">
          <Col span={12}>
            <Form.Item
              label="Expiry Date"
              name="Expiry Date"
              // rules={[{ required: true, message: 'Please input your Expiry date!' }]}
            >
              <Input type="date" placeholder="DD/MM/YY" />
            </Form.Item>
          </Col>
          <Col span={10} offset={2}>
            <Form.Item
              label="CVV"
              name="cvv"
              // rules={[{ required: true, message: 'Please input your cvv!' }]}
            >
              <Input prefix={<Lock />} type="password" placeholder="***" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Save this card for next time </Checkbox>
          </Form.Item>
        </Row>
      </Form>
    </CardFormContainer>
  );
};
export default CardForm;
