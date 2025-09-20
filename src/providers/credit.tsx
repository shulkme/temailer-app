'use client';
import { getAvailableCredits } from '@/apis/credit';
import { getToken } from '@/utils/token';
import { useRequest } from 'ahooks';
import React, { createContext, useContext, useEffect, useState } from 'react';

const CreditContext = createContext<{
  available: number;
  loading: boolean;
  refresh: () => void;
} | null>(null);

const CreditProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [available, setAvailable] = useState<number>(0);

  const { refresh, loading } = useRequest(
    async () => {
      if (getToken()) {
        return await getAvailableCredits();
      }
      return Promise.reject();
    },
    {
      onSuccess: (res) => {
        setAvailable(res.data || 0);
      },
    },
  );

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === 'PAYMENT_SUCCESS') {
        refresh();
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  return (
    <CreditContext.Provider
      value={{
        available,
        refresh,
        loading,
      }}
    >
      {children}
    </CreditContext.Provider>
  );
};

const useCredit = () => {
  const context = useContext(CreditContext);
  if (!context) {
    throw new Error('useCredit must be used within a CreditProvider');
  }
  return context;
};

export { CreditProvider, useCredit };
