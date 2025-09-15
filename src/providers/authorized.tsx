'use client';
import { getUserProfile } from '@/apis/user';
import GlobalLoading from '@/components/global-loading';
import { useRouter } from '@/i18n/navigation';
import { useIdentity } from '@/providers/identity';
import { getToken } from '@/utils/token';
import { useRequest } from 'ahooks';
import React, { createContext, useContext, useEffect } from 'react';

const AuthorizedContext = createContext<{
  loading: boolean;
} | null>(null);

const AuthorizedProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { setUser, user } = useIdentity();
  const router = useRouter();

  const { run, loading } = useRequest(
    async () => {
      if (getToken()) {
        return await getUserProfile();
      }
      return Promise.reject();
    },
    {
      manual: true,
      onSuccess: (res) => {
        setUser(res.data);
      },
      onError: () => {
        setUser(undefined);
        router.replace('/login');
      },
    },
  );

  useEffect(() => {
    if (!user) {
      run();
    }
  }, [run, user]);

  if (loading || !user) return <GlobalLoading />;

  return (
    <AuthorizedContext.Provider
      value={{
        loading,
      }}
    >
      {children}
    </AuthorizedContext.Provider>
  );
};

const useAuthorized = () => {
  const context = useContext(AuthorizedContext);
  if (!context) {
    throw new Error('useAuthorized must be used within an AuthorizedProvider');
  }
  return context;
};

export { AuthorizedProvider, useAuthorized };
