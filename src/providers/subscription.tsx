'use client';
import { PRICE_TYPE_ENUM } from '@/apis/checkout/enums';
import { getCurrentSubscription } from '@/apis/credit';
import { CreditSubscriptionPlanRecord } from '@/apis/credit/types';
import { useRequest } from 'ahooks';
import { useTranslations } from 'next-intl';
import React, { createContext, useContext, useState } from 'react';

const SubscriptionContext = createContext<{
  subscription?: CreditSubscriptionPlanRecord;
  loading?: boolean;
  is_free?: boolean;
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

  const { loading } = useRequest(getCurrentSubscription, {
    onSuccess: (res) => {
      setSubscription(res.data);
      const { rule_name } = res.data.subscription_info;
      if (
        rule_name === PRICE_TYPE_ENUM.FREE_MONTHLY ||
        rule_name === PRICE_TYPE_ENUM.FREE_YEARLY
      ) {
        setIsFree(true);
      }
      if (rule_name.startsWith('free')) {
        setPlanLocale(g('plans.free.title'));
      } else if (rule_name.startsWith('free')) {
        setPlanLocale(g('plans.basic.title'));
      } else if (rule_name.startsWith('monthly')) {
        setPlanLocale(g('plans.ultimate.title'));
      }
    },
  });

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        loading,
        is_free: isFree,
        plan_locale: planLocale,
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
