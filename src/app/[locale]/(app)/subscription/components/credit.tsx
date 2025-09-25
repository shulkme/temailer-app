'use client';
import { AntdSkeletonButton } from '@/components/antd';
import { useCredit } from '@/providers/credit';
import { useSubscription } from '@/providers/subscription';
import { Button, Card, Progress } from 'antd';
import { useTranslations } from 'next-intl';
import React, { useMemo } from 'react';

const Credit: React.FC = () => {
  const t = useTranslations('app.pages.subscription.credit');
  const { available, loading } = useCredit();
  const { subscription } = useSubscription();

  const percent = useMemo(() => {
    if (available > 0) {
      const total = subscription?.subscription_info.original_points || 1;
      return Math.max((available / total) * 100, 100);
    }
    return 0;
  }, [available, subscription?.subscription_info]);

  return (
    <Card>
      <div className="space-y-4">
        <div className="text-black/50">{t('title')}</div>
        {loading ? (
          <AntdSkeletonButton size="small" />
        ) : (
          <h2 className="text-3xl font-bold">{available.toLocaleString()}</h2>
        )}
        <div>
          <Progress
            percent={percent}
            strokeLinecap="butt"
            showInfo={false}
            status="normal"
          />
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
