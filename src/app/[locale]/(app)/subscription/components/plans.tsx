'use client';
import { checkoutByStripe } from '@/apis/checkout';
import { CHECKOUT_MODE_ENUM, PRICE_TYPE_ENUM } from '@/apis/checkout/enums';
import { CheckoutByStripeData } from '@/apis/checkout/types';
import { AntdTitle } from '@/components/antd';
import PrimaryButton from '@/components/primary-button';
import { useSubscription } from '@/providers/subscription';
import { RiCheckLine } from '@remixicon/react';
import { useRequest } from 'ahooks';
import { App, Button, Card, ConfigProvider, Segmented } from 'antd';
import { useTranslations } from 'next-intl';
import React, { useCallback, useState } from 'react';

type PlanType = 'free' | 'basic' | 'premium' | 'ultimate';

const discount = 0.2 as const;

const plans: Record<
  PlanType,
  {
    price: number;
    credits: number;
  }
> = {
  free: {
    price: 0,
    credits: 100,
  },
  basic: {
    price: 9.9,
    credits: 5000,
  },
  premium: {
    price: 29.9,
    credits: 50000,
  },
  ultimate: {
    price: 79.9,
    credits: 500000,
  },
};

const Plans: React.FC = () => {
  const t = useTranslations('app.pages.subscription.plans');
  const p = useTranslations('global.plans');
  const { plan, subscription } = useSubscription();
  const [period, setPeriod] = useState('yearly');
  const [loading, setLoading] = useState<PlanType>();
  const { message } = App.useApp();

  const { run: checkout } = useRequest(checkoutByStripe, {
    manual: true,
    onSuccess: (res) => {
      window.open(res.data.url);
    },
    onError: (e) => {
      message.error(e.message);
    },
    onFinally: () => {
      setLoading(undefined);
    },
  });

  const renderPrice = useCallback(
    (plan: PlanType) => {
      let price = 0;
      switch (plan) {
        case 'free':
          price = plans.free.price;
          break;
        case 'basic':
          price = plans.basic.price;
          break;
        case 'premium':
          price = plans.premium.price;
          break;
        case 'ultimate':
          price = plans.ultimate.price;
          break;
      }
      if (period === 'yearly') {
        price *= 1 - discount;
      }
      return price.toLocaleString('en-US', {
        maximumFractionDigits: 1,
      });
    },
    [period],
  );

  const renderPerPrice = useCallback(
    (plan: PlanType) => {
      let price = 0;
      switch (plan) {
        case 'free':
          price = plans.free.price / plans.free.credits;
          break;
        case 'basic':
          price = plans.basic.price / plans.basic.credits;
          break;
        case 'premium':
          price = plans.premium.price / plans.premium.credits;
          break;
        case 'ultimate':
          price = plans.ultimate.price / plans.ultimate.credits;
          break;
      }
      if (period === 'yearly') {
        price *= 1 - discount;
      }
      return price.toLocaleString('en-US', {
        maximumFractionDigits: 4,
      });
    },
    [period],
  );

  const handleCheckout = useCallback(
    (plan_type: PlanType) => {
      setLoading(plan_type);
      let amount = 0;
      let price_type: PRICE_TYPE_ENUM = PRICE_TYPE_ENUM.FREE_MONTHLY;
      switch (plan_type) {
        case 'free':
          amount = plans.free.price;
          price_type =
            period === 'yearly'
              ? PRICE_TYPE_ENUM.FREE_YEARLY
              : PRICE_TYPE_ENUM.FREE_MONTHLY;
          break;
        case 'basic':
          amount = plans.basic.price;
          price_type =
            period === 'yearly'
              ? PRICE_TYPE_ENUM.BASIC_YEARLY
              : PRICE_TYPE_ENUM.BASIC_MONTHLY;
          break;
        case 'premium':
          amount = plans.premium.price;
          price_type =
            period === 'yearly'
              ? PRICE_TYPE_ENUM.PREMIUM_YEARLY
              : PRICE_TYPE_ENUM.PREMIUM_MONTHLY;
          break;
        case 'ultimate':
          amount = plans.ultimate.price;
          price_type =
            period === 'yearly'
              ? PRICE_TYPE_ENUM.ULTIMATE_YEARLY
              : PRICE_TYPE_ENUM.ULTIMATE_MONTHLY;
          break;
      }

      if (period === 'yearly') {
        amount = amount * 12 * (1 - discount);
      }

      const data: CheckoutByStripeData = {
        mode: CHECKOUT_MODE_ENUM.SUBSCRIPTION,
        price_type,
        product_data: {
          name: subscription?.subscription_info.rule_name || 'subscription',
          description: subscription?.subscription_info.description || '',
        },
        amount: Math.round(amount),
      };

      checkout(data);
    },
    [
      checkout,
      period,
      subscription?.subscription_info.description,
      subscription?.subscription_info.rule_name,
    ],
  );

  return (
    <Card id="plan">
      <AntdTitle level={5} className="mb-6">
        {t('title')}
      </AntdTitle>
      <div className="mb-6">
        <ConfigProvider
          theme={{
            components: {
              Segmented: {
                controlPaddingHorizontal: 32,
                trackPadding: 4,
                // trackBg: 'var(--color-primary-100)',
              },
            },
          }}
        >
          <Segmented
            value={period}
            size="large"
            options={[
              {
                label: <>{t('period.monthly')}</>,
                value: 'monthly',
              },
              {
                label: (
                  <>
                    {t('period.yearly')}
                    <span className="text-primary-500 font-medium">
                      (
                      {t('template.price.discount', {
                        num: discount * 100 + '%',
                      })}
                      )
                    </span>
                  </>
                ),
                value: 'yearly',
              },
            ]}
            onChange={setPeriod}
          />
        </ConfigProvider>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-6">
        <div className="col-span-1">
          <div className="w-full min-h-full border border-slate-200 p-4 lg:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="font-medium text-lg">{p('free.title')}</div>
            </div>
            <div className="space-x-1">
              <span className="font-bold text-3xl">${renderPrice('free')}</span>
              <span className="text-black/50">
                /{t('template.price.suffix.monthly')}
              </span>
            </div>
            <div className="text-sm text-black/50 line-clamp-2 leading-5 h-10">
              {p('free.desc')}
            </div>
            <div>
              <Button
                block
                disabled={plan !== 'free'}
                color="primary"
                variant="filled"
                className="pointer-events-none"
              >
                {plan === 'free'
                  ? t('template.actions.current')
                  : t('template.actions.free')}
              </Button>
            </div>
            <div className="border-t border-slate-100 my-6"></div>
            <div>
              <ul className="space-y-4">
                <li className="flex gap-2 items-center">
                  <span className="text-primary-500">
                    <RiCheckLine size={16} />
                  </span>
                  <span>
                    {p.rich('free.features.credits', {
                      strong: () => (
                        <strong>{plans.free.credits.toLocaleString()}</strong>
                      ),
                    })}
                  </span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="text-primary-500">
                    <RiCheckLine size={16} />
                  </span>
                  <span>{p('free.features.emailSupport')}</span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="text-primary-500">
                    <RiCheckLine size={16} />
                  </span>
                  <span>
                    {p.rich('free.features.sentLimit', {
                      strong: () => <strong>1,000</strong>,
                    })}
                  </span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="text-primary-500">
                    <RiCheckLine size={16} />
                  </span>
                  <span>{p('free.features.customerSupport')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="w-full min-h-full border border-slate-200 p-4 lg:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="font-medium text-lg">{p('basic.title')}</div>
              {period === 'yearly' && (
                <div className="font-medium text-xs px-2 py-1 bg-primary-50 text-primary-500 rounded-r-full rounded-tl-full">
                  {t('template.price.discount', {
                    num: discount * 100 + '%',
                  })}
                </div>
              )}
            </div>
            <div className="space-x-1">
              <span className="font-bold text-3xl">
                ${renderPrice('basic')}
              </span>
              <span className="text-black/50">
                /{t('template.price.suffix.monthly')}
              </span>
              {period === 'yearly' && (
                <span className="text-black/30 line-through font-medium">
                  ${plans.basic.price.toLocaleString()}
                </span>
              )}
            </div>
            <div className="text-sm text-black/50 line-clamp-2 leading-5 h-10">
              {p('basic.desc')}
            </div>
            <div>
              {plan === 'basic' ? (
                <Button
                  block
                  color="primary"
                  variant="filled"
                  className="pointer-events-none"
                >
                  {t('template.actions.current')}
                </Button>
              ) : (
                <PrimaryButton
                  block
                  loading={loading === 'basic'}
                  disabled={plan !== 'free'}
                  onClick={() => handleCheckout('basic')}
                >
                  {t('template.actions.upgrade')}
                </PrimaryButton>
              )}
            </div>
            <div className="border-t border-slate-100 my-6"></div>
            <div>
              <ul className="space-y-4">
                <li className="flex gap-2 items-center">
                  <span className="text-primary-500">
                    <RiCheckLine size={16} />
                  </span>
                  <span>
                    {p.rich('basic.features.credits', {
                      strong: () => (
                        <strong>{plans.basic.credits.toLocaleString()}</strong>
                      ),
                    })}
                  </span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="text-primary-500">
                    <RiCheckLine size={16} />
                  </span>
                  <span>
                    {p.rich('basic.features.price', {
                      strong: () => <strong>{renderPerPrice('basic')}</strong>,
                    })}
                  </span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="text-primary-500">
                    <RiCheckLine size={16} />
                  </span>
                  <span>
                    {p.rich('basic.features.emailSupport', {
                      strong: (chunks) => (
                        <strong className="text-primary-500">{chunks}</strong>
                      ),
                    })}
                  </span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="text-primary-500">
                    <RiCheckLine size={16} />
                  </span>
                  <span>{p('basic.features.apiSupport')}</span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="text-primary-500">
                    <RiCheckLine size={16} />
                  </span>
                  <span>{p('basic.features.sentLimit')}</span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="text-primary-500">
                    <RiCheckLine size={16} />
                  </span>
                  <span>{p('basic.features.customDomain')}</span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="text-primary-500">
                    <RiCheckLine size={16} />
                  </span>
                  <span>{p('basic.features.customerSupport')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="relative w-full min-h-full border-[2px] border-primary-500 p-4 lg:p-6 space-y-4">
            <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
              <div className="absolute w-[200%] py-1 top-1/3 -left-1/3 -translate-y-1/3 rotate-45 bg-primary-500 text-xs text-white text-center">
                {t('template.price.best')}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="font-medium text-lg">{p('premium.title')}</div>
              {period === 'yearly' && (
                <div className="font-medium text-xs px-2 py-1 bg-primary-50 text-primary-500 rounded-r-full rounded-tl-full">
                  {t('template.price.discount', {
                    num: discount * 100 + '%',
                  })}
                </div>
              )}
            </div>
            <div className="space-x-1">
              <span className="font-bold text-3xl">
                ${renderPrice('premium')}
              </span>
              <span className="text-black/50">
                /{t('template.price.suffix.monthly')}
              </span>
              {period === 'yearly' && (
                <span className="text-black/30 line-through font-medium">
                  ${plans.premium.price.toLocaleString()}
                </span>
              )}
            </div>
            <div className="text-sm text-black/50 line-clamp-2 leading-5 h-10">
              {p('premium.desc')}
            </div>
            <div>
              {plan === 'premium' ? (
                <Button
                  block
                  color="primary"
                  variant="filled"
                  className="pointer-events-none"
                >
                  {t('template.actions.current')}
                </Button>
              ) : (
                <PrimaryButton
                  block
                  loading={loading === 'premium'}
                  disabled={plan === 'ultimate'}
                  onClick={() => handleCheckout('premium')}
                >
                  {t('template.actions.upgrade')}
                </PrimaryButton>
              )}
            </div>
            <div className="border-t border-slate-100 my-6"></div>
            <div>
              <ul className="space-y-4">
                <li className="flex gap-2 items-center">
                  <span className="text-primary-500">
                    <RiCheckLine size={16} />
                  </span>
                  <span>
                    {p.rich('premium.features.credits', {
                      strong: () => (
                        <strong>
                          {plans.premium.credits.toLocaleString()}
                        </strong>
                      ),
                    })}
                  </span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="text-primary-500">
                    <RiCheckLine size={16} />
                  </span>
                  <span>
                    {p.rich('premium.features.price', {
                      strong: () => (
                        <strong>{renderPerPrice('premium')}</strong>
                      ),
                    })}
                  </span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="text-primary-500">
                    <RiCheckLine size={16} />
                  </span>
                  <span>
                    {p.rich('premium.features.emailSupport', {
                      strong: (chunks) => (
                        <strong className="text-primary-500">{chunks}</strong>
                      ),
                    })}
                  </span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="text-primary-500">
                    <RiCheckLine size={16} />
                  </span>
                  <span>{p('premium.features.apiSupport')}</span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="text-primary-500">
                    <RiCheckLine size={16} />
                  </span>
                  <span>{p('premium.features.sentLimit')}</span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="text-primary-500">
                    <RiCheckLine size={16} />
                  </span>
                  <span>{p('premium.features.customDomain')}</span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="text-primary-500">
                    <RiCheckLine size={16} />
                  </span>
                  <span>{p('premium.features.customerSupport')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="w-full min-h-full border border-slate-200 p-4 lg:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="font-medium text-lg">{p('ultimate.title')}</div>
              {period === 'yearly' && (
                <div className="font-medium text-xs px-2 py-1 bg-primary-50 text-primary-500 rounded-r-full rounded-tl-full">
                  {t('template.price.discount', {
                    num: discount * 100 + '%',
                  })}
                </div>
              )}
            </div>
            <div className="space-x-1">
              <span className="font-bold text-3xl">
                ${renderPrice('ultimate')}
              </span>
              <span className="text-black/50">
                /{t('template.price.suffix.monthly')}
              </span>
              {period === 'yearly' && (
                <span className="text-black/30 line-through font-medium">
                  ${plans.ultimate.price.toLocaleString()}
                </span>
              )}
            </div>
            <div className="text-sm text-black/50 line-clamp-2 leading-5 h-10">
              {p('ultimate.desc')}
            </div>
            <div>
              {plan === 'ultimate' ? (
                <Button
                  block
                  color="primary"
                  variant="filled"
                  className="pointer-events-none"
                >
                  {t('template.actions.current')}
                </Button>
              ) : (
                <PrimaryButton
                  block
                  loading={loading === 'ultimate'}
                  onClick={() => handleCheckout('ultimate')}
                >
                  {t('template.actions.upgrade')}
                </PrimaryButton>
              )}
            </div>
            <div className="border-t border-slate-100 my-6"></div>
            <div>
              <ul className="space-y-4">
                <li className="flex gap-2 items-center">
                  <span className="text-primary-500">
                    <RiCheckLine size={16} />
                  </span>
                  <span>
                    {p.rich('ultimate.features.credits', {
                      strong: () => (
                        <strong>
                          {plans.ultimate.credits.toLocaleString()}
                        </strong>
                      ),
                    })}
                  </span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="text-primary-500">
                    <RiCheckLine size={16} />
                  </span>
                  <span>
                    {p.rich('ultimate.features.price', {
                      strong: () => (
                        <strong>{renderPerPrice('ultimate')}</strong>
                      ),
                    })}
                  </span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="text-primary-500">
                    <RiCheckLine size={16} />
                  </span>
                  <span>
                    {p.rich('ultimate.features.emailSupport', {
                      strong: (chunks) => (
                        <strong className="text-primary-500">{chunks}</strong>
                      ),
                    })}
                  </span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="text-primary-500">
                    <RiCheckLine size={16} />
                  </span>
                  <span>{p('ultimate.features.apiSupport')}</span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="text-primary-500">
                    <RiCheckLine size={16} />
                  </span>
                  <span>{p('ultimate.features.sentLimit')}</span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="text-primary-500">
                    <RiCheckLine size={16} />
                  </span>
                  <span>{p('ultimate.features.customDomain')}</span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="text-primary-500">
                    <RiCheckLine size={16} />
                  </span>
                  <span>
                    {p.rich('ultimate.features.freeDomain', {
                      strong: (chunks) => (
                        <strong className="text-primary-500">{chunks}</strong>
                      ),
                      num: 1,
                    })}
                  </span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="text-primary-500">
                    <RiCheckLine size={16} />
                  </span>
                  <span>{p('ultimate.features.customerSupport')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-6">
        {t.rich('tips', {
          link: (chunks) => (
            <a target="_blank" href={process.env.NEXT_PUBLIC_SUPPORT_TELEGRAM}>
              {chunks}
            </a>
          ),
        })}
      </div>
    </Card>
  );
};

export default Plans;
