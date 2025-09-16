'use client';
import { getGoogleAuthLink } from '@/apis/auth';
import { registerUser } from '@/apis/user';
import {
  AntdForm,
  AntdFormItem,
  AntdInput,
  AntdInputPassword,
  AntdTitle,
} from '@/components/antd';
import { Link } from '@/i18n/navigation';
import Google from '@/icons/google';
import { Title } from '@/providers/title';
import { useRequest } from 'ahooks';
import { Alert, Button, Checkbox, Divider, FormProps, Result } from 'antd';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const t = useTranslations('auth.signup');
  const [form] = AntdForm.useForm();
  const [errMsg, setErrMsg] = useState<string>();
  const [showResult, setShowResult] = useState(false);
  const [email, setEmail] = useState<string>();
  const searchParams = useSearchParams();
  const invitationCode = searchParams.get('inviteCode');

  const { run: getGoogleAuth, loading: googleLoading } = useRequest(
    async () => {
      const redirect_url =
        searchParams.get('redirect') || window.location.origin + '/dashboard';
      return await getGoogleAuthLink(redirect_url);
    },
    {
      manual: true,
      onSuccess: (res) => {
        window.location.href = res.data;
      },
      onError: (e) => {
        setErrMsg(e.message);
      },
    },
  );

  const { run: doSubmit, loading: submitting } = useRequest(registerUser, {
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
    setEmail(values?.email);
    doSubmit(values);
  };

  return (
    <>
      <Title title={t('title')} />
      {showResult ? (
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
              <Button
                href="/login"
                block
                type="primary"
                key="back"
                size="large"
              >
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
          >
            <AntdFormItem>
              <Button
                loading={googleLoading}
                className="leading-none"
                size="large"
                block
                icon={<Google width={20} height={20} />}
                onClick={getGoogleAuth}
              >
                {t('oauth2.google')}
              </Button>
            </AntdFormItem>
            <Divider type="horizontal" plain>
              {t('or')}
            </Divider>
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
              <AntdInput
                size="large"
                placeholder={t('form.email.placeholder')}
              />
            </AntdFormItem>
            <AntdFormItem
              messageVariables={{
                label: t('form.password.label'),
              }}
              name="password"
              label={t('form.password.label')}
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
                placeholder={t('form.password.placeholder')}
              />
            </AntdFormItem>
            <AntdFormItem
              name="invitation_code"
              messageVariables={{
                label: t('form.referral.label'),
              }}
              label={t('form.referral.label')}
              initialValue={invitationCode}
            >
              <AntdInput
                size="large"
                placeholder={t('form.referral.placeholder')}
              />
            </AntdFormItem>
            <AntdFormItem
              name="agree"
              valuePropName="checked"
              rules={[
                {
                  required: true,
                  message: t('form.agree.errors.required'),
                },
              ]}
              validateTrigger={['onChange', 'onBlur']}
            >
              <Checkbox>
                <div className="space-x-2">
                  {t.rich('form.agree.label', {
                    term: (chunks) => {
                      return (
                        <Link
                          target="_blank"
                          href="https://doc.v2proxy.com/policy/service-agreement"
                        >
                          {chunks}
                        </Link>
                      );
                    },
                    policy: (chunks) => {
                      return (
                        <Link
                          target="_blank"
                          href="https://doc.v2proxy.com/policy/privacy-policy"
                        >
                          {chunks}
                        </Link>
                      );
                    },
                  })}
                </div>
              </Checkbox>
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
                  link: (chunks) => <Link href="/login">{chunks}</Link>,
                })}
              </div>
            </AntdFormItem>
          </AntdForm>
        </>
      )}
    </>
  );
}
