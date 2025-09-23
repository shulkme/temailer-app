'use client';
import { AntdTitle } from '@/components/antd';
import { RiRefreshLine } from '@remixicon/react';
import { Button, Card, List, Space } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';

const MessageList: React.FC = () => {
  const t = useTranslations('app.pages.inbox');
  const handlePreview = () => {
    window.dispatchEvent(new CustomEvent('email:preview'));
  };
  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 lg:mb-6">
        <div>
          <AntdTitle level={5} className="m-0">
            {t('messages.title')}
          </AntdTitle>
        </div>
        <div>
          <Space size="middle">
            <span className="text-black/50">
              {t('messages.countdown', {
                num: 10,
              })}
            </span>
            <Button
              className="leading-none"
              icon={<RiRefreshLine size={16} />}
              onClick={handlePreview}
            >
              {t('messages.actions.refresh')}
            </Button>
          </Space>
        </div>
      </div>
      <List />
    </Card>
  );
};

export default MessageList;
