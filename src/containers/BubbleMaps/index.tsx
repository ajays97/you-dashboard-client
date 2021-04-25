import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Layout, message, Space } from 'antd';
import lodash from 'lodash';
import { CircleMarker, MapContainer, TileLayer, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';

import { useDocumentTitle, useInjection } from '../../shared/hooks';

import './index.less';
import { ProductsService } from '../../services';
import { DownOutlined } from '@ant-design/icons';
import { plotMenuItems } from './utils';
import PlotMenu from '../../components/plot.menu';

const { Content } = Layout;

const BubbleMapsPage: React.FC = () => {
  const title = 'Time Series Charts';
  useDocumentTitle(title);

  const [plotMenuLabel, setPlotMenuLabel] = useState('Select...');

  const [products, setProducts] = useState<any>({ items: [] });
  const productsService: ProductsService = useInjection(ProductsService);

  useEffect(() => {
    productsService
      .getProducts(1, 1000)
      .then((productsData) => {
        console.log('Received bubble data:', productsData.items.length);
        setProducts(productsData);
      })
      .catch((err) => console.log('ProductsListPage::getProducts:', err));
  }, []);

  const handlePlotMenuClick = (e: any) => {
    message.info(`Plotting by: ${(plotMenuItems as any)[e.key]}`);
    console.log('plot menu:', e, (plotMenuItems as any)[e.key], plotMenuLabel);
    setPlotMenuLabel((plotMenuItems as any)[e.key]);
  };

  const clearMapFilters = () => {
    setPlotMenuLabel('Select...');
  };

  const getMapMarkers = () => {
    const markers = products.items.map((product: any, index: number) => {
      return (
        <CircleMarker
          key={index}
          stroke={false}
          radius={(20 * Math.log(product.price)) / 10}
          fillOpacity={0.5}
          fillColor={'#006400'}
          center={[product.location.x, product.location.y]}>
          <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
            <span>{`${product.destination}`}</span>
            <br></br>
            {plotMenuLabel && (
              <span>{`${
                (plotMenuItems as any)[lodash.camelCase(plotMenuLabel)]
              } : ${product[lodash.camelCase(plotMenuLabel)]}`}</span>
            )}
          </Tooltip>
        </CircleMarker>
      );
    });
    return markers;
  };

  return (
    <Content style={{ margin: '24px 16px' }}>
      <div
        className="site-layout-background"
        style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}>
        <Space>
          <Space style={{ margin: 25 }}>
            <h3>Data label:</h3>
            <Dropdown
              overlay={PlotMenu(handlePlotMenuClick)}
              trigger={['click']}>
              <Button>
                {plotMenuLabel} <DownOutlined />
              </Button>
            </Dropdown>
          </Space>
          <Space>
            <Button onClick={clearMapFilters}>Clear filters</Button>
          </Space>
        </Space>
        <MapContainer
          zoom={1}
          center={[-0.09, 51.505]}
          style={{ height: '480px', width: '100%' }}>
          <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {plotMenuLabel !== 'Select...' && (
            <MarkerClusterGroup>{getMapMarkers()}</MarkerClusterGroup>
          )}
        </MapContainer>
      </div>
    </Content>
  );
};

export default BubbleMapsPage;
