import NavMenu, { NavMenuItemType } from '@/app/[locale]/components/nav-menu';
import { ConfigProvider } from 'antd';
import React from 'react';

const Navbar: React.FC<{
  items: NavMenuItemType[];
}> = ({ items }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            horizontalLineHeight: 48,
            // itemPaddingInline: 16,
          },
        },
      }}
    >
      <div className="h-12 w-full invisible" />
      <nav className="fixed top-16 right-0 left-[240px] z-50 bg-white border-b border-slate-200 h-12 pl-4">
        <NavMenu
          selectable={false}
          className="border-0"
          items={items}
          mode="horizontal"
          classNames={{
            item: '[&_.ant-menu-item-extra]:pl-1',
          }}
        />
      </nav>
    </ConfigProvider>
  );
};

export default Navbar;
