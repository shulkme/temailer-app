'use client';
import { AntdParagraph, AntdTitle } from '@/components/antd';
import { Button, Card } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';

const Credits: React.FC = () => {
  const t = useTranslations('app.pages.subscription.credits');
  return (
    <Card id="credit">
      <AntdTitle level={5} className="mb-6">
        {t('title')}
      </AntdTitle>
      <AntdParagraph type="secondary">{t('subtitle')}</AntdParagraph>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-6">
        <div className="col-span-1">
          <div className="w-full min-h-full border border-slate-200 p-4 lg:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-3xl">10,000</span>
            </div>
            <div className="space-x-1">
              <span className="font-medium text-lg">$10</span>
              <span className="text-xs text-black/50">
                /{t('template.price.suffix')}
              </span>
            </div>
            <div className="text-sm">
              {t('template.tips')} <strong>$0.001</strong>
            </div>
            <div>
              <Button block color="primary" variant="outlined">
                {t('template.action')}
              </Button>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="w-full min-h-full border border-slate-200 p-4 lg:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-3xl">50,000</span>
            </div>
            <div className="space-x-1">
              <span className="font-medium text-lg">$20</span>
              <span className="text-xs text-black/50">
                /{t('template.price.suffix')}
              </span>
            </div>
            <div className="text-sm">
              {t('template.tips')} <strong>$0.0004</strong>
            </div>
            <div>
              <Button block color="primary" variant="outlined">
                {t('template.action')}
              </Button>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="w-full min-h-full border border-slate-200 p-4 lg:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-3xl">1,000,000</span>
            </div>
            <div className="space-x-1">
              <span className="font-medium text-lg">$50</span>
              <span className="text-xs text-black/50">
                /{t('template.price.suffix')}
              </span>
            </div>
            <div className="text-sm">
              {t('template.tips')} <strong>$0.00005</strong>
            </div>
            <div>
              <Button block color="primary" variant="outlined">
                {t('template.action')}
              </Button>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="w-full min-h-full border border-slate-200 p-4 lg:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-3xl">10,000,000</span>
            </div>
            <div className="space-x-1">
              <span className="font-medium text-lg">$100</span>
              <span className="text-xs text-black/50">
                /{t('template.price.suffix')}
              </span>
            </div>
            <div className="text-sm">
              {t('template.tips')} <strong>$0.00001</strong>
            </div>
            <div>
              <Button block color="primary" variant="outlined">
                {t('template.action')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Credits;
