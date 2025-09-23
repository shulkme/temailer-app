'use client';
import { DomainSuffixRecord } from '@/apis/domain/types';
import { useDomain } from '@/app/[locale]/(app)/domain/context';
import SliderScroller from '@/components/slider-scroller';
import { Card, Tag } from 'antd';
import { useLocale, useTranslations } from 'next-intl';
import React, { useCallback } from 'react';

const DomainItem: React.FC<{
  record: DomainSuffixRecord;
}> = ({ record }) => {
  const g = useTranslations('global');
  const locale = useLocale();

  const renderDesc = useCallback(
    (record: DomainSuffixRecord) => {
      switch (locale) {
        case 'en':
          return record.description.en_US;
        case 'zh':
          return record.description.zh_CN;
      }
      return '--';
    },
    [locale],
  );

  const renderTag = useCallback(
    (record: DomainSuffixRecord) => {
      switch (record.tag) {
        case 'HOT':
          return <Tag color="red">{g('tags.hot')}</Tag>;
        case 'REC':
          return <Tag color="blue">{g('tags.rec')}</Tag>;
        case 'DISCOUNT':
          return <Tag color="orange">{g('tags.discount')}</Tag>;
      }
      return <Tag color="default">{record.tag}</Tag>;
    },
    [g],
  );

  const onClick = useCallback(() => {
    window.dispatchEvent(
      new CustomEvent('domain:create', {
        detail: {
          name: record.name,
        },
      }),
    );
  }, [record]);

  return (
    <div className="w-64 relative shrink-0 snap-start" onClick={onClick}>
      <Card className="cursor-pointer hover:border-primary-500">
        <div className="space-y-2">
          {renderTag(record)}
          <h3 className="font-bold text-xl">{record.name}</h3>
          <p className="text-xs text-black/75 line-clamp-1">
            {renderDesc(record)}
          </p>
          <div className="leading-none space-x-1">
            <span className="inline-block align-baseline text-primary-500 font-bold text-lg">
              ${record.price}
            </span>
            <span className="inline-block align-baseline text-black/50 line-through">
              ${record.original_price}
            </span>
            <span className="inline-block align-baseline text-black/50">
              / {g('units.year', { num: 0 })}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

const DomainList: React.FC = () => {
  const { suffix_list } = useDomain();

  return (
    <SliderScroller
      navs={{
        size: 'small',
      }}
      classNames={{
        scroller: 'gap-4 lg:gap-6',
      }}
    >
      {suffix_list.map((item, index) => (
        <DomainItem key={index} record={item} />
      ))}
    </SliderScroller>
  );
};

export default DomainList;
