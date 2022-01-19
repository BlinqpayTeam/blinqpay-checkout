import React, { useState } from 'react';
import { Row, Col, Card } from 'antd';
import Xicon from '../../assets/svgs/Xicon';
import PaymentSelect from '../PaymentSelect';
import { IModal } from './IModal';
import SelectHeader from '../Headers/SelectHeader';
import Overall from '../Slide/Overall';

const Modal: React.FC<IModal.IProps> = ({ page, setPage }: IModal.IProps) => {
  const [activeSlide, setActiveSlide] = useState('main');
  return (
    <Row className="full-width " justify="center">
      <Col xs={20} sm={18} md={11} lg={9}>
        <Card className="modal-card ">
          <div className="close-button">
            <div className="close-icon">
              <Xicon />
            </div>
          </div>
          <Overall
            activeSlide={activeSlide}
            firstSlide={
              <>
                <SelectHeader />
                <PaymentSelect setActiveSlide={setActiveSlide} />
              </>
            }
            secondSlide={<div>Second slide</div>}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Modal;
