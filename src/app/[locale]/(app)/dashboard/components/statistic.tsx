'use client';
import { getUserStatistics } from '@/apis/statistic';
import { AntdSkeletonButton, AntdText, AntdTitle } from '@/components/antd';
import { Link } from '@/i18n/navigation';
import {
  RemixiconComponentType,
  RiArchive2Line,
  RiGlobalLine,
  RiMailOpenLine,
  RiMailSendLine,
} from '@remixicon/react';
import { useRequest } from 'ahooks';
import { Avatar, Card } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';

const StatisticItem: React.FC<{
  icon: RemixiconComponentType;
  value?: number;
  title: string;
  loading?: boolean;
  href: string;
}> = ({ icon, title, value, loading, href }) => {
  return (
    <Link
      href={href}
      className="block cursor-pointer h-auto border border-transparent rounded-sm leading-none lg:p-4 transition hover:bg-primary-500/5"
    >
      <div className="flex items-center gap-6">
        <Avatar
          size={48}
          shape="square"
          className="bg-transparent text-primary-500 border border-primary-50"
        >
          {React.createElement(icon, {
            size: 32,
          })}
        </Avatar>
        <div>
          <div>
            <AntdText type="secondary" className="text-xs">
              {title}
            </AntdText>
          </div>
          <div>
            {loading ? (
              <AntdSkeletonButton size="small" />
            ) : (
              <AntdTitle level={3} className="m-0">
                {(value || 0).toLocaleString()}
              </AntdTitle>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

const Statistic: React.FC = () => {
  const t = useTranslations('app.pages.dashboard.statistic');
  const { data, loading } = useRequest(async () => {
    return await getUserStatistics().then((res) => res.data);
  });
  return (
    <Card>
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-2 2xl:grid-cols-4 gap-4">
        <StatisticItem
          icon={RiMailOpenLine}
          title={t('inbox')}
          loading={loading}
          value={data?.email_claim_count}
          href="/inbox"
        />
        <StatisticItem
          icon={RiMailSendLine}
          title={t('outbox')}
          value={0}
          href="/outbox"
        />
        <StatisticItem
          icon={RiGlobalLine}
          title={t('domain')}
          loading={loading}
          value={data?.domain_count}
          href="/domain"
        />
        <StatisticItem
          icon={RiArchive2Line}
          title={t('archive')}
          loading={loading}
          value={data?.mailbox_count}
          href="/archive"
        />
      </div>
    </Card>
  );
};

export default Statistic;
