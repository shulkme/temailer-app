'use client';
import { sendResetPasswordEmail } from '@/apis/user';
import {
  AntdForm,
  AntdFormItem,
  AntdInput,
  AntdParagraph,
  AntdTitle,
} from '@/components/antd';
import { Link } from '@/i18n/navigation';
import { useRequest } from 'ahooks';
import { Alert, Button, FormProps, Result } from 'antd';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function Page() {
  const t = useTranslations('auth.forgot');
  const [form] = AntdForm.useForm();
  const [errMsg, setErrMsg] = useState<string>();
  const [showResult, setShowResult] = useState(false);
  const [email, setEmail] = useState<string>();

  const { run: doSubmit, loading: submitting } = useRequest(
    sendResetPasswordEmail,
    {
      manual: true,
      onSuccess: () => {
        setErrMsg(undefined);
        form.resetFields();
        setShowResult(true);
      },
      onError: (e) => {
        setErrMsg(e.message);
      },
    },
  );

  const onFinish: FormProps['onFinish'] = (values) => {
    setEmail(values?.email);
    doSubmit(values);
  };

  return showResult ? (
    <>
      <Result
        status="success"
        title={t('result.title')}
        subTitle={
          <div className="space-y-4">
            <div>{t('result.subtitle')}</div>
            <div className="font-medium text-black text-base">{email}</div>
            <div>{t('result.desc')}</div>
          </div>
        }
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
      <AntdParagraph type="secondary">{t('subtitle')}</AntdParagraph>
      <AntdForm
        form={form}
        disabled={submitting}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
        validateTrigger={['onBlur']}
      >
        {errMsg && (
          <AntdFormItem>
            <Alert showIcon type="error" message={errMsg} />
          </AntdFormItem>
        )}
        <AntdFormItem
          name="email"
          messageVariables={{
            label: t('form.email.label'),
          }}
          label={t('form.email.label')}
          rules={[
            {
              required: true,
            },
            {
              type: 'email',
            },
          ]}
        >
          <AntdInput size="large" placeholder={t('form.email.placeholder')} />
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
        <AntdFormItem>
          <div className="text-center">
            {t.rich('login', {
              link: (chunks) => (
                <>
                  <Link href="/login">{chunks}</Link>
                </>
              ),
            })}
          </div>
        </AntdFormItem>
      </AntdForm>
    </>
  );
}
