'use client';
import { activateUser } from '@/apis/user';
import GlobalLoading from '@/components/global-loading';
import { useRouter } from '@/i18n/navigation';
import { useIdentity } from '@/providers/identity';
import { setToken } from '@/utils/token';
import { useRequest } from 'ahooks';
import { Button, Result } from 'antd';
import { notFound, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const searchParams = useSearchParams();
  const { setUser } = useIdentity();
  const code = searchParams.get('code');
  const router = useRouter();
  const [errMsg, setErrMsg] = useState<string>();
  if (!code) notFound();

  useRequest(
    async () => {
      return await activateUser(code);
    },
    {
      onSuccess: (res) => {
        const { user, access_token } = res.data;
        setUser(user);
        setToken(access_token);
        setErrMsg(undefined);
        router.replace('/dashboard');
      },
      onError: (e) => {
        setErrMsg(e.message || 'System error');
      },
    },
  );

  return errMsg ? (
    <div className="flex flex-col items-center min-h-screen justify-center">
      <Result
        status="error"
        title={'Error'}
        subTitle={errMsg}
        extra={
          <Button type="primary" href={'/login'}>
            Back to Login
          </Button>
        }
      />
    </div>
  ) : (
    <GlobalLoading />
  );
}
