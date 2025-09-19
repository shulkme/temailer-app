'use client';
import {
  AntdForm,
  AntdFormItem,
  AntdInput,
  AntdRadioGroup,
  AntdTextArea,
} from '@/components/antd';
import { Button, Drawer } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';

const CreateDrawer: React.FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
}> = ({ open, setOpen }) => {
  const t = useTranslations('app.pages.outbox.create');
  return (
    <Drawer
      title={t('title')}
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
                <span className="text-black/50">
                  {t('footer.summary.quantity.label')}
                </span>
                <span className="font-medium">x1,000</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-black/50">
                  {t('footer.summary.total.label')}
                </span>
                <span className="font-medium text-lg">
                  {t('footer.summary.total.format', {
                    num: 1000,
                  })}
                </span>
              </li>
            </ul>
          </div>
          <div>
            <Button block type="primary" size="large">
              {t('footer.actions.submit')}
            </Button>
          </div>
        </div>
      }
    >
      <AntdForm layout="vertical">
        <AntdFormItem
          name="name"
          messageVariables={{
            label: t('form.name.label'),
          }}
          label={t('form.name.label')}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <AntdInput />
        </AntdFormItem>
        <AntdFormItem
          name="from_address"
          messageVariables={{
            label: t('form.fromAddress.label'),
          }}
          label={t('form.fromAddress.label')}
        >
          <AntdRadioGroup
            options={[
              {
                label: t('form.fromAddress.options.random'),
                value: '1',
              },
              {
                label: t('form.fromAddress.options.custom'),
                value: '2',
              },
            ]}
          />
        </AntdFormItem>
        <AntdFormItem
          messageVariables={{
            label: t('form.toAddress.label'),
          }}
          label={t('form.toAddress.label')}
          extra={<span className="text-xs">{t('form.toAddress.tips')}</span>}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Button block>{t('form.toAddress.action')}</Button>
        </AntdFormItem>
        <AntdFormItem
          messageVariables={{
            label: t('form.message.label'),
          }}
          label={t('form.message.label')}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <AntdTextArea rows={5} placeholder={t('form.message.placeholder')} />
        </AntdFormItem>
        <AntdFormItem
          name="send_time"
          messageVariables={{
            label: t('form.sendTime.label'),
          }}
          label={t('form.sendTime.label')}
        >
          <AntdRadioGroup
            options={[
              {
                label: t('form.sendTime.options.now'),
                value: '1',
              },
              {
                label: t('form.sendTime.options.custom'),
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
