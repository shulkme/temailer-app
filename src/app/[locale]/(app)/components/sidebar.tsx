'use client';
import NavMenu from '@/app/[locale]/components/nav-menu';
import { AntdSider } from '@/components/antd';
import { Link, usePathname } from '@/i18n/navigation';
import Logo from '@/icons/logo';
import {
  RiArchive2Line,
  RiBarChart2Line,
  RiBillLine,
  RiExternalLinkLine,
  RiFlashlightLine,
  RiGlobalLine,
  RiMailOpenLine,
  RiMailSendLine,
  RiQuestionLine,
  RiTelegram2Line,
  RiUser6Line,
  RiVipCrown2Line,
} from '@remixicon/react';
import { ConfigProvider, Drawer } from 'antd';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

const Inner = () => {
  const t = useTranslations('app.global.sidebar');
  return (
    <>
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
        <div className="h-full flex flex-col">
          <div className="flex-none w-full h-16 flex items-center px-6">
            <Link className="flex gap-3 items-center" href="/dashboard">
              <Logo width={24} height={24} />
              <h1 className="text-xl font-bold text-white leading-none">
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
                  label: t('menus.email'),
                  key: 'email',
                  type: 'group',
                  children: [
                    {
                      label: t('menus.inbox'),
                      key: 'email:inbox',
                      icon: <RiMailOpenLine size={18} />,
                      meta: {
                        href: '/inbox',
                        group: '/inbox',
                      },
                    },
                    {
                      label: t('menus.outbox'),
                      key: 'email:outbox',
                      icon: <RiMailSendLine size={18} />,
                      meta: {
                        href: '/outbox',
                        group: '/outbox',
                      },
                    },
                    {
                      label: t('menus.domain'),
                      key: 'email:domain',
                      icon: <RiGlobalLine size={18} />,
                      meta: {
                        href: '/domain',
                        group: '/domain',
                      },
                    },
                    {
                      label: t('menus.archive'),
                      key: 'email:archive',
                      icon: <RiArchive2Line size={18} />,
                      meta: {
                        href: '/archive',
                        group: '/archive',
                      },
                    },
                    {
                      label: t('menus.api'),
                      key: 'email:api',
                      icon: <RiFlashlightLine size={18} />,
                      meta: {
                        href: '/interface',
                        group: '/interface',
                      },
                    },
                  ],
                },
                {
                  label: t('menus.my'),
                  key: 'my',
                  type: 'group',
                  children: [
                    {
                      label: t('menus.account'),
                      key: 'my:account',
                      icon: <RiUser6Line size={18} />,
                      meta: {
                        href: '/account',
                        group: '/account',
                      },
                    },
                    {
                      label: t('menus.subscription'),
                      key: 'my:subscription',
                      icon: <RiVipCrown2Line size={18} />,
                      meta: {
                        href: '/subscription',
                        group: '/subscription',
                      },
                    },
                    {
                      label: t('menus.bill'),
                      key: 'my:bill',
                      icon: <RiBillLine size={18} />,
                      meta: {
                        href: '/bill',
                        group: '/bill',
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
                      label: t('menus.faq'),
                      key: 'help:faq',
                      icon: <RiQuestionLine size={18} />,
                      extra: <RiExternalLinkLine size={14} />,
                      meta: {
                        href: process.env.NEXT_PUBLIC_DOC_URL!,
                        target: '_blank',
                      },
                    },
                    {
                      label: 'Telegram',
                      key: 'help:telegram',
                      icon: <RiTelegram2Line size={18} />,
                      extra: <RiExternalLinkLine size={14} />,
                      meta: {
                        href: process.env.NEXT_PUBLIC_SUPPORT_TELEGRAM!,
                        target: '_blank',
                      },
                    },
                  ],
                },
              ]}
            />
          </div>
        </div>
      </ConfigProvider>
    </>
  );
};

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handler = () => {
      setOpen(true);
    };
    window.addEventListener('global:sider:open', handler);

    return () => {
      window.removeEventListener('global:sider:open', handler);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <>
      <AntdSider
        collapsedWidth={0}
        width={240}
        collapsible
        breakpoint="lg"
        trigger={null}
        className="invisible hidden lg:block"
      />
      <AntdSider
        //theme="dark"
        collapsedWidth={0}
        width={240}
        collapsible
        breakpoint="lg"
        trigger={null}
        className="fixed top-0 left-0 bottom-0 z-50 bg-sidebar hidden lg:block"
      >
        <Inner />
      </AntdSider>

      <Drawer
        width="320px"
        placement="left"
        open={open}
        onClose={() => setOpen(false)}
        closeIcon={null}
        styles={{
          body: {
            padding: 0,
          },
        }}
        classNames={{
          content: 'bg-sidebar',
        }}
      >
        <Inner />
      </Drawer>
    </>
  );
};

export default Sidebar;
