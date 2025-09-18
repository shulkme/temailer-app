'use client';
import { AntdTitle } from '@/components/antd';
import { Link } from '@/i18n/navigation';
import { Card, List } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';

const Task: React.FC = () => {
  const t = useTranslations('app.pages.dashboard.task');
  return (
    <Card>
      <div className="flex items-center justify-between gap-4 mb-4">
        <AntdTitle level={5} className="m-0">
          {t('title')}
        </AntdTitle>
        <div>
          <Link href={''}>{t('detail')}</Link>
        </div>
      </div>
      <List />
    </Card>
  );
};

export default Task;
