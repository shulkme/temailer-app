'use client';
import { useCredit } from '@/providers/credit';
import { App } from 'antd';
import React, { createContext, useContext, useEffect, useState } from 'react';

const RechargeContext = createContext<{
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  payment: string;
  setPayment: (payment: string) => void;
} | null>(null);

const RechargeProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [amount, setAmount] = useState(10);
  const [payment, setPayment] = useState('credit');
  const { message } = App.useApp();
  const { refresh } = useCredit();

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === 'PAYMENT_SUCCESS') {
        refresh();
        message.success('Payment successful!');
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  return (
    <RechargeContext.Provider
      value={{
        amount,
        setAmount,
        payment,
        setPayment,
      }}
    >
      {children}
    </RechargeContext.Provider>
  );
};

const useRecharge = () => {
  const context = useContext(RechargeContext);
  if (!context) {
    throw new Error('useRecharge must be used within the RechargeProvider');
  }
  return context;
};

export { RechargeProvider, useRecharge };
