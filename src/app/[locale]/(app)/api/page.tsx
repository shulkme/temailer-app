'use client';
import { AntdLink, AntdText, AntdTitle, AntdTooltip } from '@/components/antd';
import { Title } from '@/providers/title';
import { RiResetRightLine } from '@remixicon/react';
import { Alert, Card, Descriptions } from 'antd';
import dayjs from 'dayjs';
import { random } from 'radash';
import { useMemo } from 'react';
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
  const data = useMemo(() => {
    return Array.from({ length: 30 })
      .map((_, i) => ({
        label: dayjs().subtract(i, 'days').format('YYYY-MM-DD'),
        value: random(0, 100),
      }))
      .reverse();
  }, []);
  return (
    <>
      <Title title={'API'} />
      <div className="max-w-[1600px] mx-auto p-4 lg:p-6 space-y-4 lg:space-y-6">
        <Alert
          showIcon
          type="info"
          message={
            '通过API在您的应用程序中集成收发信功能，请妥善保管您的密钥。'
          }
        />
        <Card>
          <Descriptions
            column={1}
            items={[
              {
                label: 'API ID',
                children: '12345678',
              },
              {
                label: 'API KEY',
                children: (
                  <div className="flex flex-wrap gap-2 items-center">
                    <AntdText copyable>
                      Em10ZWFtMjAxNkBnbWFpbC5jb20xNzU2Mjk2MDc3NzY0OTY1
                    </AntdText>
                    <AntdTooltip title={'刷新API KEY'}>
                      <AntdLink>
                        <RiResetRightLine size={16} />
                      </AntdLink>
                    </AntdTooltip>
                  </div>
                ),
              },
              {
                label: '更新时间',
                children: dayjs().format('LLL'),
              },
            ]}
          />
        </Card>

        <Card>
          <AntdTitle level={5} className="mb-6">
            API请求概况
          </AntdTitle>
          <div className="w-full h-80">
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
      </div>
    </>
  );
}
