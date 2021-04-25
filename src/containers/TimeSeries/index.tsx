import React from 'react';
import { Layout } from 'antd';

import { useDocumentTitle } from '../../shared/hooks';

import './index.less';

const { Content } = Layout;

const TimeSeriesPage: React.FC = () => {
  const title = 'Time Series Charts';
  useDocumentTitle(title);

  return (
    <Content style={{ margin: '24px 16px' }}>
      <div
        className="site-layout-background"
        style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}>
        content
      </div>
    </Content>
  );
};

export default TimeSeriesPage;
