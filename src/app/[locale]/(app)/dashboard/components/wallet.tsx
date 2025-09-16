'use client';
import { AntdParagraph, AntdTitle } from '@/components/antd';
import { Link } from '@/i18n/navigation';
import { useCredit } from '@/providers/credit';
import { RiWalletLine } from '@remixicon/react';
import { Avatar, Button, Card } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';

const Wallet: React.FC = () => {
  const { available } = useCredit();
  const t = useTranslations('app.pages.dashboard.wallet');
  return (
    <Card>
      <div className="flex items-center gap-4 mb-4">
        <Avatar
          shape="square"
          className="bg-blue-50 text-blue-500 border border-blue-100"
        >
          <RiWalletLine size={24} />
        </Avatar>
        <AntdTitle level={5} className="m-0">
          {t('title')}
        </AntdTitle>
      </div>
      <div className="w-full overflow-hidden bg-blue-500/5 rounded-(--ant-border-radius) p-6 relative">
        <div className="absolute bottom-0 right-0 h-full w-1/3 bg-linear-[190deg] from-blue-200/50 to-transparent to-90% -skew-x-45 translate-x-1/2"></div>
        <div className="relative z-10">
          <AntdParagraph className="mb-2" type="secondary">
            {t('balance')}
          </AntdParagraph>
          <div className="flex justify-between items-center flex-wrap">
            <AntdTitle level={3} className="m-0">
              ${available.toLocaleString() || 0}
            </AntdTitle>
            <Link href="/wallet/recharge">
              <Button shape="round" size="small" type="primary">
                {t('recharge')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Wallet;
