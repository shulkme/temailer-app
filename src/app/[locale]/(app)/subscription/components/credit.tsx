'use client';
import { AntdSkeletonButton } from '@/components/antd';
import { useCredit } from '@/providers/credit';
import { Button, Card, Progress } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';

const Credit: React.FC = () => {
  const t = useTranslations('app.pages.subscription.credit');
  const { available, loading } = useCredit();
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
          <Progress percent={50} strokeLinecap="butt" showInfo={false} />
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
