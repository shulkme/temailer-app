'use client';
import {
  AntdDateRangePicker,
  AntdForm,
  AntdFormItem,
  AntdInput,
} from '@/components/antd';
import { Title } from '@/providers/title';
import { RiSearchLine } from '@remixicon/react';
import { Button, Card, Space, Table } from 'antd';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('app.pages.archive');
  const [form] = AntdForm.useForm();
  return (
    <>
      <Title title={t('title')} />
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        <Card>
          <div className="flex items-center justify-between gap-2 mb-4 lg:mb-6">
            <div>
              <AntdForm form={form} layout="inline">
                <AntdFormItem name="order_id">
                  <AntdInput
                    allowClear
                    suffix={<RiSearchLine size={16} />}
                    placeholder={t('table.filters.search.placeholder')}
                  />
                </AntdFormItem>
                <AntdFormItem name="dataRange">
                  <AntdDateRangePicker />
                </AntdFormItem>
              </AntdForm>
            </div>
            <div>
              <Space size="middle">
                <Button type="primary">{t('table.actions.export')}</Button>
              </Space>
            </div>
          </div>
          <Table
            scroll={{
              x: 1200,
            }}
            columns={[
              {
                title: t('table.columns.email'),
              },
              {
                title: t('table.columns.remark'),
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
    </>
  );
}
