'use client';
import { RiPinDistanceLine, RiWindowLine } from '@remixicon/react';
import { Button, Card, Descriptions } from 'antd';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('app.pages.account.subscription');
  return (
    <>
      <div className="space-y-6 p-8">
        <Card>
          <Descriptions
            title={
              <div className="flex items-center gap-4">
                <RiPinDistanceLine size={24} />
                <span>{t('plans.residential')}</span>
              </div>
            }
            extra={
              <>
                <Button type="primary">{t('actions.subscription')}</Button>
              </>
            }
            items={[
              {
                label: t('detail.plan-name'),
                children: '--',
              },
              {
                label: t('detail.unit-price'),
                children: '--',
              },
              {
                label: t('detail.amount'),
                children: '--',
              },
              {
                label: t('detail.start-date'),
                children: '--',
              },
              {
                label: t('detail.last-time'),
                children: '--',
              },
              {
                label: t('detail.next-time'),
                children: '--',
              },
            ]}
          />
        </Card>
        <Card>
          <Descriptions
            title={
              <div className="flex items-center gap-4">
                <RiWindowLine size={24} />
                <span>{t('plans.serp-api')}</span>
              </div>
            }
            extra={
              <>
                <Button type="primary">{t('actions.subscription')}</Button>
              </>
            }
            items={[
              {
                label: t('detail.plan-name'),
                children: '--',
              },
              {
                label: t('detail.unit-price'),
                children: '--',
              },
              {
                label: t('detail.amount'),
                children: '--',
              },
              {
                label: t('detail.start-date'),
                children: '--',
              },
              {
                label: t('detail.last-time'),
                children: '--',
              },
              {
                label: t('detail.next-time'),
                children: '--',
              },
            ]}
          />
        </Card>
      </div>
    </>
  );
}
