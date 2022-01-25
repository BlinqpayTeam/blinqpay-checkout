import React, { Suspense, FC } from 'react';
import 'antd/dist/antd.css';
import { IApp } from '../types';

// lazy load for performance improvement
const Layout = React.lazy(() => import('./components/Layout'));
const Main = React.lazy(() => import('./containers/Main'));

export const App: FC<IApp> = ({ destroyCheckout }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout>
        <Main destroyCheckout={destroyCheckout} />
      </Layout>
    </Suspense>
  );
};
