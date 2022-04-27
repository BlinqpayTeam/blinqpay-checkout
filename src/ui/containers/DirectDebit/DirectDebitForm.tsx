import React from 'react';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Select from 'antd/es/select';
// import { Form, Input, Row, Col, Select } from 'antd';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import { BankFormContainer } from './style';
import { IDirectDebit } from './IDirectDebit';

const DirectDebitForm: React.FC<IDirectDebit.IBankProps> = ({
  setActiveSlide,
  setSuccess,
}: IDirectDebit.IBankProps) => {
  const { Option } = Select;
  const onFinish = () => {
    console.log('finished');
    setSuccess(true);
    setActiveSlide('second');
  };
  const onChange = (value: any) => {
    console.log('value===', value);
  };
  return (
    <BankFormContainer>
      <Form layout="vertical" colon={false} initialValues={{ remember: true }} onFinish={onFinish}>
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
              <Select className="normal-input" placeholder="Select a bank" onChange={onChange}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row className="stretch">
          <Col span={24}>
            <Form.Item
              label="Account Number"
              name="account_number"
              rules={[
                // { transform: (value) => formatCreditCardNumber(value) },
                { required: true, message: 'Please input your Account Number' },
              ]}
            >
              <Input className="normal-input" type="text" placeholder="Alcon Lane" />
            </Form.Item>
          </Col>
        </Row>
        <Row className="stretch">
          <Col span={24}>
            <Form.Item
              label="BVN"
              name="bvn"
              rules={[
                // { transform: (value) => formatCreditCardNumber(value) },
                { required: true, message: 'Please input your BVN ' },
              ]}
            >
              <Input className="normal-input" type="text" placeholder="99999999" />
            </Form.Item>
          </Col>
        </Row>
        <PrimaryButton type="submit" text="I have made this payment" />
      </Form>
    </BankFormContainer>
  );
};

export default DirectDebitForm;
