'use client';
import {
  AntdDateRangePicker,
  AntdForm,
  AntdFormItem,
  AntdInput,
} from '@/components/antd';
import { Title } from '@/providers/title';
import { RiSearchLine } from '@remixicon/react';
import { Card, Select, Table } from 'antd';

export default function Page() {
  const [form] = AntdForm.useForm();
  return (
    <>
      <Title title={'收藏'} />
      <div className="p-8">
        <Card>
          <div className="mb-6">
            <AntdForm form={form} layout="inline">
              <AntdFormItem name="type">
                <Select style={{ width: 220 }} />
              </AntdFormItem>
              <AntdFormItem name="dataRange">
                <AntdDateRangePicker />
              </AntdFormItem>
              <AntdFormItem name="order_id">
                <AntdInput allowClear suffix={<RiSearchLine size={16} />} />
              </AntdFormItem>
            </AntdForm>
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
