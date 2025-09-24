'use client';
import { getApiKeyList, refreshApiKey } from '@/apis/api_key';
import { getApiUsageStatistics } from '@/apis/statistic';
import { UsageStatisticRecord } from '@/apis/statistic/types';
import { AntdLink, AntdText, AntdTitle, AntdTooltip } from '@/components/antd';
import { useIdentity } from '@/providers/identity';
import { Title } from '@/providers/title';
import { RiResetRightLine } from '@remixicon/react';
import { useRequest } from 'ahooks';
import { Alert, App, Button, Card, Descriptions, Spin } from 'antd';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function Page() {
  const t = useTranslations('app.pages.interface');
  const g = useTranslations('global');
  const { user } = useIdentity();
  const { message } = App.useApp();
  const [data, setData] = useState<UsageStatisticRecord['daily_records']>(
    Array.from({ length: 30 }).map((_, i) => ({
      date: dayjs().subtract(i, 'days').format('YYYY-MM-DD'),
      points: 0,
    })),
  );

  const { loading } = useRequest(
    async () => {
      return await getApiUsageStatistics(30);
    },
    {
      onSuccess: (res) => {
        if (res.data.daily_records.length > 0) {
          setData(res.data.daily_records);
        }
      },
    },
  );

  const { data: API, refresh } = useRequest(async () => {
    return await getApiKeyList().then((res) => res.data.items?.[0]);
  });

  const { run: doRefresh, loading: refreshing } = useRequest(
    async () => {
      if (API) {
        return await refreshApiKey(API.api_key);
      }
      return null;
    },
    {
      manual: true,
      onSuccess: () => {
        refresh();
        message.success(g('response.success'));
      },
      onError: (e) => {
        message.error(e.message);
      },
    },
  );

  return (
    <>
      <Title title={t('title')} />
      <div className="max-w-[1600px] mx-auto p-4 lg:p-6 space-y-4 lg:space-y-6">
        <Alert
          showIcon
          type="info"
          message={t('alert.message')}
          action={<AntdLink>{t('alert.extra')}</AntdLink>}
        />
        <Card>
          <Descriptions
            column={1}
            items={[
              {
                label: t('info.apiId'),
                children: user?.id,
              },
              {
                label: t('info.apiKey'),
                children: (
                  <div className="flex flex-wrap gap-2 items-center">
                    <AntdText copyable>{API?.api_key || '--'}</AntdText>
                    <AntdTooltip title={t('info.refresh')}>
                      <Button
                        className="leading-none h-auto"
                        size="small"
                        type="link"
                        loading={refreshing}
                        onClick={doRefresh}
                        icon={<RiResetRightLine size={16} />}
                      />
                    </AntdTooltip>
                  </div>
                ),
              },
              {
                label: t('info.updatedTime'),
                children: dayjs(API?.updated_time || API?.created_time).format(
                  'LLL',
                ),
              },
            ]}
          />
        </Card>

        <Card>
          <AntdTitle level={5} className="mb-6">
            {t('overview.title')}
          </AntdTitle>
          <div className="w-full h-80 relative">
            <ResponsiveContainer>
              <AreaChart
                accessibilityLayer={false}
                data={data}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="chart-gradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="var(--ant-color-primary)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--ant-color-primary)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  tick={{
                    strokeWidth: 1,
                    fontSize: 12,
                  }}
                  axisLine={false}
                  tickMargin={10}
                />
                <YAxis
                  // width={40}
                  axisLine={false}
                  // mirror={true}
                  tick={{
                    strokeWidth: 1,
                    fontSize: 12,
                    textAnchor: 'start',
                    x: 0,
                  }}
                  tickMargin={20}
                />
                <CartesianGrid
                  horizontal={true}
                  vertical={false}
                  strokeDasharray="5 5"
                  strokeWidth={1}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255,255,255,.85)',
                    border: 0,
                    boxShadow: 'var(--ant-box-shadow)',
                    backdropFilter: 'blur(2px)',
                    borderRadius: 'var(--ant-border-radius-lg)',
                  }}
                />
                <Area
                  dataKey="points"
                  stroke="var(--ant-color-primary)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#chart-gradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
            {loading && (
              <div className="absolute inset-0 z-10 flex flex-col justify-center items-center bg-white/50">
                <Spin />
              </div>
            )}
          </div>
        </Card>
      </div>
    </>
  );
}
