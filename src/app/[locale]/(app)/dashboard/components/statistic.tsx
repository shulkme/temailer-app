import { AntdText, AntdTitle } from '@/components/antd';
import {
  RemixiconComponentType,
  RiArchive2Line,
  RiGlobalLine,
  RiMailOpenLine,
  RiMailSendLine,
} from '@remixicon/react';
import { Avatar, Card } from 'antd';
import React from 'react';

const StatisticItem: React.FC<{
  icon: RemixiconComponentType;
  value: number;
  title: string;
}> = ({ icon, title, value }) => {
  return (
    <div className="h-auto border border-transparent rounded-sm leading-none p-4">
      <div className="flex items-center gap-6">
        <Avatar
          size={48}
          shape="square"
          className="bg-white border border-slate-200 text-(--ant-color-primary)"
        >
          {React.createElement(icon, {
            size: 32,
          })}
        </Avatar>
        <div>
          <AntdText type="secondary" className="text-xs mb-2">
            {title}
          </AntdText>
          <AntdTitle level={3} className="m-0">
            {value.toLocaleString()}
          </AntdTitle>
        </div>
      </div>
    </div>
  );
};

const Statistic: React.FC = () => {
  return (
    <Card>
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-2 2xl:grid-cols-4 gap-4">
        <StatisticItem icon={RiMailOpenLine} title={'收信数'} value={1234} />
        <StatisticItem icon={RiMailSendLine} title={'发信数'} value={1234} />
        <StatisticItem icon={RiGlobalLine} title={'域名数'} value={0} />
        <StatisticItem icon={RiArchive2Line} title={'收藏数'} value={0} />
      </div>
    </Card>
  );
};

export default Statistic;
