'use client';
import { getMyDomainList } from '@/apis/domain';
import { DomainRecord } from '@/apis/domain/types';
import CreateDrawer from '@/app/[locale]/(app)/domain/components/create-drawer';
import DomainCard from '@/app/[locale]/(app)/domain/components/domain-card';
import {
  AntdDateRangePicker,
  AntdForm,
  AntdFormItem,
  AntdInput,
} from '@/components/antd';
import SliderScroller from '@/components/slider-scroller';
import { Title } from '@/providers/title';
import { RiSearchLine } from '@remixicon/react';
import { useAntdTable } from 'ahooks';
import { Alert, Button, Card, Select, Space, Table } from 'antd';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function Page() {
  const t = useTranslations('app.pages.domain');
  const g = useTranslations('global');
  const [form] = AntdForm.useForm();
  const [open, setOpen] = useState(false);
  const { tableProps } = useAntdTable(async ({ current, pageSize }, params) => {
    return await getMyDomainList({
      page: current,
      size: pageSize,
      ...params,
    }).then((res) => ({
      list: res.data.items,
      total: res.data.total,
    }));
  });
  return (
    <>
      <Title title={t('title')} />
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        <Alert showIcon message={t('alert.message')} />
        <SliderScroller
          navs={{
            size: 'small',
          }}
          classNames={{
            scroller: 'gap-4 lg:gap-6',
          }}
        >
          <DomainCard
            title={'.com'}
            desc={'顶级通用域名，支持大部分产品服务'}
            price={9.9}
            origin_price={11.9}
            tag={{
              text: g('tags.hot'),
              color: 'red',
            }}
          />
          <DomainCard
            title={'.edu.kg'}
            desc={'顶级通用域名，支持大部分产品服务'}
            price={9.9}
            origin_price={11.9}
            tag={{
              text: g('tags.hot'),
              color: 'red',
            }}
          />
          <DomainCard
            title={'.cn'}
            desc={'顶级通用域名，支持大部分产品服务'}
            price={9.9}
            origin_price={11.9}
            tag={{
              text: g('tags.rec'),
              color: 'blue',
            }}
          />
          <DomainCard
            title={'.net'}
            desc={'顶级通用域名，支持大部分产品服务'}
            price={9.9}
            origin_price={11.9}
            tag={{
              text: g('tags.rec'),
              color: 'blue',
            }}
          />
          <DomainCard
            title={'.top'}
            desc={'顶级通用域名，支持大部分产品服务'}
            price={9.9}
            origin_price={11.9}
            tag={{
              text: g('tags.sale'),
              color: 'orange',
            }}
          />
          <DomainCard
            title={'.xyz'}
            desc={'顶级通用域名，支持大部分产品服务'}
            price={9.9}
            origin_price={11.9}
            tag={{
              text: g('tags.sale'),
              color: 'orange',
            }}
          />
          <DomainCard
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
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 lg:mb-6">
            <div>
              <AntdForm form={form} layout="inline">
                <AntdFormItem name="type">
                  <Select
                    style={{ width: 220 }}
                    placeholder={t('table.filters.status.placeholder')}
                  />
                </AntdFormItem>
                <AntdFormItem name="dataRange">
                  <AntdDateRangePicker />
                </AntdFormItem>
                <AntdFormItem name="order_id">
                  <AntdInput
                    allowClear
                    suffix={<RiSearchLine size={16} />}
                    placeholder={t('table.filters.search.placeholder')}
                  />
                </AntdFormItem>
              </AntdForm>
            </div>
            <div>
              <Space size="middle">
                <Button type="primary" onClick={() => setOpen(true)}>
                  {t('table.actions.buy')}
                </Button>
              </Space>
            </div>
          </div>
          <Table<DomainRecord>
            scroll={{
              x: 1200,
            }}
            columns={[
              {
                title: t('table.columns.domain'),
                dataIndex: 'name',
              },
              {
                title: t('table.columns.status'),
                dataIndex: 'status',
              },
              {
                title: t('table.columns.remark'),
                dataIndex: 'remark',
              },
              {
                title: t('table.columns.registerTime'),
                dataIndex: 'register_time',
              },
              {
                title: t('table.columns.expiredTime'),
                dataIndex: 'expired_time',
              },
              {
                title: t('table.columns.operate'),
              },
            ]}
            {...tableProps}
          />
        </Card>
      </div>
      <CreateDrawer open={open} setOpen={setOpen} />
    </>
  );
}
