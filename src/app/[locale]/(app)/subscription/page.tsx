'use client';
import Credit from '@/app/[locale]/(app)/subscription/components/credit';
import Credits from '@/app/[locale]/(app)/subscription/components/credits';
import Plan from '@/app/[locale]/(app)/subscription/components/plan';
import Plans from '@/app/[locale]/(app)/subscription/components/plans';
import { Title } from '@/providers/title';
import { App } from 'antd';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function Page() {
  const t = useTranslations('app.pages.subscription');
  const g = useTranslations('global');
  const { message } = App.useApp();
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === 'PAYMENT_SUCCESS') {
        message.success(g('response.success'));
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);
  return (
    <>
      <Title title={t('title')} />
      <div className="p-4 lg:p-6">
        <div className="grid grid-cols-2 gap-4 lg:gap-6">
          <div className="col-span-2 lg:col-span-1">
            <Plan />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <Credit />
          </div>

          <div className="col-span-2">
            <Plans />
          </div>

          <div className="col-span-2">
            <Credits />
          </div>
        </div>
      </div>
    </>
  );
}
