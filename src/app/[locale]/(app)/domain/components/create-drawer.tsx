'use client';
import { createDomainOrder } from '@/apis/domain';
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
import { useRequest } from 'ahooks';
import {
  App,
  Button,
  Checkbox,
  Collapse,
  ConfigProvider,
  Divider,
  Drawer,
  FormProps,
  InputNumber,
  RadioProps,
  Select,
  Tag,
} from 'antd';
import { useLocale, useMessages, useTranslations } from 'next-intl';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

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
        </AntdRadioButton>
      </div>
    </>
  );
};

const CreateDrawer: React.FC = () => {
  const g = useTranslations('global');
  const t = useTranslations('app.pages.domain.create');
  const { suffix_list } = useDomain();
  const [open, setOpen] = useState(false);
  const [form] = AntdForm.useForm();
  const { message } = App.useApp();
  const [submitting, setSubmitting] = useState(false);

  const suffix = AntdForm.useWatch('domain_suffix', form);
  const quantity = AntdForm.useWatch('quantity', form);

  const totalPrice = useMemo(() => {
    if (!suffix) return 0;
    const current = suffix_list.find((f) => f.name === suffix);
    if (!current) return 0;
    return (current.price * quantity).toLocaleString('en-US', {
      maximumFractionDigits: 3,
    });
  }, [suffix, suffix_list, quantity]);

  const messages = useMessages();
  const keys = Object.keys(messages.app.pages.domain.create.faq.items);

  const afterOpenChange = (open: boolean) => {
    if (!open) {
      form.resetFields();
      setSubmitting(false);
    }
  };

  const { run: doSubmit } = useRequest(createDomainOrder, {
    manual: true,
    onBefore: () => {
      setSubmitting(true);
    },
    onSuccess: (res) => {
      window.open(res.data.url);
    },
    onError: (e) => {
      message.error(e.message);
      setSubmitting(false);
    },
  });

  const onFinish: FormProps['onFinish'] = (values) => {
    doSubmit(values);
  };

  useEffect(() => {
    const handler = (
      e: CustomEvent<{
        name: string;
      }>,
    ) => {
      setOpen(true);
      const { name } = e.detail;
      if (name) form.setFieldValue('domain_suffix', name);
    };

    window.addEventListener('domain:create', handler as EventListener);

    return () => {
      window.removeEventListener('domain:create', handler as EventListener);
    };
  }, []);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === 'PAYMENT_SUCCESS') {
        setOpen(false);
        message.success(g('response.success'));
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  return (
    <Drawer
      closable={!submitting}
      open={open}
      onClose={() => setOpen(false)}
      title={t('title')}
      width={640}
      classNames={{
        header: 'border-0',
      }}
      afterOpenChange={afterOpenChange}
      footer={
        <div>
          <div className="py-4">
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span className="text-black/50">
                  {t('footer.summary.domains')}
                </span>
                <span className="font-medium">
                  x{quantity?.toLocaleString()}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-black/50">
                  {t('footer.summary.price')}
                </span>
                <span className="font-medium text-lg">${totalPrice}</span>
              </li>
            </ul>
          </div>
          <div>
            <Button
              loading={submitting}
              block
              type="primary"
              size="large"
              onClick={form.submit}
            >
              {t('footer.actions.checkout')}
            </Button>
          </div>
        </div>
      }
    >
      <AntdForm
        form={form}
        layout="vertical"
        initialValues={{
          domain_suffix: suffix_list?.[0]?.name,
          quantity: 1,
        }}
        onFinish={onFinish}
      >
        <AntdFormItem
          name="domain_suffix"
          messageVariables={{
            label: t('form.suffix.label'),
          }}
          label={t('form.suffix.label')}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <AntdRadioGroup block className="block -my-2">
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
          name="quantity"
          messageVariables={{
            label: t('form.quantity.label'),
          }}
          label={t('form.quantity.label')}
          rules={[
            {
              required: true,
            },
            {
              type: 'number',
              min: 1,
              max: 100,
            },
          ]}
        >
          <InputNumber placeholder={'0'} min={1} max={100} />
        </AntdFormItem>
        <AntdFormItem
          name="expected_domains"
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
          name="expected_compensation"
          messageVariables={{
            label: t('form.alternatives.label'),
          }}
          label={t('form.alternatives.label')}
          valuePropName="checked"
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
