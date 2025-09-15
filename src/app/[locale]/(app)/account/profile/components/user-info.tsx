'use client';
import { changePassword } from '@/apis/user';
import {
  AntdForm,
  AntdFormItem,
  AntdInputPassword,
  AntdTitle,
} from '@/components/antd';
import { useIdentity } from '@/providers/identity';
import { useRequest } from 'ahooks';
import { App, Card, Descriptions, FormProps, Modal } from 'antd';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

const UserInfo: React.FC = () => {
  const t = useTranslations('app.pages.account.profile.detail');
  const { user, logout } = useIdentity();
  const [form] = AntdForm.useForm();
  const [open, setOpen] = useState(false);
  const { message } = App.useApp();

  const { run: doSubmit, loading: submitting } = useRequest(changePassword, {
    manual: true,
    onSuccess: () => {
      message.success(t('modal.result.success'));
      setOpen(false);
      logout();
    },
    onError: (e) => {
      message.error(e.message || t('modal.result.error'));
    },
  });

  const onFinish: FormProps['onFinish'] = (values) => {
    doSubmit(values);
  };

  return (
    <>
      <Card>
        <AntdTitle level={5} className="mb-6">
          {t('title')}
        </AntdTitle>
        <div>
          <Descriptions
            layout="vertical"
            column={{
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 4,
              xxl: 4,
            }}
            classNames={{
              content: 'font-medium text-base',
            }}
            items={[
              {
                label: t('items.username.label'),
                children: user?.username || '--',
              },
              {
                label: t('items.email.label'),
                children: user?.email || '--',
              },
              {
                label: t('items.registration-time.label'),
                children: user?.created_time
                  ? dayjs(user.created_time).format('LLL')
                  : '--',
              },
              {
                label: t('items.password.label'),
                children: (
                  <div className="space-x-1">
                    <span>******</span>
                    <a
                      className="text-sm font-normal"
                      onClick={() => setOpen(true)}
                    >
                      {t('items.password.change-password')}
                    </a>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </Card>

      <Modal
        open={open}
        title={t('modal.title')}
        onCancel={() => setOpen(false)}
        onOk={form.submit}
        okText={t('modal.actions.yes')}
        cancelText={t('modal.actions.no')}
        afterClose={() => form.resetFields()}
        okButtonProps={{
          loading: submitting,
        }}
        cancelButtonProps={{
          disabled: submitting,
        }}
      >
        <AntdForm
          form={form}
          layout="vertical"
          requiredMark={false}
          validateTrigger={['onBlur']}
          disabled={submitting}
          onFinish={onFinish}
        >
          <AntdFormItem
            name="old_password"
            messageVariables={{
              label: t('modal.form.old-password.label'),
            }}
            label={t('modal.form.old-password.label')}
            rules={[
              {
                required: true,
              },
              {
                min: 6,
              },
              {
                max: 16,
              },
            ]}
          >
            <AntdInputPassword
              size="large"
              placeholder={t('modal.form.old-password.placeholder')}
            />
          </AntdFormItem>
          <AntdFormItem
            name="new_password"
            messageVariables={{
              label: t('modal.form.new-password.label'),
            }}
            label={t('modal.form.new-password.label')}
            rules={[
              {
                required: true,
              },
              {
                min: 6,
              },
              {
                max: 16,
              },
            ]}
          >
            <AntdInputPassword
              size="large"
              placeholder={t('modal.form.new-password.placeholder')}
            />
          </AntdFormItem>
          <AntdFormItem
            name="confirm_password"
            messageVariables={{
              label: t('modal.form.confirm-password.label'),
            }}
            label={t('modal.form.confirm-password.label')}
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('new_password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(t('modal.form.confirm-password.errors.match')),
                  );
                },
              }),
            ]}
          >
            <AntdInputPassword
              size="large"
              placeholder={t('modal.form.confirm-password.placeholder')}
            />
          </AntdFormItem>
        </AntdForm>
      </Modal>
    </>
  );
};

export default UserInfo;
