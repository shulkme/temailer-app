'use client';
import { AntdParagraph, AntdTitle } from '@/components/antd';
import PrimaryButton from '@/components/primary-button';
import { Link } from '@/i18n/navigation';
import { useCredit } from '@/providers/credit';
import { RiVipCrown2Line } from '@remixicon/react';
import { Avatar, Button, Card } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';

const Credit: React.FC = () => {
  const { available } = useCredit();
  const t = useTranslations('app.pages.dashboard.wallet');
  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar shape="square" className="bg-transparent text-primary-500">
            <RiVipCrown2Line size={32} />
          </Avatar>
          <AntdTitle level={5} className="m-0">
            免费版
          </AntdTitle>
        </div>
        <div className="w-full overflow-hidden bg-blue-500/5 rounded-(--ant-border-radius) p-6 relative">
          <div className="absolute bottom-0 right-0 h-full w-1/3 bg-linear-[190deg] from-blue-200/50 to-transparent to-90% -skew-x-45 translate-x-1/2"></div>
          <div className="relative z-10">
            <AntdParagraph className="mb-2" type="secondary">
              剩余积分
            </AntdParagraph>
            <div className="flex justify-between items-center flex-wrap">
              <AntdTitle level={3} className="m-0">
                {available.toLocaleString() || 0}
              </AntdTitle>
              <Link href="/subscription#credit">
                <Button shape="round" size="small" type="primary">
                  {t('recharge')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <Link href="/subscription#package">
            <PrimaryButton block size="large">
              升级套餐
            </PrimaryButton>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default Credit;
