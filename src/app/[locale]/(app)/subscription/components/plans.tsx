'use client';
import { AntdTitle } from '@/components/antd';
import PrimaryButton from '@/components/primary-button';
import { RiCheckLine } from '@remixicon/react';
import { Button, Card, ConfigProvider, Segmented } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';

const Plans: React.FC = () => {
  const t = useTranslations('app.pages.subscription.plans');
  const p = useTranslations('global.plans');
  return (
    <Card id="package">
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
            defaultValue="yearly"
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
                        num: '16%',
                      })}
                      )
                    </span>
                  </>
                ),
                value: 'yearly',
              },
            ]}
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
              <span className="font-bold text-3xl">$0</span>
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
                color="primary"
                variant="filled"
                className="pointer-events-none"
              >
                {t('template.actions.current')}
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
                      strong: () => <strong>100</strong>,
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
              <div className="font-medium text-xs px-2 py-1 bg-primary-50 text-primary-500 rounded-r-full rounded-tl-full">
                {t('template.price.discount', {
                  num: '16%',
                })}
              </div>
            </div>
            <div className="space-x-1">
              <span className="font-bold text-3xl">$8.2</span>
              <span className="text-black/50">
                {t('template.price.suffix.monthly')}
              </span>
              <span className="text-black/30 line-through font-medium">
                $9.9
              </span>
            </div>
            <div className="text-sm text-black/50 line-clamp-2 leading-5 h-10">
              {p('basic.desc')}
            </div>
            <div>
              <PrimaryButton block>
                {t('template.actions.upgrade')}
              </PrimaryButton>
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
                      strong: () => <strong>12,000</strong>,
                    })}
                  </span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="text-primary-500">
                    <RiCheckLine size={16} />
                  </span>
                  <span>
                    {p.rich('basic.features.price', {
                      strong: () => <strong>$0.0007</strong>,
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
              <div className="font-medium text-xs px-2 py-1 bg-primary-50 text-primary-500 rounded-r-full rounded-tl-full">
                {t('template.price.discount', {
                  num: '16%',
                })}
              </div>
            </div>
            <div className="space-x-1">
              <span className="font-bold text-3xl">$24.1</span>
              <span className="text-black/50">
                /{t('template.price.suffix.monthly')}
              </span>
              <span className="text-black/30 line-through font-medium">
                $29.9
              </span>
            </div>
            <div className="text-sm text-black/50 line-clamp-2 leading-5 h-10">
              {p('premium.desc')}
            </div>
            <div>
              <PrimaryButton block>
                {t('template.actions.upgrade')}
              </PrimaryButton>
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
                      strong: () => <strong>120,000</strong>,
                    })}
                  </span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="text-primary-500">
                    <RiCheckLine size={16} />
                  </span>
                  <span>
                    {p.rich('premium.features.price', {
                      strong: () => <strong>$0.0002</strong>,
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
              <div className="font-medium text-xs px-2 py-1 bg-primary-50 text-primary-500 rounded-r-full rounded-tl-full">
                {t('template.price.discount', {
                  num: '16%',
                })}
              </div>
            </div>
            <div className="space-x-1">
              <span className="font-bold text-3xl">$65.8</span>
              <span className="text-black/50">
                /{t('template.price.suffix.monthly')}
              </span>
              <span className="text-black/30 line-through font-medium">
                $79.9
              </span>
            </div>
            <div className="text-sm text-black/50 line-clamp-2 leading-5 h-10">
              {p('ultimate.desc')}
            </div>
            <div>
              <PrimaryButton block>
                {t('template.actions.upgrade')}
              </PrimaryButton>
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
                      strong: () => <strong>1,200,000</strong>,
                    })}
                  </span>
                </li>
                <li className="flex gap-2 items-center">
                  <span className="text-primary-500">
                    <RiCheckLine size={16} />
                  </span>
                  <span>
                    {p.rich('ultimate.features.price', {
                      strong: () => <strong>$0.00006</strong>,
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
          link: (chunks) => <a href="">{chunks}</a>,
        })}
      </div>
    </Card>
  );
};

export default Plans;
