'use client';
import { getMyDomainList } from '@/apis/domain';
import { DomainRecord } from '@/apis/domain/types';
import CreateDrawer from '@/app/[locale]/(app)/domain/components/create-drawer';
import DomainList from '@/app/[locale]/(app)/domain/components/domian-list';
import { DomainProvider } from '@/app/[locale]/(app)/domain/context';
import {
  AntdDateRangePicker,
  AntdForm,
  AntdFormItem,
  AntdInput,
} from '@/components/antd';
import { Title } from '@/providers/title';
import { RiSearchLine } from '@remixicon/react';
import { useAntdTable } from 'ahooks';
import { Alert, Button, Card, Select, Space, Table } from 'antd';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('app.pages.domain');
  const [form] = AntdForm.useForm();
  const { tableProps } = useAntdTable(async ({ current, pageSize }, params) => {
    return await getMyDomainList({
      page: current,
      size: pageSize,
      ...params,
    }).then((res) => ({
      list: res.data.items,
      total: res.data.total,
    }));
  });

  const handleCreate = () => {
    window.dispatchEvent(new CustomEvent('domain:create'));
  };

  return (
    <DomainProvider>
      <Title title={t('title')} />
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        <Alert showIcon message={t('alert.message')} />
        <DomainList />
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
                <Button type="primary" onClick={() => handleCreate()}>
                  {t('table.actions.buy')}
                </Button>
              </Space>
            </div>
          </div>
          <Table<DomainRecord>
            scroll={{
              x: 1200,
            }}
            columns={[
              {
                title: t('table.columns.domain'),
                dataIndex: 'name',
              },
              {
                title: t('table.columns.status'),
                dataIndex: 'status',
              },
              {
                title: t('table.columns.remark'),
                dataIndex: 'remark',
              },
              {
                title: t('table.columns.registerTime'),
                dataIndex: 'register_time',
              },
              {
                title: t('table.columns.expiredTime'),
                dataIndex: 'expired_time',
              },
              {
                title: t('table.columns.operate'),
              },
            ]}
            {...tableProps}
          />
        </Card>
      </div>
      <CreateDrawer />
    </DomainProvider>
  );
}
