'use client';
import { AntdHeader } from '@/components/antd';
import { languages, Locale } from '@/i18n/config';
import { Link, useRouter } from '@/i18n/navigation';
import { useCredit } from '@/providers/credit';
import { useIdentity } from '@/providers/identity';
import { useLanguage } from '@/providers/language';
import { useSubscription } from '@/providers/subscription';
import { useTitle } from '@/providers/title';
import { getInitials } from '@/utils/string';
import {
  RiArrowDownSLine,
  RiBillLine,
  RiCopperDiamondFill,
  RiCopperDiamondLine,
  RiLogoutBoxRLine,
  RiMenuLine,
  RiTranslate2,
  RiUser6Line,
  RiVipCrown2Line,
} from '@remixicon/react';
import { Avatar, Button, Divider, Dropdown, MenuProps } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { ItemType } from 'antd/es/menu/interface';
import { useTranslations } from 'next-intl';
import React, { useMemo } from 'react';

const languageOptions = languages.map((lang) => ({
  key: lang.value,
  label: lang.label,
  disabled: lang.disabled,
}));

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
        items: languageOptions,
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
  const { lg } = useBreakpoint();
  const { setLocale } = useLanguage();
  const { plan_locale } = useSubscription();
  const { loading, available } = useCredit();

  const menus = useMemo(() => {
    return [
      {
        label: t('account'),
        key: 'account',
        icon: <RiUser6Line size={16} />,
      },
      {
        label: t('billing'),
        key: 'bill',
        icon: <RiBillLine size={16} />,
      },
      {
        label: t('subscription'),
        key: 'subscription',
        icon: <RiVipCrown2Line size={16} />,
      },
      {
        label: loading || available.toLocaleString(),
        key: 'credit',
        icon: <RiCopperDiamondLine size={16} />,
      },
      {
        label: t('language'),
        key: 'language',
        icon: <RiTranslate2 size={16} />,
        children: [...languageOptions],
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
    ].filter(
      (f) => !lg || (f.key !== 'language' && f.key !== 'credit'),
    ) as ItemType[];
  }, [available, lg, loading, t]);

  const handleClick: MenuProps['onClick'] = ({ key, keyPath }) => {
    if (keyPath.length > 1) {
      setLocale(keyPath[0] as Locale);
      return;
    }
    switch (key) {
      case 'account':
        router.push('/account');
        break;
      case 'logout':
        router.push('/login');
        break;
      case 'bill':
        router.push('/bill');
        break;
      case 'subscription':
        router.push('/subscription#plan');
        break;
      case 'credit':
        router.push('/subscription#credit');
        break;
    }
  };
  return (
    <Dropdown
      trigger={['click']}
      menu={{
        onClick: handleClick,
        items: menus,
      }}
      popupRender={(menu) => (
        <div className="bg-white rounded-lg shadow-lg min-w-64">
          <div className="p-4 space-y-2">
            <h3 className="font-bold m-0">{user?.nickname}</h3>
            <div className="text-xs text-black/50">{user?.email}</div>
            <div className="text-primary-500 text-xs">{plan_locale}</div>
          </div>
          <Divider type="horizontal" className="m-0" />
          {React.cloneElement(
            menu as React.ReactElement<{
              className: string;
            }>,
            {
              className:
                'shadow-none bg-transparent [&_[role="menuitem"]]:items-center',
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
          src={user?.avatar}
          gap={8}
          className="bg-primary-500 leading-none"
          size={32}
        >
          {getInitials(user?.nickname || 'Unknown')}
        </Avatar>
      </Button>
    </Dropdown>
  );
};

const Header: React.FC = () => {
  const { title } = useTitle();
  const { available, loading } = useCredit();
  const handleSider = () => {
    window.dispatchEvent(new CustomEvent('global:sider:open'));
  };
  return (
    <>
      <AntdHeader className="h-16 invisible" />
      <AntdHeader className="fixed top-0 right-0 left-0 lg:left-[240px] z-50 h-16 border-b border-slate-100 bg-white">
        <div className="h-full flex items-center justify-between pl-4 lg:pl-8">
          <div className="flex items-center gap-2">
            <div className="lg:hidden">
              <Button
                type="text"
                className="leading-none"
                size="small"
                icon={<RiMenuLine size={24} />}
                onClick={handleSider}
              />
            </div>
            <div className="text-sm font-bold">
              <span>{title}</span>
            </div>
          </div>
          <div className="flex h-full items-stretch">
            <div className="hidden lg:block">
              <Link className="block h-full" href="/subscription#credit">
                <Button
                  loading={loading}
                  type="text"
                  className="leading-none font-bold rounded-none h-full px-4"
                  icon={
                    <RiCopperDiamondFill
                      size={20}
                      className="text-yellow-500"
                    />
                  }
                >
                  {available.toLocaleString()}
                </Button>
              </Link>
            </div>
            <div className="hidden lg:block border-r w-0 h-full border-slate-100" />
            <div className="hidden lg:block">
              <LanguageSelector />
            </div>
            <div className="hidden lg:block border-r border-slate-100 h-full" />
            <AccountDropdown />
          </div>
        </div>
      </AntdHeader>
    </>
  );
};

export default Header;
