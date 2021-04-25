import { Menu } from 'antd';

const FilterMenu = (handleMenuClick: any) => {
  return (
    <Menu onClick={(e) => handleMenuClick(e)}>
      <Menu.Item key="price">Price</Menu.Item>
      <Menu.Item key="totalBookingCount">Total Bookings</Menu.Item>
    </Menu>
  );
};

export default FilterMenu;
