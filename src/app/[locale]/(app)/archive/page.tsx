'use client';
import { delArchive, getArchiveList } from '@/apis/archive';
import { ArchiveRecord } from '@/apis/archive/types';
import { AntdForm, AntdFormItem, AntdInput } from '@/components/antd';
import { Title } from '@/providers/title';
import { RiSearchLine } from '@remixicon/react';
import { useAntdTable, useRequest } from 'ahooks';
import { App, Button, Card, FormProps, Space, Table } from 'antd';
import { useTranslations } from 'next-intl';
import React, { useCallback, useState } from 'react';

export default function Page() {
  const t = useTranslations('app.pages.archive');
  const g = useTranslations('global');
  const [form] = AntdForm.useForm();
  const { message, modal } = App.useApp();
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

  const { tableProps, search, refresh } = useAntdTable(
    async ({ current, pageSize }, params) => {
      return await getArchiveList({
        page: current,
        size: pageSize,
        ...params,
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

  const { runAsync: doDelete } = useRequest(delArchive, {
    manual: true,
    onSuccess: () => {
      refresh();
      setSelectedKeys([]);
      message.success(g('response.success'));
    },
    onError: (e) => {
      message.error(e.message);
    },
  });

  const onFormValuesChange: FormProps['onValuesChange'] = (changedValues) => {
    if (!Object.keys(changedValues).includes('name')) submit();
  };

  const handleDelete = useCallback(
    (ids: React.Key[]) => {
      modal.confirm({
        title: t('delete.title'),
        content: t('delete.content'),
        okText: t('delete.actions.ok'),
        okType: 'danger',
        onOk: async () => {
          return await doDelete(ids as number[]);
        },
      });
    },
    [doDelete, modal, t],
  );

  return (
    <>
      <Title title={t('title')} />
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 lg:mb-6">
            <div>
              <AntdForm
                form={form}
                layout="inline"
                onValuesChange={onFormValuesChange}
              >
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
                <Button
                  danger
                  disabled={!selectedKeys.length}
                  onClick={() => handleDelete(selectedKeys)}
                >
                  {t('table.actions.delete')}
                </Button>
                {/*<Button type="primary">{t('table.actions.export')}</Button>*/}
              </Space>
            </div>
          </div>
          <Table<ArchiveRecord>
            rowKey="id"
            scroll={{
              x: 1200,
            }}
            columns={[
              {
                title: t('table.columns.email'),
                dataIndex: 'name',
              },
              {
                title: t('table.columns.remark'),
                dataIndex: 'remark',
              },
              {
                title: t('table.columns.createdTime'),
                dataIndex: 'created_time',
              },
              {
                title: t('table.columns.operate'),
                width: 140,
                align: 'right',
                render: (_, record) => {
                  return (
                    <Button
                      size="small"
                      type="link"
                      onClick={() => handleDelete([record.id])}
                    >
                      {t('table.actions.delete')}
                    </Button>
                  );
                },
              },
            ]}
            rowSelection={{
              selectedRowKeys: selectedKeys,
              onChange: (selectedRowKeys) => {
                setSelectedKeys(selectedRowKeys);
              },
            }}
            {...tableProps}
          />
        </Card>
      </div>
    </>
  );
}
