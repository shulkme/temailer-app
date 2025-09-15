'use client';
import { resetPassword } from '@/apis/user';
import { ResetPasswordData } from '@/apis/user/types';
import {
  AntdForm,
  AntdFormItem,
  AntdInput,
  AntdInputPassword,
  AntdTitle,
} from '@/components/antd';
import { useRequest } from 'ahooks';
import { Alert, Button, FormProps, Result } from 'antd';
import { useTranslations } from 'next-intl';
import { notFound, useSearchParams } from 'next/navigation';
import { omit } from 'radash';
import { useState } from 'react';

export default function Page() {
  const t = useTranslations('auth.reset');
  const [form] = AntdForm.useForm();
  const [errMsg, setErrMsg] = useState<string>();
  const [showResult, setShowResult] = useState(false);
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  if (!code) {
    notFound();
  }

  const { run: doSubmit, loading: submitting } = useRequest(resetPassword, {
    manual: true,
    onSuccess: () => {
      setErrMsg(undefined);
      form.resetFields();
      setShowResult(true);
    },
    onError: (e) => {
      setErrMsg(e.message);
    },
  });

  const onFinish: FormProps['onFinish'] = (values) => {
    doSubmit({
      ...(omit(values, ['confirm_password']) as ResetPasswordData),
    });
  };

  return showResult ? (
    <>
      <Result
        status="success"
        title={t('result.title')}
        subTitle={<div>{t('result.subtitle')}</div>}
        extra={[
          <Button href="/login" block type="primary" key="back" size="large">
            {t('result.actions.0')}
          </Button>,
        ]}
      />
    </>
  ) : (
    <>
      <AntdTitle level={2} className="mb-8 mt-0 text-center">
        {t('title')}
      </AntdTitle>
      <AntdForm
        form={form}
        disabled={submitting}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
        validateTrigger={['onBlur']}
        initialValues={{
          code,
        }}
      >
        {errMsg && (
          <AntdFormItem>
            <Alert showIcon type="error" message={errMsg} />
          </AntdFormItem>
        )}
        <AntdFormItem name="code" hidden>
          <AntdInput />
        </AntdFormItem>
        <AntdFormItem
          name="new_password"
          messageVariables={{
            label: t('form.new-password.label'),
          }}
          label={t('form.new-password.label')}
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
            placeholder={t('form.new-password.placeholder')}
          />
        </AntdFormItem>
        <AntdFormItem
          name="confirm_password"
          messageVariables={{
            label: t('form.confirm-password.label'),
          }}
          label={t('form.confirm-password.label')}
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
                  new Error(t('form.confirm-password.errors.match')),
                );
              },
            }),
          ]}
        >
          <AntdInputPassword
            size="large"
            placeholder={t('form.confirm-password.placeholder')}
          />
        </AntdFormItem>
        <AntdFormItem>
          <Button
            loading={submitting}
            size="large"
            block
            type="primary"
            htmlType="submit"
          >
            {t('form.submit.label')}
          </Button>
        </AntdFormItem>
      </AntdForm>
    </>
  );
}
