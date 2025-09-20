'use client';
import { getOrderList } from '@/apis/order';
import { OrderRecord } from '@/apis/order/types';
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
  const t = useTranslations('app.pages.bill');
  const [form] = AntdForm.useForm();

  const { tableProps, search } = useAntdTable(
    async ({ current, pageSize }, params) => {
      const { dataRange, ...rest } = params;

      const start_time = dataRange?.[0]
        ? dayjs(dataRange[0]).format('YYYY-MM-DD')
        : undefined;
      const end_time = dataRange?.[1]
        ? dayjs(dataRange[1]).format('YYYY-MM-DD')
        : undefined;

      return await getOrderList({
        page: current,
        size: pageSize,
        start_time,
        end_time,
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
    if (!Object.keys(changedValues).includes('external_order_id')) submit();
  };

  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
      <Card>
        <div className="mb-4 lg:mb-6">
          <AntdForm
            form={form}
            layout="inline"
            onValuesChange={onFormValuesChange}
          >
            <AntdFormItem name="package_type">
              <Select
                placeholder={t('table.filters.type.placeholder')}
                style={{ width: 220 }}
                allowClear
              />
            </AntdFormItem>
            <AntdFormItem name="dataRange">
              <AntdDateRangePicker />
            </AntdFormItem>
            <AntdFormItem name="external_order_id">
              <AntdInput
                allowClear
                placeholder={t('table.filters.search.placeholder')}
                suffix={<RiSearchLine size={16} />}
                onPressEnter={submit}
                onClear={submit}
              />
            </AntdFormItem>
          </AntdForm>
        </div>

        <Table<OrderRecord>
          rowKey="id"
          scroll={{
            x: 1200,
          }}
          columns={[
            {
              title: t('table.columns.no'),
              dataIndex: 'id',
            },
            {
              title: t('table.columns.amount'),
              dataIndex: 'amount',
              render: (value) => {
                return '$' + value.toLocaleString();
              },
            },
            {
              title: t('table.columns.paymentMethod'),
              dataIndex: 'payment_method',
            },
            {
              title: t('table.columns.type'),
              dataIndex: 'order_type',
            },
            {
              title: t('table.columns.plan'),
              dataIndex: 'extra_info',
            },
            {
              title: t('table.columns.status'),
              dataIndex: 'status',
            },
            {
              title: t('table.columns.date'),
              dataIndex: 'created_time',
              render: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
            },
          ]}
          {...tableProps}
        />
      </Card>
    </div>
  );
}
