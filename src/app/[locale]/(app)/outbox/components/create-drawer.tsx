'use client';
import {
  AntdForm,
  AntdFormItem,
  AntdInput,
  AntdRadioGroup,
  AntdTextArea,
} from '@/components/antd';
import { Button, Drawer } from 'antd';
import React from 'react';

const CreateDrawer: React.FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
}> = ({ open, setOpen }) => {
  return (
    <Drawer
      title={'发信任务'}
      open={open}
      onClose={() => setOpen(false)}
      width={640}
      classNames={{
        header: 'border-0',
      }}
      footer={
        <div>
          <div className="py-4">
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span className="text-black/50">收信数量</span>
                <span className="font-medium">x1,000</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-black/50">预计消耗</span>
                <span className="font-medium text-lg">1,000积分</span>
              </li>
            </ul>
          </div>
          <div>
            <Button block type="primary" size="large">
              提交任务
            </Button>
          </div>
        </div>
      }
    >
      <AntdForm layout="vertical">
        <AntdFormItem label={'任务名称'}>
          <AntdInput />
        </AntdFormItem>
        <AntdFormItem label={'发信地址'}>
          <AntdRadioGroup
            options={[
              {
                label: '随机邮箱',
                value: '1',
              },
              {
                label: '自定义',
                value: '2',
              },
            ]}
          />
        </AntdFormItem>
        <AntdFormItem
          label={'收信地址'}
          extra={
            <span className="text-xs">
              支持txt,xlx,xlsx,csv格式，每行一个地址
            </span>
          }
        >
          <Button block>上传收信地址</Button>
        </AntdFormItem>
        <AntdFormItem label={'邮件内容'}>
          <AntdTextArea rows={5} />
        </AntdFormItem>
        <AntdFormItem label={'定时发送'}>
          <AntdRadioGroup
            options={[
              {
                label: '立即发送',
                value: '1',
              },
              {
                label: '自定义',
                value: '2',
              },
            ]}
          />
        </AntdFormItem>
      </AntdForm>
    </Drawer>
  );
};

export default CreateDrawer;
