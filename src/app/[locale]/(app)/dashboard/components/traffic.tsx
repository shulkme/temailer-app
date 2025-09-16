'use client';
import { AntdRadioGroup, AntdTitle } from '@/components/antd';
import { Link } from '@/i18n/navigation';
import { Card } from 'antd';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import React, { useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const Traffic: React.FC = () => {
  const t = useTranslations('app.pages.dashboard.traffic');
  const [duration, setDuration] = useState(7);

  const data = useMemo(() => {
    return Array.from({ length: duration })
      .map((_, i) => ({
        label: dayjs().subtract(i, 'days').format('YYYY-MM-DD'),
        value: 0,
      }))
      .reverse();
  }, [duration]);

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
      <div className="mb-8">
        <AntdRadioGroup
          value={duration}
          optionType="button"
          options={[
            {
              label: t('filters.duration.options.7'),
              value: 7,
            },
            {
              label: t('filters.duration.options.30'),
              value: 30,
            },
            {
              label: t('filters.duration.options.90'),
              value: 90,
            },
          ]}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>
      <div className="w-full h-80">
        <ResponsiveContainer>
          <AreaChart
            accessibilityLayer={false}
            data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
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
              dataKey="label"
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
              dataKey="value"
              stroke="var(--ant-color-primary)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#chart-gradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default Traffic;
