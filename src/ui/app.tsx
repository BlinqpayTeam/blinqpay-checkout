import React, { Suspense } from 'react';
import 'antd/dist/antd.css';

// lazy load for performance improvement
const Layout = React.lazy(() => import('./components/Layout'));
const Main = React.lazy(() => import('./containers/Main'));

export const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout>
        <Main />
      </Layout>
    </Suspense>
  );
};
