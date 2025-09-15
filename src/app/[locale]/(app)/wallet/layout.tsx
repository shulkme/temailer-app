'use client';
import Navbar from '@/app/[locale]/components/navbar';
import { Title } from '@/providers/title';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function Layout({ children }: { children?: React.ReactNode }) {
  const t = useTranslations('app.pages.wallet');
  return (
    <>
      <Title title={t('title')} />
      <Navbar
        items={[
          {
            label: t('menus.recharge'),
            key: 'wallet:recharge',
            meta: {
              href: '/wallet/recharge',
              group: '/wallet/recharge',
            },
          },
          {
            label: t('menus.transactions'),
            key: 'wallet:transactions',
            meta: {
              href: '/wallet/transactions',
              group: '/wallet/transactions',
            },
          },
          {
            label: t('menus.billing'),
            key: 'wallet:billing',
            meta: {
              href: '/wallet/billing',
              group: '/wallet/billing',
            },
          },
        ]}
      />
      <div>{children}</div>
    </>
  );
}
