'use client';
import { getGoogleAuthLink, login } from '@/apis/auth';
import {
  AntdForm,
  AntdFormItem,
  AntdInput,
  AntdInputPassword,
  AntdTitle,
} from '@/components/antd';
import { Link, useRouter } from '@/i18n/navigation';
import Google from '@/icons/google';
import { useIdentity } from '@/providers/identity';
import { getToken, setToken } from '@/utils/token';
import { useRequest } from 'ahooks';
import { Alert, Button, Divider, FormProps } from 'antd';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const t = useTranslations('auth.login');
  const [form] = AntdForm.useForm();
  const { setUser, logout } = useIdentity();
  const [errMsg, setErrMsg] = useState<string>();
  const router = useRouter();

  const searchParams = useSearchParams();

  const redirect = searchParams.get('redirect') || '/dashboard';

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

  const { run: doSubmit, loading: submitting } = useRequest(login, {
    manual: true,
    onSuccess: (res) => {
      const { access_token, user } = res.data;
      setUser(user);
      setToken(access_token);
      setErrMsg(undefined);
      form.resetFields();
      router.replace(redirect);
    },
    onError: (e) => {
      setErrMsg(e.message);
    },
  });

  const onFinish: FormProps['onFinish'] = (values) => {
    doSubmit(values);
  };

  useEffect(() => {
    if (getToken()) logout();
  }, []);

  return (
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
          messageVariables={{
            label: t('form.email.label'),
          }}
          name="username"
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
        <AntdFormItem>
          <div className="flex justify-end">
            <Link
              className="text-black hover:text-(--ant-color-link)"
              href="/forgot-password"
            >
              {t('forgot-password')}
            </Link>
          </div>
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
            {t.rich('signup', {
              link: (chunks) => (
                <>
                  <Link href="/signup">{chunks}</Link>
                </>
              ),
            })}
          </div>
        </AntdFormItem>
      </AntdForm>
    </>
  );
}
