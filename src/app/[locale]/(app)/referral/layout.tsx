'use client';
import Navbar from '@/app/[locale]/components/navbar';
import { Title } from '@/providers/title';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function Layout({ children }: { children?: React.ReactNode }) {
  const t = useTranslations('app.pages.referral');
  return (
    <>
      <Title title={t('title')} />
      <Navbar
        items={[
          {
            label: t('menus.program'),
            key: 'referral:program',
            meta: {
              href: '/referral/program',
              group: '/referral/program',
            },
          },
          {
            label: t('menus.details'),
            key: 'referral:details',
            meta: {
              href: '/referral/details',
              group: '/referral/details',
            },
          },
          {
            label: t('menus.record'),
            key: 'referral:conversion',
            meta: {
              href: '/referral/conversion',
              group: '/referral/conversion',
            },
          },
        ]}
      />
      <div>{children}</div>
    </>
  );
}
