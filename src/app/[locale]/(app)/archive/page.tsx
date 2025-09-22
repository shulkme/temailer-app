'use client';
import { getArchiveList } from '@/apis/archive';
import { ArchiveRecord } from '@/apis/archive/types';
import { AntdForm, AntdFormItem, AntdInput } from '@/components/antd';
import { Title } from '@/providers/title';
import { RiSearchLine } from '@remixicon/react';
import { useAntdTable } from 'ahooks';
import { Button, Card, FormProps, Space, Table } from 'antd';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('app.pages.archive');
  const [form] = AntdForm.useForm();
  const { tableProps, search } = useAntdTable(
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

  const onFormValuesChange: FormProps['onValuesChange'] = (changedValues) => {
    if (!Object.keys(changedValues).includes('name')) submit();
  };
  return (
    <>
      <Title title={t('title')} />
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        <Card>
          <div className="flex items-center justify-between gap-2 mb-4 lg:mb-6">
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
                <Button type="primary">{t('table.actions.export')}</Button>
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
              },
            ]}
            {...tableProps}
          />
        </Card>
      </div>
    </>
  );
}
