'use client';
import { AntdLink, AntdTitle } from '@/components/antd';
import { RiLinksLine } from '@remixicon/react';
import { Button, Space } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';

const Hero: React.FC = () => {
  const t = useTranslations('app.pages.referral.program.hero');
  return (
    <>
      <div className="bg-blue-500/5 border border-blue-100 rounded-sm p-8 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 h-full w-1/3 bg-linear-[190deg] from-blue-200/50 to-transparent to-90% -skew-x-45 translate-x-1/2" />
        <div className="relative z-10">
          <AntdTitle level={5} className="m-0 mb-2">
            {t('subtitle')}
          </AntdTitle>
          <AntdTitle level={2} className="m-0 mb-6">
            {t.rich('title', {
              percent: () => <span className="text-orange-500">10%</span>,
            })}
          </AntdTitle>
          <div className="mb-6">
            <Space size="middle">
              <Button type="primary">{t('actions.recommend')}</Button>
              <Button>{t('actions.description')}</Button>
            </Space>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <RiLinksLine size={16} />
            <span className="font-medium">{t('link')}</span>
            <AntdLink copyable>
              https://www.example.com/signup?inviteCode=ABCDEF
            </AntdLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
