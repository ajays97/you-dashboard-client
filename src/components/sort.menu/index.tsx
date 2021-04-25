import { Menu } from 'antd';

const SortMenu = (handleMenuClick: any) => {
  return (
    <Menu onClick={(e) => handleMenuClick(e)}>
      <Menu.Item key="uid">UID</Menu.Item>
      <Menu.Item key="id">ID</Menu.Item>
      <Menu.Item key="date">Date</Menu.Item>
      <Menu.Item key="productName">Product Name</Menu.Item>
      <Menu.Item key="currency">Currency</Menu.Item>
      <Menu.Item key="price">Price</Menu.Item>
      <Menu.Item key="totalBookings">Total Bookings</Menu.Item>
      <Menu.Item key="destination">Destination</Menu.Item>
      <Menu.Item key="segments">Segments</Menu.Item>
    </Menu>
  );
};

export default SortMenu;
