import React, { useEffect, useState } from 'react';
import {
  Button,
  // Button,
  Dropdown,
  Input,
  InputNumber,
  Layout,
  message,
  PaginationProps,
  Select,
  Space,
  Table
} from 'antd';

import { useDocumentTitle, useInjection } from '../../shared/hooks';

import './index.less';
import ProductsService from '../../services/products.service';
import {
  displayColumnList,
  getFilteredProducts,
  getTableColumns,
  sortMenuItems,
  filterMenuItems
} from './utils';
import SortMenu from '../../components/sort.menu';
import { DownOutlined } from '@ant-design/icons';
import FilterCondition from './constants';
import FilterMenu from '../../components/filter.menu';

const { Content } = Layout;
const { Option } = Select;

const ProductsListPage: React.FC = () => {
  const title = 'Dashboard Home';
  useDocumentTitle(title);

  const paginationOptions: PaginationProps = {
    defaultPageSize: 10,
    responsive: true
  };

  // Sorting and Filtering
  const [sorter, setSorter] = useState({ sortKey: '', sortOrder: 'ascend' });
  const [sortMenuLabel, setSortMenuLabel] = useState('Select...');
  const [filterMenuLabel, setFilterMenuLabel] = useState('Select...');
  const [filterCondition, setFilterCondition] = useState(FilterCondition.EQUAL);
  const [filterValue, setFilterValue] = useState(0);
  const [filterer, setFilterer] = useState({
    filterKey: '',
    filterCondition: FilterCondition.EQUAL,
    filterValue: 0
  });

  // Display columns filter
  const [displayColumns, setDisplayColumns] = useState({});
  const [displayColumnNames, setDisplayColumnNames] = useState<string[]>(
    Object.values(displayColumnList)
  );

  const [products, setProducts] = useState<any>({ items: [] });
  const [filteredProducts, setFilteredProducts] = useState<any>(products);
  const productsService: ProductsService = useInjection(ProductsService);

  useEffect(() => {
    productsService
      .getProducts(1, 25)
      .then((productsData) => {
        console.log('Received data:', productsData.items[0]);
        setProducts(productsData || { items: [] });
        setFilteredProducts(productsData || { items: [] });
        setDisplayColumns({
          date: true,
          productName: true,
          currency: true,
          price: true,
          totalBookings: true,
          destination: true,
          segments: true,
          ota: true
        });
      })
      .catch((err) => console.log('ProductsListPage::getProducts:', err));
  }, []);

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setSorter({ sortKey: sorter.columnKey, sortOrder: sorter.order });
    if (!sorter.order) {
      setSortMenuLabel('Select...');
    }
  };

  const handleClearTableFilters = () => {
    setSorter({ sortKey: '', sortOrder: 'ascend' });
    setDisplayColumnNames(Object.values(displayColumnList));
    setSortMenuLabel('Select...');
    setFilterer({
      filterKey: '',
      filterCondition: FilterCondition.EQUAL,
      filterValue: 0
    });
    setFilterMenuLabel('Select...');
    setFilteredProducts(products);
    setFilterCondition(FilterCondition.EQUAL);
    setFilterValue(0);
  };

  const handleSortMenuClick = (e: any) => {
    message.info('Click on menu item');
    setSortMenuLabel((sortMenuItems as any)[e.key]);
    setSorter({ sortKey: e.key, sortOrder: 'ascend' });
  };

  const handleFilterMenuClick = (e: any) => {
    setFilterMenuLabel((filterMenuItems as any)[e.key]);
    setFilterer({
      ...filterer,
      filterKey: e.key
    });
  };

  const filterSubmitClick = () => {
    const filteredData = getFilteredProducts(products.items, filterer);
    console.log('Got Filtered Prds:', filteredData);
    setFilteredProducts({
      ...filteredProducts,
      items: filteredData
    });
  };

  const handleDisplaySelection = (e: any) => {
    setDisplayColumnNames(e);
  };

  const getFilterCondition = () => {
    return (
      <Space>
        <h3>Filter on:</h3>
        <Dropdown
          overlay={FilterMenu(handleFilterMenuClick)}
          trigger={['click']}>
          <Button>
            {filterMenuLabel} <DownOutlined />
          </Button>
        </Dropdown>
        <Input.Group compact>
          <Select
            disabled={filterMenuLabel === 'Select...'}
            onChange={(e) => {
              setFilterCondition(e);
              setFilterer({
                ...filterer,
                filterCondition: e
              });
            }}
            value={filterCondition}
            defaultValue={FilterCondition.EQUAL}>
            <Option key={FilterCondition.EQUAL} value={FilterCondition.EQUAL}>
              =
            </Option>
            <Option
              key={FilterCondition.GREATER_THAN}
              value={FilterCondition.GREATER_THAN}>
              {'>'}
            </Option>
            <Option
              key={FilterCondition.GREATER_THAN_OR_EQUAL}
              value={FilterCondition.GREATER_THAN_OR_EQUAL}>
              {'>='}
            </Option>
            <Option
              key={FilterCondition.LESSER_THAN}
              value={FilterCondition.LESSER_THAN}>
              {'<'}
            </Option>
            <Option
              key={FilterCondition.LESSER_THAN_OR_EQUAL}
              value={FilterCondition.LESSER_THAN_OR_EQUAL}>
              {'<='}
            </Option>
          </Select>
          <InputNumber
            disabled={filterMenuLabel === 'Select...'}
            onChange={(e) => {
              setFilterValue(e);
              setFilterer({
                ...filterer,
                filterValue: e
              });
            }}
            value={filterValue}
            style={{ width: '50%' }}
            defaultValue={filterValue}
          />
          <Button
            disabled={filterMenuLabel === 'Select...'}
            onClick={filterSubmitClick}>
            Filter
          </Button>
        </Input.Group>
      </Space>
    );
  };

  return (
    <Content style={{ margin: '24px 16px' }}>
      <div
        className="site-layout-background"
        style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}>
        <Space>
          <Space>
            <h3>Sorted By:</h3>
            <Dropdown
              overlay={SortMenu(handleSortMenuClick)}
              trigger={['click']}>
              <Button>
                {sortMenuLabel} <DownOutlined />
              </Button>
            </Dropdown>
          </Space>
          {getFilterCondition()}
          <Space>
            <Button onClick={handleClearTableFilters}>Clear filters</Button>
          </Space>
        </Space>
        <Space>
          <h3>Display Columns:</h3>
          <Select
            style={{ width: 750 }}
            onChange={handleDisplaySelection}
            mode="multiple"
            placeholder="Please select"
            value={displayColumnNames}
            defaultValue={displayColumnNames}>
            {Object.entries(displayColumns).map(
              ([key, value], index: number) => {
                if (value)
                  return (
                    <Option key={key} value={(displayColumnList as any)[key]}>
                      {(displayColumnList as any)[key]}
                    </Option>
                  );
                else return null;
              }
            )}
          </Select>
        </Space>
        <Space className={'table-layout'}>
          <Table
            onChange={handleTableChange}
            bordered
            title={() => 'Products List'}
            pagination={{ ...paginationOptions, position: ['bottomCenter'] }}
            dataSource={filteredProducts.items}
            columns={getTableColumns(sorter, displayColumnNames)}
          />
        </Space>
      </div>
    </Content>
  );
};

export default ProductsListPage;
