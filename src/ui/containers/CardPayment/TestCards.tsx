import React, { useContext, useState } from 'react';
import Checkbox from 'antd/es/checkbox';
import 'antd/es/checkbox/style/css';
import { ICardPayment } from './ICardPayment';
import { testCards } from '../../utils/cards';
import { CardListContainer } from './style';
import { Body } from '../../components/Layout/style';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import { aesCardCipher } from '../../../lib/encryption';
import { chargeCard } from '../../../api/card';
import { PaymentContextType, PaymentMethod } from '../../../types';
import { PaymentMethodContext } from '../../../context';

const TestCards: React.FC<ICardPayment.ITestCardsProps> = ({
  setActiveSlide,
  txRef,
  setErrorText,
  setIsSuccess,
  setRedirectUrl,
  setPaymentStatus,
  setEnableChangeMethod,
}) => {
  const [cardState, setCardState] = useState([...testCards].map((v) => ({ selected: false, ...v })));
  const [cardData, setData] = useState<Record<string, unknown> | undefined>();
  const [loading, setLoading] = useState(false);
  const { setSelectedMethods } = useContext(PaymentMethodContext) as PaymentContextType;
  const handleClick = (id: number) => {
    if (!loading) {
      const updateCardState = cardState.map((card, index) => ({
        ...card,
        selected: id === index,
      }));
      setCardState(updateCardState);
      setData(updateCardState[id]);
    }
  };

  const failedMsg = 'We are unable to charge your card at the moment.';
  const handleSubmit = async () => {
    const cardObj = cardData as Record<string, string>;
    const card = {
      number: cardObj.number as string,
      expiryMonth: cardObj.expiryDate.slice(0, 2),
      expiryYear: cardObj.expiryDate.slice(3),
      cvv: cardObj.cvv,
    };
    const cardCipher = aesCardCipher(card);
    setLoading(true);
    const { data } = await chargeCard({
      transactionReference: txRef,
      card: cardCipher,
    });
    setLoading(false);
    if (data?.error) {
      setSelectedMethods((curr) => [...curr, PaymentMethod.CARD_PAYMENT]);
      setErrorText(failedMsg);
      setIsSuccess(false);
      setPaymentStatus('failed');
      setActiveSlide('sixth');
    } else {
      const { data: res } = data as unknown as Record<string, Record<string, string> | undefined>;
      if (res?.status === 'FAILED') {
        setSelectedMethods((curr) => [...curr, PaymentMethod.CARD_PAYMENT]);
        console.log(res?.status);
        setErrorText(failedMsg);
        setIsSuccess(false);
        setPaymentStatus(res?.status);
        setActiveSlide('sixth');
      } else if (res?.status === 'SUCCESS' && res?.responseMessage === 'Card charged successfully') {
        setEnableChangeMethod(false);
        setIsSuccess(true);
        setActiveSlide('sixth');
      } else {
        if (res?.redirect_url) setRedirectUrl('https://test-checkout.blinqpay.io/cards/3ds-test');
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
          case '3DS':
            setActiveSlide('seventh');
            break;
          default:
            break;
        }
      }
    }
  };
  return (
    <Body>
      <p className="text-center">The following test cards can be used to complete a transaction</p>
      <CardListContainer>
        {cardState.map((card, index) => (
          <div className="option" key={index} onClick={() => handleClick(index)}>
            <Checkbox checked={card?.selected} className="checkbox" />
            <span className="option-title">{card?.title}</span>
          </div>
        ))}
      </CardListContainer>
      <PrimaryButton
        type="submit"
        text="Authorize"
        disabled={!cardData || loading}
        loading={loading}
        onClick={handleSubmit}
      />
    </Body>
  );
};

export default TestCards;
