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

export default function Page() {
  const [form] = AntdForm.useForm();
  return (
    <>
      <Title title={'收藏'} />
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        <Card>
          <div className="flex items-center justify-between gap-2 mb-4 lg:mb-6">
            <div>
              <AntdForm form={form} layout="inline">
                <AntdFormItem name="order_id">
                  <AntdInput
                    allowClear
                    suffix={<RiSearchLine size={16} />}
                    placeholder={'搜索邮箱'}
                  />
                </AntdFormItem>
                <AntdFormItem name="dataRange">
                  <AntdDateRangePicker />
                </AntdFormItem>
              </AntdForm>
            </div>
            <div>
              <Space size="middle">
                <Button type="primary">导出</Button>
              </Space>
            </div>
          </div>
          <Table
            scroll={{
              x: 1200,
            }}
            columns={[
              {
                title: '邮箱',
              },
              {
                title: '备注',
              },
              {
                title: '存档时间',
              },
              {
                title: '操作',
              },
            ]}
          />
        </Card>
      </div>
    </>
  );
}
