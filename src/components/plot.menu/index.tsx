import { Menu } from 'antd';

const PlotMenu = (handleMenuClick: any) => {
  return (
    <Menu onClick={(e) => handleMenuClick(e)}>
      <Menu.Item key="currency">Currency</Menu.Item>
      <Menu.Item key="price">Price</Menu.Item>
      <Menu.Item key="segments">Segments</Menu.Item>
      <Menu.Item key="productTitle">Product Title</Menu.Item>
      <Menu.Item key="totalBookings">Total Bookings</Menu.Item>
    </Menu>
  );
};

export default PlotMenu;
