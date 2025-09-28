'use client';
import { PAYMENT_METHOD_ENUM } from '@/apis/checkout/enums';
import { getOrderList } from '@/apis/order';
import { ORDER_STATUS_ENUM, ORDER_TYPE_ENUM } from '@/apis/order/enums';
import { OrderRecord } from '@/apis/order/types';
import {
  AntdDateRangePicker,
  AntdForm,
  AntdFormItem,
  AntdInput,
} from '@/components/antd';
import { useSubscription } from '@/providers/subscription';
import { Title } from '@/providers/title';
import { RiSearchLine } from '@remixicon/react';
import { useAntdTable } from 'ahooks';
import { Alert, Card, FormProps, Select, Table } from 'antd';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';

export default function Page() {
  const t = useTranslations('app.pages.bill');
  const g = useTranslations('global');
  const [form] = AntdForm.useForm();
  const { getPlanLocaleConfig } = useSubscription();

  const statusOptions = useMemo(() => {
    return [
      {
        label: g('checkout.status.paid'),
        value: ORDER_STATUS_ENUM.PAID,
      },
      {
        label: g('checkout.status.fail'),
        value: ORDER_STATUS_ENUM.FAILED,
      },
      {
        label: g('checkout.status.pending'),
        value: ORDER_STATUS_ENUM.PENDING,
      },
      {
        label: g('checkout.status.expired'),
        value: ORDER_STATUS_ENUM.EXPIRED,
      },
    ];
  }, [g]);

  const statusLabelFilter = useCallback(
    (status: ORDER_STATUS_ENUM) => {
      return statusOptions.find((f) => f.value === status)?.label || '--';
    },
    [statusOptions],
  );

  const typeOptions = useMemo(() => {
    return [
      {
        label: g('checkout.type.subscription'),
        value: ORDER_TYPE_ENUM.SUBSCRIPTION,
      },
      {
        label: g('checkout.type.credit'),
        value: ORDER_TYPE_ENUM.CREDIT,
      },
      {
        label: g('checkout.type.domain'),
        value: ORDER_TYPE_ENUM.DOMAIN,
      },
    ];
  }, [g]);

  const typeLabelFilter = useCallback(
    (type: ORDER_TYPE_ENUM) => {
      return typeOptions.find((f) => f.value === type)?.label || '--';
    },
    [typeOptions],
  );

  const methodOptions = useMemo(() => {
    return [
      {
        label: g('checkout.payment.balance'),
        value: PAYMENT_METHOD_ENUM.BALANCE,
      },
      {
        label: g('checkout.payment.credit'),
        value: PAYMENT_METHOD_ENUM.CREDIT,
      },
      {
        label: g('checkout.payment.crypto'),
        value: PAYMENT_METHOD_ENUM.CRYPTO,
      },
      {
        label: g('checkout.payment.local'),
        value: PAYMENT_METHOD_ENUM.LOCAL,
      },
      {
        label: g('checkout.payment.bank'),
        value: PAYMENT_METHOD_ENUM.BANK,
      },
    ];
  }, [g]);

  const methodLabelFilter = useCallback(
    (method: PAYMENT_METHOD_ENUM) => {
      return methodOptions.find((f) => f.value === method)?.label || '--';
    },
    [methodOptions],
  );

  const planLabelFilter = useCallback(
    (record: OrderRecord) => {
      switch (record.order_type) {
        case ORDER_TYPE_ENUM.DOMAIN:
          // const config = getPlanLocaleConfig(record.extra_info);
          return [
            record.extra_info?.session_metadata?.name,
            record.extra_info?.session_metadata?.quantity,
          ]
            .filter(Boolean)
            .join(' / ');
        case ORDER_TYPE_ENUM.CREDIT:
          return record.extra_info?.credit_result?.credits_added;
        case ORDER_TYPE_ENUM.SUBSCRIPTION:
          const config = getPlanLocaleConfig(
            record.extra_info?.credit_result?.name,
          );
          return config?.fullName;
      }
    },
    [getPlanLocaleConfig],
  );

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
    if (!Object.keys(changedValues).includes('name')) submit();
  };

  return (
    <>
      <Title title={t('title')} />
      <Alert
        showIcon
        banner
        type="info"
        message={t.rich('tips', {
          link: (chunks) => (
            <a
              href="https://billing.stripe.com/p/login/eVq5kDblLcm25sf3rN6oo00"
              target="_blank"
            >
              {chunks}
            </a>
          ),
        })}
      />
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        <Card>
          <div className="mb-4 lg:mb-6">
            <AntdForm
              form={form}
              layout="inline"
              onValuesChange={onFormValuesChange}
            >
              <AntdFormItem name="status">
                <Select
                  placeholder={t('table.filters.status.placeholder')}
                  style={{ width: 220 }}
                  allowClear
                  options={statusOptions}
                />
              </AntdFormItem>
              <AntdFormItem name="dataRange">
                <AntdDateRangePicker />
              </AntdFormItem>
              <AntdFormItem name="name">
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
                render: (value) => {
                  return methodLabelFilter(value);
                },
              },
              {
                title: t('table.columns.type'),
                dataIndex: 'order_type',
                render: (value) => {
                  return typeLabelFilter(value);
                },
              },
              {
                title: t('table.columns.plan'),
                render: (_, record) => {
                  return planLabelFilter(record);
                },
              },
              {
                title: t('table.columns.status'),
                dataIndex: 'status',
                render: (value) => {
                  return statusLabelFilter(value);
                },
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
    </>
  );
}
