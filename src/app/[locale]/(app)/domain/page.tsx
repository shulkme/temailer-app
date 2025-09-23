'use client';
import { getMyDomainList } from '@/apis/domain';
import { DOMAIN_STATUS_ENUM } from '@/apis/domain/enums';
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
import { Alert, Button, Card, FormProps, Select, Space, Table } from 'antd';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';

export default function Page() {
  const t = useTranslations('app.pages.domain');
  const [form] = AntdForm.useForm();

  const statusOptions = useMemo(() => {
    return [
      {
        label: t('table.filters.status.options.active'),
        value: DOMAIN_STATUS_ENUM.ACTIVE,
      },
      {
        label: t('table.filters.status.options.pending'),
        value: DOMAIN_STATUS_ENUM.PENDING,
      },
      {
        label: t('table.filters.status.options.expired'),
        value: DOMAIN_STATUS_ENUM.EXPIRED,
      },
    ];
  }, [t]);

  const statusLabelFilter = useCallback(
    (status: DOMAIN_STATUS_ENUM) => {
      return statusOptions.find((f) => f.value === status)?.label || '--';
    },
    [statusOptions],
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
      return await getMyDomainList({
        page: current,
        size: pageSize,
        start_time,
        end_time,
        ...rest,
      }).then((res) => ({
        list: res.data.items,
        total: res.data.total,
      }));
    },
    {
      form,
    },
  );

  const { submit } = search;

  const handleCreate = () => {
    window.dispatchEvent(new CustomEvent('domain:create'));
  };

  const handleFormValueChange: FormProps['onValuesChange'] = (
    changedValues,
  ) => {
    if (!Object.keys(changedValues).includes('name')) {
      submit();
    }
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
              <AntdForm
                form={form}
                layout="inline"
                onValuesChange={handleFormValueChange}
              >
                <AntdFormItem name="status">
                  <Select
                    options={statusOptions}
                    style={{ width: 220 }}
                    placeholder={t('table.filters.status.placeholder')}
                    allowClear
                  />
                </AntdFormItem>
                <AntdFormItem name="dataRange">
                  <AntdDateRangePicker />
                </AntdFormItem>
                <AntdFormItem name="name">
                  <AntdInput
                    allowClear
                    suffix={<RiSearchLine size={16} />}
                    placeholder={t('table.filters.search.placeholder')}
                    onPressEnter={submit}
                    onClear={submit}
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
                render: (value) => {
                  return statusLabelFilter(value);
                },
              },
              {
                title: t('table.columns.remark'),
                dataIndex: 'remark',
                render: () => {
                  return <>--</>;
                },
              },
              {
                title: t('table.columns.registerTime'),
                dataIndex: 'register_time',
                render: (value) => {
                  return value
                    ? dayjs(value).format('YYYY-MM-DD HH:mm:ss')
                    : '--';
                },
              },
              {
                title: t('table.columns.expiredTime'),
                dataIndex: 'expired_time',
                render: (value) => {
                  return value
                    ? dayjs(value).format('YYYY-MM-DD HH:mm:ss')
                    : '--';
                },
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
