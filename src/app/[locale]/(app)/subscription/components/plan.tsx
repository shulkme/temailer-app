'use client';
import { Button, Card } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';

const Plan: React.FC = () => {
  const t = useTranslations('app.pages.subscription.plan');
  return (
    <Card>
      <div className="space-y-4">
        <div className="text-black/50">{t('title')}</div>
        <h2 className="text-3xl font-bold">高级版</h2>
        <div>{t('expiredTime')}: 2025-10-01</div>
        <div>
          <Button
            className="px-4"
            size="small"
            color="primary"
            variant="outlined"
            href="#package"
          >
            {t('actions.upgrade')}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Plan;
