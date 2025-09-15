'use client';
import {
  AntdDateRangePicker,
  AntdForm,
  AntdFormItem,
  AntdInput,
} from '@/components/antd';
import { RiSearchLine } from '@remixicon/react';
import { Card, Table } from 'antd';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('app.pages.referral.details');
  return (
    <div className="p-8">
      <Card>
        <div className="mb-6">
          <AntdForm layout="inline">
            <AntdFormItem>
              <AntdInput
                placeholder={t('table.filters.email.placeholder')}
                suffix={<RiSearchLine size={16} />}
              />
            </AntdFormItem>
            <AntdFormItem>
              <AntdDateRangePicker />
            </AntdFormItem>
          </AntdForm>
        </div>
        <div>
          <Table
            scroll={{
              x: 1200,
            }}
            columns={[
              {
                title: t('table.columns.username'),
              },
              {
                title: t('table.columns.email'),
              },
              {
                title: t('table.columns.order-volume'),
              },
              {
                title: t('table.columns.order-amount'),
              },
              {
                title: t('table.columns.commission'),
              },
              {
                title: t('table.columns.credit'),
              },
              {
                title: t('table.columns.credited'),
              },
            ]}
          />
        </div>
      </Card>
    </div>
  );
}
