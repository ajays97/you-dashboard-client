import { ColumnsType } from 'antd/lib/table';
import FilterCondition, { alwaysDisplayColumns } from './constants';

export const getTableColumns = (
  sorterInfo: any,
  displayColumnNames: string[]
) => {
  displayColumnNames = displayColumnNames.concat(alwaysDisplayColumns);

  const tableColumns: ColumnsType<any> = [
    {
      title: 'UID',
      dataIndex: 'uid',
      key: 'uid',
      sorter: (a, b) => a.uid - b.uid,
      sortOrder: sorterInfo.sortKey === 'uid' && sorterInfo.sortOrder
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      sortOrder: sorterInfo.sortKey === 'id' && sorterInfo.sortOrder
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => a.date < b.date,
      sortOrder: sorterInfo.sortKey === 'date' && sorterInfo.sortOrder
    },
    {
      title: 'Product Name',
      dataIndex: 'productTitle',
      key: 'productName',
      sorter: (a, b) => a.productTitle.localeCompare(b.productTitle),
      sortOrder: sorterInfo.sortKey === 'productName' && sorterInfo.sortOrder
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
      sorter: (a, b) => a.currency - b.currency,
      sortOrder: sorterInfo.sortKey === 'currency' && sorterInfo.sortOrder
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      sortOrder: sorterInfo.sortKey === 'price' && sorterInfo.sortOrder
    },
    {
      title: 'Total Bookings',
      dataIndex: 'totalBookingCount',
      key: 'totalBookings',
      sorter: (a, b) => a.totalBookingCount - b.totalBookingCount,
      sortOrder: sorterInfo.sortKey === 'totalBookings' && sorterInfo.sortOrder
    },
    {
      title: 'Destination',
      dataIndex: 'destination',
      key: 'destination',
      sorter: (a, b) => a.destination.localeCompare(b.destination),
      sortOrder: sorterInfo.sortKey === 'destination' && sorterInfo.sortOrder
    },
    {
      title: 'Segments',
      dataIndex: 'segments',
      key: 'segments',
      sorter: (a, b) => a.segments.localeCompare(b.segments),
      sortOrder: sorterInfo.sortKey === 'segments' && sorterInfo.sortOrder
    },
    {
      title: 'OTA',
      dataIndex: 'ota',
      key: 'ota'
    }
  ];
  return tableColumns.filter((tableColumn) => {
    return displayColumnNames.find(
      (columnName) => tableColumn.title === columnName
    );
  });
};

export const sortMenuItems = {
  uid: 'UID',
  id: 'ID',
  date: 'Date',
  productName: 'Product Name',
  currency: 'Currency',
  price: 'Price',
  totalBookings: 'Total Bookings',
  destination: 'Destination',
  location: 'Location',
  segments: 'Segments'
};

export const filterMenuItems = {
  price: 'Price',
  totalBookingCount: 'Total Bookings'
};

export const displayColumnList = {
  date: 'Date',
  productName: 'Product Name',
  currency: 'Currency',
  price: 'Price',
  totalBookings: 'Total Bookings',
  destination: 'Destination',
  segments: 'Segments',
  ota: 'OTA'
};

export const getDisplayValues = (displayColumns: any) => {
  const displayValues: string[] = [];
  Object.entries(displayColumns).map(([key, value]) => {
    if (value) {
      return displayValues.push((displayColumnList as any)[key]);
    } else {
      return null;
    }
  });
  return displayValues;
};

export const getFilteredProducts = (
  products: any[],
  filterer: { filterKey: string; filterCondition: string; filterValue: number }
) => {
  console.log('Filterer:', filterer);

  let filteredProducts;
  if (filterer.filterCondition === FilterCondition.EQUAL) {
    filteredProducts = products.filter(
      (product) => product[filterer.filterKey] === filterer.filterValue
    );
  } else if (filterer.filterCondition === FilterCondition.GREATER_THAN) {
    filteredProducts = products.filter(
      (product) => product[filterer.filterKey] > filterer.filterValue
    );
  } else if (
    filterer.filterCondition === FilterCondition.GREATER_THAN_OR_EQUAL
  ) {
    filteredProducts = products.filter(
      (product) => product[filterer.filterKey] >= filterer.filterValue
    );
  } else if (filterer.filterCondition === FilterCondition.LESSER_THAN) {
    filteredProducts = products.filter(
      (product) => product[filterer.filterKey] < filterer.filterValue
    );
  } else if (
    filterer.filterCondition === FilterCondition.LESSER_THAN_OR_EQUAL
  ) {
    filteredProducts = products.filter(
      (product) => product[filterer.filterKey] <= filterer.filterValue
    );
  }
  return filteredProducts;
};
