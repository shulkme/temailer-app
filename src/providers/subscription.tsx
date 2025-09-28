'use client';
import { PRICE_TYPE_ENUM } from '@/apis/checkout/enums';
import { getCurrentSubscription } from '@/apis/credit';
import { PLAN_PERIOD_ENUM } from '@/apis/credit/enums';
import { CreditSubscriptionPlanRecord } from '@/apis/credit/types';
import { useRequest } from 'ahooks';
import { useTranslations } from 'next-intl';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

export interface PlanRecord {
  key: string;
  fullKey: PRICE_TYPE_ENUM;
  period: PLAN_PERIOD_ENUM;
  name: string;
  fullName: string;
}

const SubscriptionContext = createContext<{
  subscription?: CreditSubscriptionPlanRecord;
  loading?: boolean;
  is_free?: boolean;
  plan: PlanRecord;
  getPlanLocaleConfig: (price?: PRICE_TYPE_ENUM) => PlanRecord | undefined;
} | null>(null);

const SubscriptionProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const g = useTranslations('global');
  const [subscription, setSubscription] =
    useState<CreditSubscriptionPlanRecord>();
  const [isFree, setIsFree] = useState(true);
  const [plan, setPlan] = useState<PlanRecord>({
    period: PLAN_PERIOD_ENUM.MONTHLY,
    key: 'free',
    fullKey: PRICE_TYPE_ENUM.FREE_MONTHLY,
    name: g('plans.free.title'),
    fullName: g('plans.free.title'),
  });

  const getPlanLocaleConfig = useCallback(
    (price?: PRICE_TYPE_ENUM) => {
      switch (price) {
        case PRICE_TYPE_ENUM.FREE_MONTHLY:
        case PRICE_TYPE_ENUM.FREE_YEARLY:
          return {
            key: 'free',
            fullKey: PRICE_TYPE_ENUM.FREE_MONTHLY,
            period: PLAN_PERIOD_ENUM.MONTHLY,
            name: g('plans.free.title'),
            fullName: g('plans.free.title'),
          };
        case PRICE_TYPE_ENUM.BASIC_MONTHLY:
          return {
            key: 'basic',
            fullKey: PRICE_TYPE_ENUM.BASIC_MONTHLY,
            period: PLAN_PERIOD_ENUM.MONTHLY,
            name: g('plans.basic.title'),
            fullName: [g('plans.basic.title'), g('units.monthly')].join(' / '),
          };
        case PRICE_TYPE_ENUM.BASIC_YEARLY:
          return {
            key: 'basic',
            fullKey: PRICE_TYPE_ENUM.BASIC_YEARLY,
            period: PLAN_PERIOD_ENUM.YEARLY,
            name: g('plans.basic.title'),
            fullName: [g('plans.basic.title'), g('units.yearly')].join(' / '),
          };
        case PRICE_TYPE_ENUM.PREMIUM_MONTHLY:
          return {
            key: 'premium',
            fullKey: PRICE_TYPE_ENUM.PREMIUM_MONTHLY,
            period: PLAN_PERIOD_ENUM.MONTHLY,
            name: g('plans.premium.title'),
            fullName: [g('plans.premium.title'), g('units.monthly')].join(
              ' / ',
            ),
          };
        case PRICE_TYPE_ENUM.PREMIUM_YEARLY:
          return {
            key: 'premium',
            fullKey: PRICE_TYPE_ENUM.PREMIUM_YEARLY,
            period: PLAN_PERIOD_ENUM.YEARLY,
            name: g('plans.premium.title'),
            fullName: [g('plans.premium.title'), g('units.yearly')].join(' / '),
          };
        case PRICE_TYPE_ENUM.ULTIMATE_MONTHLY:
          return {
            key: 'ultimate',
            fullKey: PRICE_TYPE_ENUM.ULTIMATE_MONTHLY,
            period: PLAN_PERIOD_ENUM.MONTHLY,
            name: g('plans.ultimate.title'),
            fullName: [g('plans.ultimate.title'), g('units.monthly')].join(
              ' / ',
            ),
          };
        case PRICE_TYPE_ENUM.ULTIMATE_YEARLY:
          return {
            key: 'ultimate',
            fullKey: PRICE_TYPE_ENUM.ULTIMATE_YEARLY,
            period: PLAN_PERIOD_ENUM.YEARLY,
            name: g('plans.ultimate.title'),
            fullName: [g('plans.ultimate.title'), g('units.yearly')].join(
              ' / ',
            ),
          };
      }
    },
    [g],
  );

  const { loading, refresh } = useRequest(getCurrentSubscription, {
    onSuccess: (res) => {
      setSubscription(res.data);
      const { rule_name } = res.data?.subscription_info || {};
      setIsFree(
        rule_name === PRICE_TYPE_ENUM.FREE_MONTHLY ||
          rule_name === PRICE_TYPE_ENUM.FREE_YEARLY,
      );

      const plan = getPlanLocaleConfig(rule_name);
      if (plan) {
        setPlan(plan);
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
        plan,
        getPlanLocaleConfig,
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
