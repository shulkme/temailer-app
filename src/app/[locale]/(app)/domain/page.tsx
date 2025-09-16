'use client';
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
import { Card, Select, Table } from 'antd';

export default function Page() {
  const [form] = AntdForm.useForm();
  return (
    <>
      <Title title={'域名'} />
      <div className="p-8 space-y-6">
        <SliderScroller
          navs={{
            size: 'small',
          }}
          classNames={{
            scroller: 'gap-6',
          }}
        >
          <div className="w-64 relative shrink-0 snap-start">
            <DomainCard
              title={'.com'}
              desc={'顶级通用域名，支持大部分产品服务'}
              price={9.9}
              origin_price={11.9}
              tag={{
                text: '热门',
                color: 'red',
              }}
            />
          </div>
          <div className="w-64 relative shrink-0 snap-start">
            <DomainCard
              title={'.cn'}
              desc={'顶级通用域名，支持大部分产品服务'}
              price={9.9}
              origin_price={11.9}
              tag={{
                text: '热门',
                color: 'red',
              }}
            />
          </div>
          <div className="w-64 relative shrink-0 snap-start">
            <DomainCard
              title={'.edu.kg'}
              desc={'顶级通用域名，支持大部分产品服务'}
              price={9.9}
              origin_price={11.9}
              tag={{
                text: '热门',
                color: 'red',
              }}
            />
          </div>
          <div className="w-64 relative shrink-0 snap-start">
            <DomainCard
              title={'.net'}
              desc={'顶级通用域名，支持大部分产品服务'}
              price={9.9}
              origin_price={11.9}
              tag={{
                text: '推荐',
                color: 'blue',
              }}
            />
          </div>
          <div className="w-64 relative shrink-0 snap-start">
            <DomainCard
              title={'.top'}
              desc={'顶级通用域名，支持大部分产品服务'}
              price={9.9}
              origin_price={11.9}
              tag={{
                text: '优惠',
                color: 'orange',
              }}
            />
          </div>
          <div className="w-64 relative shrink-0 snap-start">
            <DomainCard
              title={'.xyz'}
              desc={'顶级通用域名，支持大部分产品服务'}
              price={9.9}
              origin_price={11.9}
              tag={{
                text: '优惠',
                color: 'orange',
              }}
            />
          </div>
          <div className="w-64 relative shrink-0 snap-start">
            <DomainCard
              title={'.org'}
              desc={'顶级通用域名，支持大部分产品服务'}
              price={9.9}
              origin_price={11.9}
              tag={{
                text: '优惠',
                color: 'orange',
              }}
            />
          </div>
        </SliderScroller>
        <Card>
          <div className="mb-6">
            <AntdForm form={form} layout="inline">
              <AntdFormItem name="type">
                <Select style={{ width: 220 }} />
              </AntdFormItem>
              <AntdFormItem name="dataRange">
                <AntdDateRangePicker />
              </AntdFormItem>
              <AntdFormItem name="order_id">
                <AntdInput allowClear suffix={<RiSearchLine size={16} />} />
              </AntdFormItem>
            </AntdForm>
          </div>
          <Table
            scroll={{
              x: 1200,
            }}
            columns={[
              {
                title: '域名',
              },
              {
                title: '状态',
              },
              {
                title: '备注',
              },
              {
                title: '注册时间',
              },
              {
                title: '过期时间',
              },
              {
                title: '操作',
              },
            ]}
          />
        </Card>
      </div>
    </>
  );
}
