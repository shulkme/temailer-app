import { Card, Statistic } from 'antd';
import React from 'react';

const StatisticCard: React.FC<{
  title: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
  valueStyle?: React.CSSProperties;
}> = ({ title, value, prefix, suffix, valueStyle }) => {
  return (
    <div className="w-64 relative shrink-0 snap-start">
      <Card>
        <Statistic
          title={title}
          value={value}
          prefix={prefix}
          suffix={suffix}
          valueStyle={valueStyle}
        />
      </Card>
    </div>
  );
};

export default StatisticCard;
