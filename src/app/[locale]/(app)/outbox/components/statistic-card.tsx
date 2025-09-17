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
    <>
      <Card>
        <Statistic
          title={title}
          value={value}
          prefix={prefix}
          suffix={suffix}
          valueStyle={valueStyle}
        />
      </Card>
    </>
  );
};

export default StatisticCard;
