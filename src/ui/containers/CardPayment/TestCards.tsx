import React, { useState } from 'react';
import Checkbox from 'antd/es/checkbox';
import 'antd/es/checkbox/style/css';
import { ICardPayment } from './ICardPayment';
import { testCards } from '../../utils/cards';
import { CardListContainer } from './style';
import { Body } from '../../components/Layout/style';
import PrimaryButton from '../../components/Buttons/PrimaryButton';

const TestCards: React.FC<ICardPayment.ITestCardsProps> = ({ setActiveSlide }) => {
  const [cardState, setCardState] = useState([...testCards].map((v) => ({ selected: false, ...v })));
  const [data, setData] = useState<Record<string, unknown> | undefined>();
  const [loading, setLoading] = useState(false);
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
  const handleSubmit = () => {
    setLoading(true);
    console.log('summit');
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
        disabled={!data || loading}
        loading={loading}
        onClick={handleSubmit}
      />
    </Body>
  );
};

export default TestCards;
