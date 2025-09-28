'use client';
import { getCreditBalance } from '@/apis/credit';
import { AntdSkeletonButton } from '@/components/antd';
import { useSubscription } from '@/providers/subscription';
import { useRequest } from 'ahooks';
import { Button, Card } from 'antd';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';

const Credit: React.FC = () => {
  const t = useTranslations('app.pages.subscription.credit');
  const { subscription } = useSubscription();
  const { data, loading, refresh } = useRequest(async () => {
    return await getCreditBalance().then((res) => res.data);
  });

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === 'PAYMENT_SUCCESS') {
        refresh();
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  return (
    <Card>
      <div className="space-y-4">
        <div className="text-black/50">{t('title')}</div>
        {loading ? (
          <AntdSkeletonButton size="small" />
        ) : (
          <h2 className="text-3xl font-bold">
            {(data?.total_credits || 0).toLocaleString()}
          </h2>
        )}
        <div>
          {t('resetTime')}:{' '}
          {dayjs(subscription?.subscription_info?.expire_at).format(
            'YYYY-MM-DD HH:mm',
          )}{' '}
          {t('permanentCredits', {
            num: data?.permanent_credits || 0,
          })}
        </div>
        <div>
          <Button
            className="px-4"
            size="small"
            color="primary"
            variant="outlined"
            href="#credit"
          >
            {t('actions.recharge')}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Credit;
