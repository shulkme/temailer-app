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
import { Alert, Button, Card, Select, Space, Table } from 'antd';

export default function Page() {
  const [form] = AntdForm.useForm();
  return (
    <>
      <Title title={'域名'} />
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        <Alert
          showIcon
          message={
            '使用专属域名，可避免收信地址因发送方风控限制导致无法收信，也可用于自定义发信地址，提升品牌信任度，提高邮件送达率。'
          }
        />
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
              text: '热门',
              color: 'red',
            }}
          />
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
        </SliderScroller>
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 lg:mb-6">
            <div>
              <AntdForm form={form} layout="inline">
                <AntdFormItem name="type">
                  <Select style={{ width: 220 }} placeholder={'状态'} />
                </AntdFormItem>
                <AntdFormItem name="dataRange">
                  <AntdDateRangePicker />
                </AntdFormItem>
                <AntdFormItem name="order_id">
                  <AntdInput
                    allowClear
                    suffix={<RiSearchLine size={16} />}
                    placeholder={'搜索域名'}
                  />
                </AntdFormItem>
              </AntdForm>
            </div>
            <div>
              <Space size="middle">
                <Button type="primary">购买域名</Button>
              </Space>
            </div>
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
