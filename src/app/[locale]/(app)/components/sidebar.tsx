'use client';
import NavMenu from '@/app/[locale]/components/nav-menu';
import { AntdSider } from '@/components/antd';
import { Link } from '@/i18n/navigation';
import Logo from '@/icons/logo';
import {
  RiBarChart2Line,
  RiExternalLinkLine,
  RiFileList3Line,
  RiGiftLine,
  RiGlobalLine,
  RiMailOpenLine,
  RiMailSendLine,
  RiQuestionLine,
  RiServiceLine,
  RiUser6Line,
  RiWalletLine,
} from '@remixicon/react';
import { ConfigProvider } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';

const Sidebar: React.FC = () => {
  const t = useTranslations('app.global.sidebar');
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemHeight: 40,
            itemMarginInline: 16,
            groupTitleFontSize: 12,
            iconMarginInlineEnd: 12,
            darkItemColor: '#fff',
            darkItemHoverBg: 'rgba(255,255,255,0.1)',
          },
        },
      }}
    >
      <AntdSider width={240} trigger={null} className="invisible" />
      <AntdSider
        theme="dark"
        width={240}
        trigger={null}
        className="fixed top-0 left-0 bottom-0 z-50"
      >
        <div className="h-full flex flex-col">
          <div className="flex-none w-full h-16 flex items-center px-6">
            <Link className="flex gap-3 items-center" href="/dashboard">
              <Logo width={24} height={24} />
              <h1 className="text-xl font-bold text-white">
                {process.env.NEXT_PUBLIC_APP_NAME}
              </h1>
            </Link>
          </div>
          <div className="flex-auto overflow-auto">
            <NavMenu
              className="[&_.ant-menu-item-group-title]:pl-8"
              selectable={false}
              inlineIndent={16}
              theme="dark"
              mode="inline"
              items={[
                {
                  label: t('menus.dashboard'),
                  key: 'dashboard',
                  icon: <RiBarChart2Line size={18} />,
                  meta: {
                    href: '/dashboard',
                    group: '/dashboard',
                  },
                },
                {
                  label: '邮箱',
                  key: 'proxies',
                  type: 'group',
                  children: [
                    {
                      label: '收信',
                      key: 'proxies:static-isp',
                      icon: <RiMailOpenLine size={18} />,
                      meta: {
                        href: '/proxies/static-isp/pricing',
                        group: '/proxies/static-isp',
                      },
                    },
                    {
                      label: '发信',
                      key: 'proxies:datacenter',
                      icon: <RiMailSendLine size={18} />,
                      meta: {
                        href: '/proxies/datacenter/pricing',
                        group: '/proxies/datacenter',
                      },
                    },
                    {
                      label: '域名',
                      key: 'proxies:residential',
                      icon: <RiGlobalLine size={18} />,
                      meta: {
                        href: '/proxies/residential/pricing',
                        group: '/proxies/residential',
                      },
                    },
                  ],
                },
                {
                  label: t('menus.menu'),
                  key: 'menu',
                  type: 'group',
                  children: [
                    {
                      label: t('menus.account'),
                      key: 'menu:account',
                      icon: <RiUser6Line size={18} />,
                      meta: {
                        href: '/account/profile',
                        group: '/account',
                      },
                    },
                    {
                      label: t('menus.wallet'),
                      key: 'menu:wallet',
                      icon: <RiWalletLine size={18} />,
                      meta: {
                        href: '/wallet/recharge',
                        group: '/wallet',
                      },
                    },
                    {
                      label: t('menus.referral'),
                      key: 'menu:referral',
                      icon: <RiGiftLine size={18} />,
                      meta: {
                        href: '/referral/program',
                        group: '/referral',
                      },
                    },
                  ],
                },
                {
                  label: t('menus.help'),
                  key: 'help',
                  type: 'group',
                  children: [
                    {
                      label: t('menus.partners'),
                      key: 'help:partners',
                      icon: <RiServiceLine size={18} />,
                      meta: {
                        href: '/partners',
                        group: '/partners',
                      },
                    },
                    {
                      label: t('menus.documentation'),
                      key: 'help:documentation',
                      icon: <RiFileList3Line size={18} />,
                      extra: <RiExternalLinkLine size={14} />,
                      meta: {
                        href: 'https://documentation',
                        target: '_blank',
                      },
                    },
                    {
                      label: t('menus.faq'),
                      key: 'help:faq',
                      icon: <RiQuestionLine size={18} />,
                      extra: <RiExternalLinkLine size={14} />,
                      meta: {
                        href: 'https://xxxx',
                        target: '_blank',
                      },
                    },
                  ],
                },
              ]}
            />
          </div>
        </div>
      </AntdSider>
    </ConfigProvider>
  );
};

export default Sidebar;
