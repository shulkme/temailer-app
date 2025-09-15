'use client';
import { AntdHeader } from '@/components/antd';
import { languages, Locale } from '@/i18n/config';
import { useRouter } from '@/i18n/navigation';
import { useCredit } from '@/providers/credit';
import { useIdentity } from '@/providers/identity';
import { useLanguage } from '@/providers/language';
import { useTitle } from '@/providers/title';
import { getInitials } from '@/utils/string';
import {
  RiArrowDownSLine,
  RiBillLine,
  RiLogoutBoxRLine,
  RiNotification3Line,
  RiTranslate2,
  RiUser6Line,
  RiWalletLine,
} from '@remixicon/react';
import {
  Avatar,
  Badge,
  Button,
  Divider,
  Dropdown,
  List,
  MenuProps,
  Popover,
} from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';

const LanguageSelector = () => {
  const { locale, setLocale, language } = useLanguage();

  const handleLanguageChange: MenuProps['onClick'] = ({ key }) => {
    setLocale(key as Locale);
  };
  return (
    <Dropdown
      menu={{
        onClick: handleLanguageChange,
        selectedKeys: [locale],
        selectable: true,
        items: languages.map((lang) => ({
          key: lang.value,
          label: lang.label,
          disabled: lang.disabled,
        })),
      }}
    >
      <Button
        type="text"
        className="leading-none rounded-none h-full px-4"
        icon={<RiTranslate2 size={20} />}
      >
        <span>{language}</span>
        <RiArrowDownSLine size={16} />
      </Button>
    </Dropdown>
  );
};

const AccountDropdown = () => {
  const { user } = useIdentity();
  const t = useTranslations('app.global.header.account');
  const router = useRouter();

  const handleClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'account':
        router.push('/account/profile');
        break;
      case 'logout':
        router.push('/login');
        break;
      case 'wallet':
        router.push('/wallet/recharge');
        break;
    }
  };
  return (
    <Dropdown
      menu={{
        onClick: handleClick,
        items: [
          {
            label: t('account'),
            key: 'account',
            icon: <RiUser6Line size={16} />,
          },
          {
            label: t('billing'),
            key: 'billing',
            icon: <RiBillLine size={16} />,
          },
          {
            label: t('wallet'),
            key: 'wallet',
            icon: <RiWalletLine size={16} />,
          },
          {
            type: 'divider',
          },
          {
            label: t('logout'),
            key: 'logout',
            icon: <RiLogoutBoxRLine size={16} />,
            danger: true,
          },
        ],
      }}
      popupRender={(menu) => (
        <div className="bg-white rounded-sm shadow-lg min-w-64">
          <div className="p-4 font-bold">{user?.email}</div>
          <Divider type="horizontal" className="m-0" />
          {React.cloneElement(
            menu as React.ReactElement<{
              className: string;
            }>,
            {
              className: 'shadow-none bg-transparent',
            },
          )}
        </div>
      )}
    >
      <Button
        type="text"
        className="leading-none rounded-none h-full px-4"
        icon={<RiArrowDownSLine size={16} />}
        iconPosition="end"
      >
        <Avatar
          gap={8}
          className="bg-(--ant-color-primary) leading-none"
          size={32}
        >
          {getInitials(user?.nickname || 'Unknown')}
        </Avatar>
      </Button>
    </Dropdown>
  );
};

const NotificationDropdown = () => {
  const t = useTranslations('app.global.header');
  return (
    <Popover
      arrow={false}
      trigger={['click']}
      title={t('notification')}
      content={
        <div className="w-96">
          <List />
        </div>
      }
    >
      <Button type="text" className="leading-none rounded-none h-full px-4">
        <Badge dot>
          <RiNotification3Line size={20} />
        </Badge>
      </Button>
    </Popover>
  );
};

const Header: React.FC = () => {
  const { title } = useTitle();
  const { available, loading } = useCredit();
  return (
    <>
      <AntdHeader className="h-16 invisible" />
      <AntdHeader className="fixed top-0 right-0 left-[240px] z-50 h-16 border-b border-slate-200 bg-white">
        <div className="h-full flex items-center justify-between pl-8">
          <div className="text-sm font-bold">
            <span>{title}</span>
          </div>
          <div className="flex h-full items-center">
            <NotificationDropdown />
            <div className="border-r w-0 h-full border-slate-100" />
            <Button
              href={'/wallet/recharge'}
              loading={loading}
              type="text"
              className="leading-none font-bold rounded-none h-full px-4"
              icon={<RiWalletLine size={20} />}
            >
              $ {available.toLocaleString()}
            </Button>
            <div className="border-r w-0 h-full border-slate-100" />
            <LanguageSelector />
            <div className="border-r border-slate-100 h-full" />
            <AccountDropdown />
          </div>
        </div>
      </AntdHeader>
    </>
  );
};

export default Header;
