import React, { Suspense, FC, useState, useEffect } from 'react';
// import 'antd/dist/antd.min.css';
import { IApp } from '../types';
import Spinner from './assets/svgs/Spinner';

// lazy load for performance improvement
const Layout = React.lazy(() => import('./components/Layout'));
const Main = React.lazy(() => import('./containers/Main'));

export const App: FC<IApp> = ({ destroyCheckout, ...rest }) => {
  return (
    <Suspense
      fallback={
        <div>
          <Spinner />
        </div>
      }
    >
      <Layout>
        <Main destroyCheckout={destroyCheckout} payload={rest} />
      </Layout>
    </Suspense>
  );
};
