import React, { useContext, useState } from 'react';
import Row from 'antd/es/row';
import Select from 'antd/es/select';
import Form from 'antd/es/form';
import Col from 'antd/es/col';
import Input from 'antd/es/input';
import 'antd/es/row/style/css';
import 'antd/es/col/style/css';
import 'antd/es/select/style/css';
import 'antd/es/form/style/css';
import 'antd/es/input/style/css';
// import { Form, Input, Row, Col, Select } from 'antd';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import { AddressFormContainer } from './style';
import { ICardPayment } from './ICardPayment';
import { authorizeAVS } from '../../../api/card';
import { PaymentMethodContext } from '../../../context';
import { PaymentContextType, PaymentMethod } from '../../../types';
const AddressForm: React.FC<ICardPayment.IAddressProps> = ({
  setActiveSlide,
  setErrorText,
  setIsCloseModal,
  setIsSuccess,
  txRef,
  setRedirectUrl,
}: ICardPayment.IAddressProps) => {
  const { Option } = Select;
  const [loading, setLoading] = useState(false);
  const failedMsg = 'Unable to successfully verify the address.';
  const { setSelectedMethods } = useContext(PaymentMethodContext) as PaymentContextType;
  const closeModal = (data: Record<string, unknown>, payload?: unknown): void => {
    setLoading(false);
    setErrorText((data?.message as string) || failedMsg);
    setIsSuccess(false);
    setSelectedMethods((curr) => [...curr, PaymentMethod.CARD_PAYMENT]);
    setActiveSlide('sixth');
  };
  const onFinish = async (value: Record<string, unknown>): Promise<void> => {
    console.log('finished', value);
    const payload = {
      city: value.city,
      state: value.state,
      address: value.address,
      country: value.country,
      zipCode: value.zip,
      transactionReference: txRef,
    };
    setLoading(true);
    const { data } = await authorizeAVS(payload);
    setLoading(false);
    const { data: res } = data as unknown as Record<string, Record<string, string> | undefined>;
    if (res?.redirect_url) setRedirectUrl(res.redirect_url);
    if (data?.error || res?.status === 'FAILED') closeModal(res as Record<string, string>);
    else if (res?.authModel === 'OTP') {
      setActiveSlide('third');
    } else if (res?.authModel === 'CARD_ENROLL') {
      setActiveSlide('fifth');
    } else if (res?.authModel === '3DS') {
      setActiveSlide('seventh');
    } else {
      setIsSuccess(true);
      setIsCloseModal(true);
      setActiveSlide('sixth');
    }
    // formRef.current!.resetFields();
  };
  const onChange = (value: any) => {
    console.log('value===', value);
  };
  return (
    <AddressFormContainer>
      <Form layout="vertical" colon={false} initialValues={{ remember: true }} onFinish={onFinish}>
        {/* <Row className="stretch">
          <Col span={24}>
            <Form.Item
              label="Country"
              name="country"
              rules={[
                // { transform: (value) => formatCreditCardNumber(value) },
                { required: true, message: 'Please Select a country' },
              ]}
            >
              <Select className="normal-input" placeholder="Select a Country" onChange={onChange}>
                <Option value="jack">Nigeria</Option>
                <Option value="lucy">Ghana</Option>
                <Option value="tom">Cameroon</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row> */}
        <Row className="stretch">
          <Col span={24}>
            <Form.Item
              label="Country"
              name="country"
              rules={[
                // { transform: (value) => formatCreditCardNumber(value) },
                { required: true, message: 'Please input your Country' },
              ]}
            >
              <Input className="normal-input" type="text" placeholder="Nigeria" />
            </Form.Item>
          </Col>
        </Row>
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
        <PrimaryButton type="submit" text="Authorize" disabled={loading} loading={loading} />
      </Form>
    </AddressFormContainer>
  );
};

export default AddressForm;
