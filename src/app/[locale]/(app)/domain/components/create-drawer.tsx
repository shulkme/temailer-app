'use client';
import {
  AntdForm,
  AntdFormItem,
  AntdInput,
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
  Tag,
  TagProps,
} from 'antd';
import { useMessages, useTranslations } from 'next-intl';
import React from 'react';

const DomainRadio: React.FC<
  RadioProps & {
    tag: {
      text: string;
      color: TagProps['color'];
    };
    title: string;
    desc: string;
    price: number;
    origin_price: number;
  }
> = ({ tag, price, origin_price, desc, title, disabled, ...props }) => {
  const g = useTranslations('global');
  return (
    <>
      <div className="w-80 relative shrink-0 snap-start">
        <AntdRadioButton
          disabled={disabled}
          className="block text-left border-[2px] h-auto leading-none p-0 m-0"
          {...props}
        >
          <div className="space-y-2 p-4">
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
                / {g('units.year', { num: 0 })}
              </span>
            </div>
          </div>
        </AntdRadioButton>
      </div>
    </>
  );
};

const CreateDrawer: React.FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
}> = ({ open, setOpen }) => {
  const t = useTranslations('app.pages.domain.create');
  const g = useTranslations('global');

  const messages = useMessages();
  const keys = Object.keys(messages.app.pages.domain.create.faq.items);

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
              <DomainRadio
                value={'1'}
                title={'.com'}
                desc={'顶级通用域名，支持大部分产品服务'}
                price={9.9}
                origin_price={11.9}
                tag={{
                  text: g('tags.hot'),
                  color: 'red',
                }}
              />
              <DomainRadio
                value={'3'}
                title={'.edu.kg'}
                desc={'顶级通用域名，支持大部分产品服务'}
                price={9.9}
                origin_price={11.9}
                tag={{
                  text: g('tags.hot'),
                  color: 'red',
                }}
              />
              <DomainRadio
                value={'2'}
                title={'.cn'}
                desc={'顶级通用域名，支持大部分产品服务'}
                price={9.9}
                origin_price={11.9}
                tag={{
                  text: g('tags.rec'),
                  color: 'blue',
                }}
              />
              <DomainRadio
                value={'4'}
                title={'.net'}
                desc={'顶级通用域名，支持大部分产品服务'}
                price={9.9}
                origin_price={11.9}
                tag={{
                  text: g('tags.rec'),
                  color: 'blue',
                }}
              />
              <DomainRadio
                value={'5'}
                title={'.top'}
                desc={'顶级通用域名，支持大部分产品服务'}
                price={9.9}
                origin_price={11.9}
                tag={{
                  text: g('tags.sale'),
                  color: 'orange',
                }}
              />
              <DomainRadio
                value={'6'}
                title={'.xyz'}
                desc={'顶级通用域名，支持大部分产品服务'}
                price={9.9}
                origin_price={11.9}
                tag={{
                  text: g('tags.sale'),
                  color: 'orange',
                }}
              />
              <DomainRadio
                value={'7'}
                title={'.org'}
                desc={'顶级通用域名，支持大部分产品服务'}
                price={9.9}
                origin_price={11.9}
                tag={{
                  text: g('tags.sale'),
                  color: 'orange',
                }}
              />
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
          <AntdInput
            placeholder={t('form.desired.placeholder')}
            suffix={'.com'}
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
