'use client';
import CreateDrawer from '@/app/[locale]/(app)/outbox/components/create-drawer';
import StatisticCard from '@/app/[locale]/(app)/outbox/components/statistic-card';
import {
  AntdDateRangePicker,
  AntdForm,
  AntdFormItem,
  AntdInput,
} from '@/components/antd';
import SliderScroller from '@/components/slider-scroller';
import { Title } from '@/providers/title';
import { RiSearchLine } from '@remixicon/react';
import { Button, Card, Select, Space, Table } from 'antd';
import { useState } from 'react';

export default function Page() {
  const [form] = AntdForm.useForm();
  const [createOpen, setCreateOpen] = useState(false);
  return (
    <>
      <Title title={'发信'} />
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        <SliderScroller
          navs={{
            size: 'small',
          }}
          classNames={{
            scroller: 'gap-4 lg:gap-6',
          }}
        >
          <StatisticCard title={'发送总量'} value={1234} />
          <StatisticCard title={'发送成功'} value={1234} />
          <StatisticCard title={'送达率'} value={100} suffix="%" />
          <StatisticCard title={'发送失败'} value={0} />
          <StatisticCard title={'失败率'} value={0} suffix="%" />
          <StatisticCard
            title={'账户状态'}
            value={'正常'}
            valueStyle={{
              color: 'var(--color-green-600)',
            }}
          />
        </SliderScroller>
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 lg:mb-6">
            <div>
              <AntdForm form={form} layout="inline">
                <AntdFormItem name="type">
                  <Select style={{ width: 220 }} placeholder={'任务状态'} />
                </AntdFormItem>
                <AntdFormItem name="dataRange">
                  <AntdDateRangePicker />
                </AntdFormItem>
                <AntdFormItem name="order_id">
                  <AntdInput
                    allowClear
                    suffix={<RiSearchLine size={16} />}
                    placeholder={'搜索任务'}
                  />
                </AntdFormItem>
              </AntdForm>
            </div>
            <div>
              <Space size="middle">
                <Button type="primary" onClick={() => setCreateOpen(true)}>
                  新建任务
                </Button>
              </Space>
            </div>
          </div>
          <Table
            scroll={{
              x: 1200,
            }}
            columns={[
              {
                title: '任务名称',
              },
              {
                title: '进度',
              },
              {
                title: '统计',
              },
              {
                title: '创建时间',
              },
              {
                title: '操作',
              },
            ]}
          />
        </Card>
      </div>
      <CreateDrawer open={createOpen} setOpen={setCreateOpen} />
    </>
  );
}
