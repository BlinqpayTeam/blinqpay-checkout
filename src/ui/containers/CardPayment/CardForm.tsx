import React from 'react';
import { Form, Input, Row, Col, Checkbox } from 'antd';
import CardSmall from '../../assets/svgs/CardSmall';
import { CardFormContainer } from './style';
import Lock from '../../assets/svgs/Lock';
import { FormInstance } from 'antd/es/form';
import Calendar from '../../assets/svgs/Calendar';
import { formatCreditCardNumber } from '../../utils/formMethods';
import Cleave from 'cleave.js/react';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import { ICardPayment } from './ICardPayment';

const CardForm: React.FC<ICardPayment.ICardProps> = ({ setActiveSlide }: ICardPayment.ICardProps) => {
  const formRef = React.createRef<FormInstance>();
  const onFinish = () => {
    console.log('finished');
    // formRef.current!.resetFields();
    setActiveSlide('second');
  };
  return (
    <CardFormContainer>
      <Form layout="vertical" colon={false} initialValues={{ remember: true }} onFinish={onFinish}>
        <Row className="stretch">
          <Col span={24}>
            <Form.Item
              label="Card Number"
              name="username"
              rules={[
                // { transform: (value) => formatCreditCardNumber(value) },
                { required: true, message: 'Please input your Card Number' },
              ]}
            >
              <Input
                type="text"
                pattern="[\d| ]{16,22}"
                maxLength={19}
                prefix={<CardSmall />}
                placeholder="4444 4444 4444 4444"
              />
              {/* <Cleave
                className="ant-input-affix-wrapper"
                placeholder="4444 4444 4444 4444"
                options={{ creditCard: true }}
                onChange={(event: any) => {
                  console.log(event.target.rawValue, event.target.value);
                }}
              /> */}
            </Form.Item>
          </Col>
        </Row>
        <Row className="strench" justify="space-between">
          <Col span={12}>
            <Form.Item
              label="Expiry Date"
              name="Expiry Date"
              rules={[{ required: true, message: 'Please input Expiry date!' }]}
            >
              <Input prefix={<Calendar />} type="text" pattern="\d\d/\d\d" maxLength={7} placeholder="MM / YY" />
            </Form.Item>
          </Col>
          <Col span={10} offset={2}>
            <Form.Item label="CVV" name="cvv" rules={[{ required: true, message: 'Please input your cvv!' }]}>
              <Input prefix={<Lock />} type="password" placeholder="***" pattern="\d*" maxLength={4} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Save this card for next time </Checkbox>
          </Form.Item>
        </Row>
        <PrimaryButton type="submit" text="Pay N1000.5" />
      </Form>
    </CardFormContainer>
  );
};
export default CardForm;
