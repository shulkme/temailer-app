'use client';
import { getMyDomainList } from '@/apis/domain';
import { DOMAIN_STATUS_ENUM } from '@/apis/domain/enums';
import { DomainRecord } from '@/apis/domain/types';
import CreateDrawer from '@/app/[locale]/(app)/domain/components/create-drawer';
import DomainList from '@/app/[locale]/(app)/domain/components/domian-list';
import ReleaseModal from '@/app/[locale]/(app)/domain/components/release-modal';
import { DomainProvider } from '@/app/[locale]/(app)/domain/context';
import {
  AntdDateRangePicker,
  AntdForm,
  AntdFormItem,
  AntdInput,
} from '@/components/antd';
import { useCredit } from '@/providers/credit';
import { Title } from '@/providers/title';
import { RiSearchLine } from '@remixicon/react';
import { useAntdTable, useSetState } from 'ahooks';
import { Alert, Button, Card, FormProps, Select, Space, Table } from 'antd';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';

export default function Page() {
  const t = useTranslations('app.pages.domain');
  const [form] = AntdForm.useForm();
  const [open, setOpen] = useSetState<{
    release: boolean;
  }>({
    release: false,
  });
  const [currentRecord, setCurrentRecord] = useState<DomainRecord>();
  const { refresh: refreshCredits } = useCredit();

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

  const { tableProps, search, refresh } = useAntdTable(
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

  const domainLabelFilter = useCallback((record: DomainRecord) => {
    if (record.status === DOMAIN_STATUS_ENUM.PENDING) {
      const match = record.name.match(/[^.]+\.(.+)$/);
      return match ? '?.' + match[1] : null;
    }
    return record.name;
  }, []);

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

  const handleAfterRelease = () => {
    refresh();
    refreshCredits();
  };

  const handleRelease = (record: DomainRecord) => {
    setCurrentRecord(record);
    setOpen({ release: true });
  };

  return (
    <DomainProvider>
      <Title title={t('title')} />
      <Alert banner showIcon type="info" message={t('alert.message')} />
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
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
            rowKey="id"
            scroll={{
              x: 1200,
            }}
            columns={[
              {
                title: t('table.columns.domain'),
                dataIndex: 'name',
                render: (_, record) => {
                  return domainLabelFilter(record);
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
                title: t('table.columns.remark'),
                dataIndex: 'remark',
                render: (value) => {
                  return value || '--';
                },
              },
              {
                title: t('table.columns.createTime'),
                dataIndex: 'created_time',
                render: (value) => {
                  return value
                    ? dayjs(value).format('YYYY-MM-DD HH:mm:ss')
                    : '--';
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
                width: 140,
                align: 'right',
                render: (_, record) => {
                  return (
                    <Button
                      disabled={record.status !== DOMAIN_STATUS_ENUM.ACTIVE}
                      size="small"
                      type="link"
                      onClick={() => handleRelease(record)}
                    >
                      {t('table.actions.release')}
                    </Button>
                  );
                },
              },
            ]}
            {...tableProps}
          />
        </Card>
        <div className="text-xs text-black/50 text-center py-1">
          {t.rich('tips', {
            strong: (chunks) => <a>{chunks}</a>,
          })}
        </div>
      </div>
      <CreateDrawer />
      <ReleaseModal
        id={currentRecord?.id}
        open={open.release}
        setOpen={(o) => setOpen({ release: o })}
        afterSubmit={handleAfterRelease}
        afterClose={() => setCurrentRecord(undefined)}
      />
    </DomainProvider>
  );
}
