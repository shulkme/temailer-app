'use client';
import { checkoutByStripe } from '@/apis/checkout';
import { CHECKOUT_MODE_ENUM, PRICE_TYPE_ENUM } from '@/apis/checkout/enums';
import { CheckoutByStripeData } from '@/apis/checkout/types';
import { AntdParagraph, AntdTitle } from '@/components/antd';
import { useRequest } from 'ahooks';
import { App, Button, Card } from 'antd';
import { useTranslations } from 'next-intl';
import React, { useCallback, useState } from 'react';

type PRICE_TYPE =
  | PRICE_TYPE_ENUM.CREDIT_10
  | PRICE_TYPE_ENUM.CREDIT_20
  | PRICE_TYPE_ENUM.CREDIT_50
  | PRICE_TYPE_ENUM.CREDIT_100;

const prices: Record<
  PRICE_TYPE,
  {
    credits: number;
    price: number;
  }
> = {
  [PRICE_TYPE_ENUM.CREDIT_10]: {
    credits: 10000,
    price: 10,
  },
  [PRICE_TYPE_ENUM.CREDIT_20]: {
    credits: 50000,
    price: 20,
  },
  [PRICE_TYPE_ENUM.CREDIT_50]: {
    credits: 1000000,
    price: 50,
  },
  [PRICE_TYPE_ENUM.CREDIT_100]: {
    credits: 10000000,
    price: 100,
  },
} as const;

const Credits: React.FC = () => {
  const t = useTranslations('app.pages.subscription.credits');
  const { message } = App.useApp();
  const [loading, setLoading] = useState<PRICE_TYPE_ENUM>();

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

  const handleCheckout = useCallback(
    (price_type: PRICE_TYPE) => {
      setLoading(price_type);
      const amount = prices[price_type].price * 1000;

      const data: CheckoutByStripeData = {
        mode: CHECKOUT_MODE_ENUM.PAYMENT,
        price_type,
        product_data: {
          name: 'credits',
          description: prices[price_type].credits.toLocaleString(),
        },
        amount,
      };

      checkout(data);
    },
    [checkout],
  );
  return (
    <Card id="credit">
      <AntdTitle level={5} className="mb-6">
        {t('title')}
      </AntdTitle>
      <AntdParagraph type="secondary">{t('subtitle')}</AntdParagraph>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-6">
        <div className="col-span-1">
          <div className="w-full min-h-full border border-slate-200 p-4 lg:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-3xl">
                {prices.credit_10.credits.toLocaleString()}
              </span>
            </div>
            <div className="space-x-1">
              <span className="font-medium text-lg">
                ${prices.credit_10.price.toLocaleString()}
              </span>
              <span className="text-xs text-black/50">
                /{t('template.price.suffix')}
              </span>
            </div>
            <div className="text-sm">
              {t('template.tips')} <strong>$0.001</strong>
            </div>
            <div>
              <Button
                block
                color="primary"
                variant="outlined"
                loading={loading === PRICE_TYPE_ENUM.CREDIT_10}
                onClick={() => handleCheckout(PRICE_TYPE_ENUM.CREDIT_10)}
              >
                {t('template.action')}
              </Button>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="w-full min-h-full border border-slate-200 p-4 lg:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-3xl">
                {prices.credit_20.credits.toLocaleString()}
              </span>
            </div>
            <div className="space-x-1">
              <span className="font-medium text-lg">
                ${prices.credit_20.price.toLocaleString()}
              </span>
              <span className="text-xs text-black/50">
                /{t('template.price.suffix')}
              </span>
            </div>
            <div className="text-sm">
              {t('template.tips')} <strong>$0.0004</strong>
            </div>
            <div>
              <Button
                block
                color="primary"
                variant="outlined"
                loading={loading === PRICE_TYPE_ENUM.CREDIT_20}
                onClick={() => handleCheckout(PRICE_TYPE_ENUM.CREDIT_20)}
              >
                {t('template.action')}
              </Button>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="w-full min-h-full border border-slate-200 p-4 lg:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-3xl">
                {prices.credit_50.credits.toLocaleString()}
              </span>
            </div>
            <div className="space-x-1">
              <span className="font-medium text-lg">
                ${prices.credit_50.price.toLocaleString()}
              </span>
              <span className="text-xs text-black/50">
                /{t('template.price.suffix')}
              </span>
            </div>
            <div className="text-sm">
              {t('template.tips')} <strong>$0.00005</strong>
            </div>
            <div>
              <Button
                block
                color="primary"
                variant="outlined"
                loading={loading === PRICE_TYPE_ENUM.CREDIT_50}
                onClick={() => handleCheckout(PRICE_TYPE_ENUM.CREDIT_50)}
              >
                {t('template.action')}
              </Button>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="w-full min-h-full border border-slate-200 p-4 lg:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-3xl">
                {prices.credit_100.credits.toLocaleString()}
              </span>
            </div>
            <div className="space-x-1">
              <span className="font-medium text-lg">
                ${prices.credit_100.price.toLocaleString()}
              </span>
              <span className="text-xs text-black/50">
                /{t('template.price.suffix')}
              </span>
            </div>
            <div className="text-sm">
              {t('template.tips')} <strong>$0.00001</strong>
            </div>
            <div>
              <Button
                block
                color="primary"
                variant="outlined"
                loading={loading === PRICE_TYPE_ENUM.CREDIT_100}
                onClick={() => handleCheckout(PRICE_TYPE_ENUM.CREDIT_100)}
              >
                {t('template.action')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Credits;
