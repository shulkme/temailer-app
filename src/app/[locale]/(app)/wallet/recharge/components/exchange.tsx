'use client';
import { useRecharge } from '@/app/[locale]/(app)/wallet/recharge/context';
import {
  AntdParagraph,
  AntdSkeletonButton,
  AntdText,
  AntdTitle,
} from '@/components/antd';
import InputNumber from '@/components/antd/input-number';
import { Link } from '@/i18n/navigation';
import WalletIcon from '@/icons/wallet-icon';
import { useCredit } from '@/providers/credit';
import { Button, Card, ConfigProvider, Space } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';

const Exchange: React.FC = () => {
  const t = useTranslations('app.pages.wallet.recharge');
  const { available, loading } = useCredit();
  const { amount, setAmount } = useRecharge();

  const handlePresetChange = (value: number) => {
    setAmount((prev) => prev + value);
  };
  return (
    <>
      <Card>
        <div className="w-full overflow-hidden bg-blue-500/5 rounded-xs p-6 relative">
          <div className="absolute bottom-0 right-0 h-full w-1/3 bg-linear-[190deg] from-blue-200/50 to-transparent to-90% -skew-x-45 translate-x-1/2"></div>
          <div className="flex items-center gap-6 relative z-10">
            <div className="flex-none text-(--ant-color-primary)">
              <WalletIcon width={32} height={32} />
            </div>
            <div className="flex-auto">
              <AntdParagraph strong className="m-0">
                {t('exchange.current.label')}
              </AntdParagraph>
              {loading ? (
                <AntdSkeletonButton />
              ) : (
                <AntdTitle level={3} className="m-0">
                  $ {available.toLocaleString()}
                </AntdTitle>
              )}
            </div>
            <div className="flex-none">
              <Link href="/wallet/transactions">
                {t('exchange.current.extra')}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <AntdTitle level={5} className="mb-8">
            {t('exchange.amount.title')}
          </AntdTitle>
          <ConfigProvider
            theme={{
              components: {
                InputNumber: {
                  inputFontSizeLG: 32,
                },
              },
            }}
          >
            <div>
              <InputNumber
                value={amount}
                style={{ width: 200 }}
                size="large"
                variant="underlined"
                prefix={<span className="text-3xl">$</span>}
                min={10}
                max={10000}
                step={1}
                onChange={(v) => setAmount(v as number)}
              />
            </div>
            <div className="mt-8">
              <Space size="middle">
                <Button onClick={() => handlePresetChange(10)}>+$10</Button>
                <Button onClick={() => handlePresetChange(50)}>+$50</Button>
                <Button onClick={() => handlePresetChange(100)}>+$100</Button>
                <Button onClick={() => handlePresetChange(500)}>+$500</Button>
                <Button onClick={() => handlePresetChange(1000)}>+$1000</Button>
              </Space>
            </div>
            <div className="mt-4">
              <AntdText type="secondary">
                {t('exchange.amount.tips', {
                  number: 10,
                })}
              </AntdText>
            </div>
          </ConfigProvider>
        </div>
      </Card>
    </>
  );
};

export default Exchange;
