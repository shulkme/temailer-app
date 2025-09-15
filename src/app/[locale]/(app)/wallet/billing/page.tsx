'use client';
import { getCreditRecordList } from '@/apis/credit';
import { CreditRecord } from '@/apis/credit/types';
import {
  AntdDateRangePicker,
  AntdForm,
  AntdFormItem,
  AntdInput,
} from '@/components/antd';
import { RiSearchLine } from '@remixicon/react';
import { useAntdTable } from 'ahooks';
import { Card, FormProps, Select, Table } from 'antd';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('app.pages.wallet.billing');
  const [form] = AntdForm.useForm();

  const { tableProps, search } = useAntdTable(
    async ({ current, pageSize }, params) => {
      const { dataRange, ...rest } = params;

      const start_at = dataRange?.[0]
        ? dayjs(dataRange[0]).format('YYYY-MM-DD')
        : undefined;
      const end_at = dataRange?.[1]
        ? dayjs(dataRange[1]).format('YYYY-MM-DD')
        : undefined;

      return await getCreditRecordList({
        page: current,
        size: pageSize,
        start_at,
        end_at,
        ...rest,
      }).then((res) => {
        return {
          list: res.data.items,
          total: res.data.total,
        };
      });
    },
    {
      form,
    },
  );

  const { submit } = search;

  const onFormValuesChange: FormProps['onValuesChange'] = (changedValues) => {
    if (!Object.keys(changedValues).includes('order_id')) submit();
  };

  return (
    <div className="p-8">
      <Card>
        <div className="mb-6">
          <AntdForm
            form={form}
            layout="inline"
            onValuesChange={onFormValuesChange}
          >
            <AntdFormItem name="type">
              <Select
                placeholder={t('table.filters.type.placeholder')}
                style={{ width: 220 }}
              />
            </AntdFormItem>
            <AntdFormItem name="dataRange">
              <AntdDateRangePicker />
            </AntdFormItem>
            <AntdFormItem name="order_id">
              <AntdInput
                allowClear
                placeholder={t('table.filters.order-number.placeholder')}
                suffix={<RiSearchLine size={16} />}
                onPressEnter={submit}
                onClear={submit}
              />
            </AntdFormItem>
          </AntdForm>
        </div>

        <Table<CreditRecord>
          rowKey="id"
          scroll={{
            x: 1200,
          }}
          columns={[
            {
              title: t('table.columns.order-number'),
            },
            {
              title: t('table.columns.payment-amount'),
              dataIndex: 'points',
            },
            {
              title: t('table.columns.payment-method'),
            },
            {
              title: t('table.columns.type'),
            },
            {
              title: t('table.columns.plan'),
            },
            {
              title: t('table.columns.status'),
            },
            {
              title: t('table.columns.date'),
            },
            {
              title: t('table.columns.balance'),
            },
          ]}
          {...tableProps}
        />
      </Card>
    </div>
  );
}
