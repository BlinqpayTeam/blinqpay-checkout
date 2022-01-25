import React, { useState, FC } from 'react';
import { Row, Col, Card } from 'antd';

// SVG icons
import Powered from '../../assets/svgs/Powered';
import Modal from '../../components/Modal';

const Main: FC<{ destroyCheckout: () => void }> = ({ destroyCheckout }) => {
  const [page, setPage] = useState('main');

  return (
    <div className="main-wrapper">
      <Modal page={page} setPage={setPage} destroyCheckout={destroyCheckout} />
      <div className="d-flex centered mt-40">
        <Powered />
      </div>
    </div>
  );
};

export default Main;
