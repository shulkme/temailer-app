'use client';
import { PRICE_TYPE_ENUM } from '@/apis/checkout/enums';
import { getCurrentSubscription } from '@/apis/credit';
import { CreditSubscriptionPlanRecord } from '@/apis/credit/types';
import { useRequest } from 'ahooks';
import { useTranslations } from 'next-intl';
import React, { createContext, useContext, useEffect, useState } from 'react';

const SubscriptionContext = createContext<{
  subscription?: CreditSubscriptionPlanRecord;
  loading?: boolean;
  is_free?: boolean;
  plan?: string;
  plan_locale?: string;
} | null>(null);

const SubscriptionProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const g = useTranslations('global');
  const [subscription, setSubscription] =
    useState<CreditSubscriptionPlanRecord>();
  const [isFree, setIsFree] = useState(true);
  const [planLocale, setPlanLocale] = useState<string>();
  const [plan, setPlan] = useState<string>('free');

  const { loading, refresh } = useRequest(getCurrentSubscription, {
    onSuccess: (res) => {
      setSubscription(res.data);
      const { rule_name } = res.data.subscription_info;
      setIsFree(
        rule_name === PRICE_TYPE_ENUM.FREE_MONTHLY ||
          rule_name === PRICE_TYPE_ENUM.FREE_YEARLY,
      );
      if (rule_name.startsWith('free')) {
        setPlanLocale(g('plans.free.title'));
        setPlan('free');
      } else if (rule_name.startsWith('basic')) {
        setPlanLocale(g('plans.basic.title'));
        setPlan('basic');
      } else if (rule_name.startsWith('premium')) {
        setPlanLocale(g('plans.premium.title'));
        setPlan('premium');
      } else if (rule_name.startsWith('ultimate')) {
        setPlanLocale(g('plans.ultimate.title'));
        setPlan('ultimate');
      }
    },
  });

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
    <SubscriptionContext.Provider
      value={{
        subscription,
        loading,
        is_free: isFree,
        plan_locale: planLocale,
        plan,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within SubscriptionProvider');
  }
  return context;
};

export { SubscriptionProvider, useSubscription };
