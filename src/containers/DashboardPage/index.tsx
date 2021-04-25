import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';

import { useDocumentTitle } from '../../shared/hooks';

import './index.less';
import ProductsListPage from '../ProductsList';
import TimeSeriesPage from '../TimeSeries';
import BubbleMapsPage from '../BubbleMaps';

const { Header, Sider } = Layout;

const DashboardPage: React.FC = () => {
  const title = 'Dashboard Home';
  useDocumentTitle(title);

  const [collapsed, setCollapsed] = useState(false);
  const [selectedNav, setSelectedNav] = useState(1);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const getContentPage = () => {
    switch (selectedNav) {
      case 1:
        return <ProductsListPage />;
      case 2:
        return <TimeSeriesPage />;
      case 3:
        return <BubbleMapsPage />;
    }
  };

  return (
    <Layout id="dashboard-layout" style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item
            key="1"
            icon={<UserOutlined />}
            onClick={() => setSelectedNav(1)}>
            nav 1
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<VideoCameraOutlined />}
            onClick={() => setSelectedNav(2)}>
            nav 2
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<UploadOutlined />}
            onClick={() => setSelectedNav(3)}>
            nav 3
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<UserOutlined />}
            onClick={() => setSelectedNav(4)}>
            nav 4
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="dashboard-page-layout">
        <Header
          className="dashboard-page-layout-background"
          style={{ padding: 0 }}>
          {collapsed ? (
            <MenuUnfoldOutlined
              className="dashboard-menu-trigger"
              color="whitesmoke"
              onClick={toggle}
            />
          ) : (
            <MenuFoldOutlined
              className="dashboard-menu-trigger"
              color="whitesmoke"
              onClick={toggle}
            />
          )}
        </Header>
        {getContentPage()}
        {/* <Footer style={{ textAlign: 'center' }}>
          YOU Group ©2018 Created by Ajay Srinivas
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default DashboardPage;
