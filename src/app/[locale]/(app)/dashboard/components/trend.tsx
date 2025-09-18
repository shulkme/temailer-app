'use client';
import { AntdTitle } from '@/components/antd';
import { Link } from '@/i18n/navigation';
import { Card } from 'antd';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import React, { useMemo } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const Trend: React.FC = () => {
  const t = useTranslations('app.pages.dashboard.traffic');

  const data = useMemo(() => {
    return Array.from({ length: 30 })
      .map((_, i) => ({
        label: dayjs().subtract(i, 'days').format('DD/MM'),
        value: 0,
      }))
      .reverse();
  }, []);

  return (
    <Card>
      <div className="flex items-center justify-between gap-4 mb-6">
        <AntdTitle level={5} className="m-0">
          收信概况
        </AntdTitle>
        <div>
          <Link href={''}>{t('detail')}</Link>
        </div>
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

export default Trend;
