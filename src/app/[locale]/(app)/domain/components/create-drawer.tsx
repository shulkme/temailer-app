'use client';
import { DomainSuffixRecord } from '@/apis/domain/types';
import { useDomain } from '@/app/[locale]/(app)/domain/context';
import {
  AntdForm,
  AntdFormItem,
  AntdRadioButton,
  AntdRadioGroup,
  AntdTitle,
} from '@/components/antd';
import SliderScroller from '@/components/slider-scroller';
import { cn } from '@/utils/classname';
import { RiAddLargeLine } from '@remixicon/react';
import {
  Button,
  Checkbox,
  Collapse,
  ConfigProvider,
  Divider,
  Drawer,
  InputNumber,
  RadioProps,
  Select,
  Tag,
} from 'antd';
import { useLocale, useMessages, useTranslations } from 'next-intl';
import React, { useCallback, useEffect, useState } from 'react';

const DomainRadio: React.FC<
  RadioProps & {
    record: DomainSuffixRecord;
  }
> = ({ record, disabled, ...props }) => {
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

  return (
    <>
      <div className="w-80 relative shrink-0 snap-start">
        <AntdRadioButton
          disabled={disabled}
          className="block text-left border-[2px] h-auto leading-none p-0 m-0"
          {...props}
        >
          <div className="space-y-2 p-4">
            {renderTag(record)}
            <h3 className="font-bold text-xl">{record.name}</h3>
            <p className="text-xs text-black/75">{renderDesc(record)}</p>
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
        </AntdRadioButton>
      </div>
    </>
  );
};

const CreateDrawer: React.FC = () => {
  const t = useTranslations('app.pages.domain.create');
  const { suffix_list } = useDomain();
  const [open, setOpen] = useState(false);

  const messages = useMessages();
  const keys = Object.keys(messages.app.pages.domain.create.faq.items);

  useEffect(() => {
    const handler = (
      e: CustomEvent<{
        data: string;
      }>,
    ) => {
      setOpen(true);
    };

    window.addEventListener('domain:create', handler as EventListener);

    return () => {
      window.removeEventListener('domain:create', handler as EventListener);
    };
  }, []);

  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      title={t('title')}
      width={640}
      classNames={{
        header: 'border-0',
      }}
      footer={
        <div>
          <div className="py-4">
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span className="text-black/50">
                  {t('footer.summary.domains')}
                </span>
                <span className="font-medium">x1</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-black/50">
                  {t('footer.summary.price')}
                </span>
                <span className="font-medium text-lg">$9.9</span>
              </li>
            </ul>
          </div>
          <div>
            <Button block type="primary" size="large">
              {t('footer.actions.checkout')}
            </Button>
          </div>
        </div>
      }
    >
      <AntdForm layout="vertical">
        <AntdFormItem
          messageVariables={{
            label: t('form.suffix.label'),
          }}
          label={t('form.suffix.label')}
        >
          <AntdRadioGroup block className="block -my-2" defaultValue={'1'}>
            <SliderScroller
              navs={{
                size: 'small',
              }}
              classNames={{
                scroller: 'gap-4 lg:gap-6 py-2',
              }}
            >
              {suffix_list.map((item, index) => (
                <DomainRadio key={index} value={item.name} record={item} />
              ))}
            </SliderScroller>
          </AntdRadioGroup>
        </AntdFormItem>
        <AntdFormItem
          messageVariables={{
            label: t('form.quantity.label'),
          }}
          label={t('form.quantity.label')}
        >
          <InputNumber placeholder={'0'} />
        </AntdFormItem>
        <AntdFormItem
          messageVariables={{
            label: t('form.desired.label'),
          }}
          label={t('form.desired.label')}
        >
          <Select
            mode="tags"
            allowClear
            placeholder={t('form.desired.placeholder')}
          />
        </AntdFormItem>
        <AntdFormItem
          messageVariables={{
            label: t('form.alternatives.label'),
          }}
          label={t('form.alternatives.label')}
        >
          <Checkbox>{t('form.alternatives.placeholder')}</Checkbox>
        </AntdFormItem>
      </AntdForm>
      <Divider type="horizontal" />
      <AntdTitle level={5}>{t('faq.title')}</AntdTitle>
      <ConfigProvider
        theme={{
          components: {
            Collapse: {
              headerPadding: '8px 0',
              contentPadding: '0 0 0 12px',
            },
          },
        }}
      >
        <Collapse
          ghost
          expandIconPosition="end"
          expandIcon={({ isActive }) => (
            <RiAddLargeLine
              size={14}
              className={cn('transition', isActive && 'rotate-45')}
            />
          )}
          items={keys.map((_, i) => ({
            key: i.toString(),
            label: t(`faq.items.${i}.q`),
            children: (
              <div className="text-black/50 text-xs">
                {t(`faq.items.${i}.a`)}
              </div>
            ),
          }))}
        />
      </ConfigProvider>
    </Drawer>
  );
};

export default CreateDrawer;
