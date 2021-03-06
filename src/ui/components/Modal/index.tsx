import React, { useEffect, useState, useMemo } from 'react';
import Row from 'antd/es/row';
import 'antd/es/row/style/css';
import Col from 'antd/es/col';
import 'antd/es/col/style/css';
// import { Row, Col } from 'antd';

// import PaymentSelect from '../PaymentSelect';
import { IModal } from './IModal';

import { PaymentMethodProvider } from '../../../context';

const Xicon = React.lazy(() => import('../../assets/svgs/Xicon'));
const Spinner = React.lazy(() => import('../../assets/svgs/Spinner'));
const ErrorIcon = React.lazy(() => import('../../assets/svgs/ErrorIcon'));
const PaymentSelect = React.lazy(() => import('../PaymentSelect'));
const SelectHeader = React.lazy(() => import('../Headers/SelectHeader'));
const Overall = React.lazy(() => import('../Slide/Overall'));
const CombinePayment = React.lazy(() => import('../Layout/CombinePayment'));

const computeInitSlide = (
  loading: boolean | undefined,
  isError: boolean | undefined,
  setPage: React.Dispatch<React.SetStateAction<string>>,
  setActiveSlide: React.Dispatch<React.SetStateAction<string>>,
): JSX.Element | Element => {
  if (loading === false) {
    if (isError) {
      return (
        <div className="empty-container">
          <span>
            <ErrorIcon />
          </span>

          <span>Oops!!!. some error occurred whilst initializing your transaction. Try again soon.</span>
        </div>
      );
    }
    return (
      <>
        <SelectHeader />
        <PaymentSelect setActiveSlide={setActiveSlide} setPage={setPage} />
      </>
    );
  }
  return (
    <div className="empty-container">
      <Spinner />
    </div>
  );
};
const Modal: React.FC<IModal.IProps> = ({ page, setPage, payload, destroyCheckout }: IModal.IProps) => {
  const { loading, isError, ...rest } = payload;
  const [activeSlide, setActiveSlide] = useState('first');

  const handleClose = (): void => {
    destroyCheckout();
  };
  useEffect(() => {
    if (page === 'main') {
      setActiveSlide('first');
    } else {
      setActiveSlide('second');
    }
  }, [page]);
  const displayFirstSlide = useMemo(
    () => computeInitSlide(loading, isError, setPage, setActiveSlide),
    [loading, isError, setPage, setActiveSlide],
  );
  return (
    <Row className="full-width" justify="center">
      <Col xs={20} sm={18} md={11} lg={9}>
        <div className="modal-card ">
          <div className="close-button">
            <div className="close-icon" onClick={handleClose}>
              <Xicon />
            </div>
          </div>
          <PaymentMethodProvider>
            <Overall
              activeSlide={activeSlide}
              firstSlide={displayFirstSlide}
              secondSlide={<CombinePayment page={page} setPage={setPage} payload={{ ...rest, destroyCheckout }} />}
            />
          </PaymentMethodProvider>
        </div>
      </Col>
    </Row>
  );
};

export default Modal;
