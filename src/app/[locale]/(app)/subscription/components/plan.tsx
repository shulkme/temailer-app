'use client';
import { AntdSkeletonButton } from '@/components/antd';
import { useSubscription } from '@/providers/subscription';
import { Button, Card } from 'antd';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import React from 'react';

const Plan: React.FC = () => {
  const t = useTranslations('app.pages.subscription.plan');
  const { plan_locale, subscription, loading } = useSubscription();
  return (
    <Card>
      <div className="space-y-4">
        <div className="text-black/50">{t('title')}</div>
        {loading ? (
          <AntdSkeletonButton size="small" />
        ) : (
          <h2 className="text-3xl font-bold">{plan_locale?.fullName}</h2>
        )}

        <div>
          {t('expiredTime')}:{' '}
          {dayjs(subscription?.subscription_info.expire_at).format('LLL')}
        </div>
        <div>
          <Button
            className="px-4"
            size="small"
            color="primary"
            variant="outlined"
            href="#plan"
          >
            {t('actions.upgrade')}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Plan;
