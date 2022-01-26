import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'antd';
import Xicon from '../../assets/svgs/Xicon';
import PaymentSelect from '../PaymentSelect';
import { IModal } from './IModal';
import SelectHeader from '../Headers/SelectHeader';
import Overall from '../Slide/Overall';
import CombinePayment from '../Layout/CombinePayment';

const Modal: React.FC<IModal.IProps> = ({ page, setPage, destroyCheckout }: IModal.IProps) => {
  const [activeSlide, setActiveSlide] = useState('first');
  const handleClose = (): void => {
    destroyCheckout();
  };
  useEffect(() => {
    if (page === 'main') {
      setActiveSlide('first');
    }
  }, [page]);
  return (
    <Row className="full-width " justify="center">
      <Col xs={20} sm={18} md={11} lg={9}>
        <div className="modal-card ">
          <div className="close-button">
            <div className="close-icon" onClick={handleClose}>
              <Xicon />
            </div>
          </div>
          <Overall
            activeSlide={activeSlide}
            firstSlide={
              <>
                <SelectHeader />
                <PaymentSelect setActiveSlide={setActiveSlide} setPage={setPage} />
              </>
            }
            secondSlide={<CombinePayment page={page} setPage={setPage} />}
          />
        </div>
      </Col>
    </Row>
  );
};

export default Modal;
