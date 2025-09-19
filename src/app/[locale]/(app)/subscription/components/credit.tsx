'use client';
import { Button, Card, Progress } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';

const Credit: React.FC = () => {
  const t = useTranslations('app.pages.subscription.credit');
  return (
    <Card>
      <div className="space-y-4">
        <div className="text-black/50">{t('title')}</div>
        <h2 className="text-3xl font-bold">1,234</h2>
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
