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
import { Alert, Button, Card, Select, Space, Table } from 'antd';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function Page() {
  const t = useTranslations('app.pages.outbox');
  const [form] = AntdForm.useForm();
  const [createOpen, setCreateOpen] = useState(false);
  return (
    <>
      <Title title={t('title')} />
      <Alert
        showIcon
        banner
        type="info"
        message={t.rich('alert.message', {
          link: (chunks) => (
            <a target="_blank" href={process.env.NEXT_PUBLIC_SUPPORT_TELEGRAM}>
              {chunks}
            </a>
          ),
        })}
      />
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        <SliderScroller
          navs={{
            size: 'small',
          }}
          classNames={{
            scroller: 'gap-4 lg:gap-6',
          }}
        >
          <StatisticCard title={t('statistics.totalRequest.label')} value={0} />
          <StatisticCard title={t('statistics.sendSuccess.label')} value={0} />
          <StatisticCard
            title={t('statistics.successRate.label')}
            value={0}
            suffix="%"
          />
          <StatisticCard title={t('statistics.sendFail.label')} value={0} />
          <StatisticCard
            title={t('statistics.failureRate.label')}
            value={0}
            suffix="%"
          />
          <StatisticCard
            title={t('statistics.accountStatus.label')}
            value={t('statistics.accountStatus.options.active')}
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
                  <Select
                    style={{ width: 220 }}
                    placeholder={t('table.filters.status.placeholder')}
                  />
                </AntdFormItem>
                <AntdFormItem name="dataRange">
                  <AntdDateRangePicker />
                </AntdFormItem>
                <AntdFormItem name="order_id">
                  <AntdInput
                    allowClear
                    suffix={<RiSearchLine size={16} />}
                    placeholder={t('table.filters.search.placeholder')}
                  />
                </AntdFormItem>
              </AntdForm>
            </div>
            <div>
              <Space size="middle">
                <Button
                  type="primary"
                  onClick={() => setCreateOpen(true)}
                  disabled
                >
                  {t('table.actions.create')}
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
                title: t('table.columns.name'),
              },
              {
                title: t('table.columns.progress'),
              },
              {
                title: t('table.columns.statistic'),
              },
              {
                title: t('table.columns.createdTime'),
              },
              {
                title: t('table.columns.operate'),
              },
            ]}
          />
        </Card>
      </div>
      <CreateDrawer open={createOpen} setOpen={setCreateOpen} />
    </>
  );
}
