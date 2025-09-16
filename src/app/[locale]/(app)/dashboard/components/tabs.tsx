import { AntdText, AntdTitle } from '@/components/antd';
import {
  RemixiconComponentType,
  RiArchive2Line,
  RiGlobalLine,
  RiMailOpenLine,
  RiMailSendLine,
} from '@remixicon/react';
import { Avatar, Card } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';

const RadioTab: React.FC<{
  icon: RemixiconComponentType;
  value: string;
  title: string;
  desc: React.ReactNode;
}> = ({ icon, title, desc }) => {
  return (
    <div className="h-auto border border-transparent rounded-sm leading-none p-4 before:hidden hover:bg-slate-50 [&.ant-radio-button-wrapper-checked]:border-slate-200 [&.ant-radio-button-wrapper-checked]:bg-slate-50">
      <div className="w-full text-left space-y-2">
        <div className="flex items-center gap-4">
          <Avatar
            shape="square"
            className="bg-white border border-slate-200 text-(--ant-color-primary)"
          >
            {React.createElement(icon, {
              size: 24,
            })}
          </Avatar>
          <AntdTitle level={5} className="m-0">
            {title}
          </AntdTitle>
        </div>
        <div>
          <AntdText type="secondary">{desc}</AntdText>
        </div>
      </div>
    </div>
  );
};

const Tabs: React.FC = () => {
  const t = useTranslations('app.pages.dashboard.tabs');
  return (
    <Card>
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-2 2xl:grid-cols-4 gap-4">
        <RadioTab
          icon={RiMailOpenLine}
          title={'收信'}
          value="isp"
          desc={t.rich('isp.desc', {
            strong: () => <span className="text-black font-medium">$0.22</span>,
          })}
        />
        <RadioTab
          icon={RiMailSendLine}
          title={'发信'}
          value="datacenter"
          desc={t.rich('datacenter.desc', {
            strong: () => <span className="text-black font-medium">$0.11</span>,
          })}
        />
        <RadioTab
          icon={RiGlobalLine}
          title={'域名'}
          value="residential"
          desc={t.rich('residential.desc', {
            strong: () => <span className="text-black font-medium">$1.5</span>,
          })}
        />
        <RadioTab
          icon={RiArchive2Line}
          title={'收藏'}
          value="mobile"
          desc={t.rich('mobile.desc', {
            strong: () => <span className="text-black font-medium">$1.7</span>,
          })}
        />
      </div>
    </Card>
  );
};

export default Tabs;
