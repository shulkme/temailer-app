import { Card, Tag, TagProps } from 'antd';
import React from 'react';

const DomainCard: React.FC<{
  tag: {
    text: string;
    color: TagProps['color'];
  };
  title: string;
  desc: string;
  price: number;
  origin_price: number;
}> = ({ tag, price, origin_price, desc, title }) => {
  return (
    <Card>
      <div className="space-y-2">
        <Tag color={tag.color}>{tag.text}</Tag>
        <h3 className="font-bold text-xl">{title}</h3>
        <p className="text-xs text-black/75">{desc}</p>
        <div className="leading-none space-x-1">
          <span className="inline-block align-baseline text-primary-500 font-bold text-lg">
            ${price}
          </span>
          <span className="inline-block align-baseline text-black/50 line-through">
            ${origin_price}
          </span>
          <span className="inline-block align-baseline text-black/50">
            / 年
          </span>
        </div>
      </div>
    </Card>
  );
};

export default DomainCard;
