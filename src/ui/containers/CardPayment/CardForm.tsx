import React from 'react';
import { Form, Input, Row, Col, Checkbox } from 'antd';
import CardSmall from '../../assets/svgs/CardSmall';
import { CardFormContainer } from './style';
import Lock from '../../assets/svgs/Lock';

const CardForm = () => {
  const onFinish = () => {
    console.log('finished');
  };
  return (
    <CardFormContainer>
      <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
        <Row className="stretch">
          <Col span={24}>
            <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
              <Input prefix={<CardSmall />} placeholder="4444 4444 4444 4444" />
            </Form.Item>
          </Col>
        </Row>
        <Row className="strench" justify="space-between">
          <Col span={12}>
            <Form.Item name="cvv" rules={[{ required: true, message: 'Please input your Expiry date!' }]}>
              <Input type="date" placeholder="DD/MM/YY" />
            </Form.Item>
          </Col>
          <Col span={10} offset={2}>
            <Form.Item name="cvv" rules={[{ required: true, message: 'Please input your cvv!' }]}>
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
