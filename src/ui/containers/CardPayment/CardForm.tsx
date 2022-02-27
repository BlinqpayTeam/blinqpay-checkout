import React, { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
import { Form, Input, Row, Col, Checkbox } from 'antd';
import CardSmall from '../../assets/svgs/CardSmall';
import { CardFormContainer } from './style';
import Lock from '../../assets/svgs/Lock';
import { FormInstance } from 'antd/es/form';
import Calendar from '../../assets/svgs/Calendar';
import { formatCreditCardNumber, formatDate } from '../../utils/formMethods';
import Cleave from 'cleave.js/react';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import { ICardPayment } from './ICardPayment';
import { aesCardCipher } from '../../../lib/encryption';
import { chargeCard } from '../../../api/card';

const CardForm: React.FC<ICardPayment.ICardProps> = ({
  setActiveSlide,
  amount,
  setIsSuccess,
  setErrorText,
  txRef,
  setIsCloseModal,
  setPrevSlide,
}: ICardPayment.ICardProps) => {
  const formRef = React.createRef<FormInstance>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const failedMsg = 'We are unable to charge your card at the moment, ensure the details are correct and try again.';
  const onFinish = async (values: any) => {
    const card = {
      number: values.card_number.replace(/ +/g, ''),
      expiryMonth: values.expiry_date.slice(0, 2),
      expiryYear: values.expiry_date.slice(3),
      cvv: values.cvv,
    };
    const cardCipher = aesCardCipher(card);
    console.log('finished', cardCipher);
    setLoading(true);
    const { data } = await chargeCard({
      transactionReference: txRef,
      card: cardCipher,
    });
    console.log(data);
    setLoading(false);
    if (data?.error) {
      if (data?.statusCode === 409) {
        // Todo: Fetch the a new transaction reference at this point
        setIsCloseModal(true);
        setErrorText(data?.message as string);
      } else {
        setPrevSlide('first');
        setErrorText(failedMsg);
      }
      setIsSuccess(false);
      setActiveSlide('sixth');
    } else {
      const { data: res } = data as unknown as Record<string, Record<string, string> | undefined>;
      if (res?.status === 'FAILED') {
        console.log(res?.status);
        setErrorText(failedMsg);
        setIsSuccess(false);
        setPrevSlide('first');
        setActiveSlide('sixth');
      } else if (res?.status === 'SUCCESS' && res?.responseMessage === 'Card charged successfully') {
        setIsSuccess(true);
        setActiveSlide('sixth');
      } else {
        // check type of AUTHMODEL
        switch (res?.authModel) {
          case 'PIN':
            setActiveSlide('second');
            break;
          case 'CARD_ENROLL':
            setActiveSlide('fifth');
            break;
          case 'AVS':
            setActiveSlide('fourth');
            break;
          default:
            break;
        }
      }
    }
    // formRef.current!.resetFields();
  };
  const [cardInput, setCardInput] = useState('');
  const [cardImage, setCardImage] = useState('');
  const [cardDate, setCardDate] = useState('');
  const handleCardInputChange = async (e: any) => {
    const card = await formatCreditCardNumber(e.target.value);
    setCardInput(card.cardNumber);
    setCardImage(card.image);
  };
  const handleDateInputChange = async (e: any) => {
    const date = await formatDate(e.target.value);
    setCardDate(date);
  };
  useEffect(() => {
    formRef?.current?.setFieldsValue({
      card_number: cardInput,
    });
  }, [cardInput]);
  useEffect(() => {
    formRef?.current?.setFieldsValue({
      expiry_date: cardDate,
    });
  }, [cardDate]);
  return (
    <CardFormContainer>
      <Form
        layout="vertical"
        colon={false}
        // initialValues={{ card_number: cardInput, expiry_date: '', cvv: '' }}
        onFinish={onFinish}
        ref={formRef}
      >
        <Row className="stretch">
          <Col span={24}>
            <Form.Item
              label="Card Number"
              name="card_number"
              rules={[
                // { transform: (value) => formatCreditCardNumber(value) },
                { required: true, message: 'Please input your Card Number' },
              ]}
            >
              <Input
                type="text"
                pattern="[\d| ]{16,22}"
                maxLength={19}
                prefix={cardImage ? <img src={cardImage} /> : <CardSmall />}
                placeholder="4444 4444 4444 4444"
                value={cardInput}
                onChange={handleCardInputChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className="strench" justify="space-between">
          <Col span={12}>
            <Form.Item
              label="Expiry Date"
              name="expiry_date"
              rules={[{ required: true, message: 'Please input Expiry date!' }]}
            >
              <Input
                onChange={handleDateInputChange}
                value={cardDate}
                prefix={<Calendar />}
                type="text"
                pattern="\d\d/\d\d"
                maxLength={5}
                placeholder="MM/YY"
              />
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
        <PrimaryButton type="submit" text={amount} disabled={loading} loading={loading} />
      </Form>
    </CardFormContainer>
  );
};
export default CardForm;
