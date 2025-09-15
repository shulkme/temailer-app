'use client';
import Navbar from '@/app/[locale]/components/navbar';
import { Title } from '@/providers/title';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function Layout({ children }: { children?: React.ReactNode }) {
  const t = useTranslations('app.pages.account');
  return (
    <>
      <Title title={t('title')} />
      <Navbar
        items={[
          {
            label: t('menus.profile'),
            key: 'account:profile',
            meta: {
              href: '/account/profile',
              group: '/account/profile',
            },
          },
          {
            label: t('menus.subscription'),
            key: 'account:subscription',
            meta: {
              href: '/account/subscription',
              group: '/account/subscription',
            },
          },
          {
            label: t('menus.notifications'),
            key: 'account:notifications',
            meta: {
              href: '/account/notifications',
              group: '/account/notifications',
            },
          },
        ]}
      />
      <div>{children}</div>
    </>
  );
}
