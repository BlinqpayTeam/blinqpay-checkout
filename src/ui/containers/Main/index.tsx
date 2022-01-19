import React, { useState } from 'react';
import { Row, Col, Card } from 'antd';

// SVG icons
import Powered from '../../assets/svgs/Powered';
import Modal from '../../components/Modal';

const Main = () => {
  const [page, setPage] = useState('');
  return (
    <div className="main-wrapper">
      <Modal page={page} setPage={setPage} />
      <div className="d-flex centered mt-pt-70">
        <Powered />
      </div>
    </div>
  );
};

export default Main;
