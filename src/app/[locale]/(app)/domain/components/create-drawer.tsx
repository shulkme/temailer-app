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
                / 年
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
  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      title={'购买域名'}
      width={640}
      classNames={{
        header: 'border-0',
      }}
      footer={
        <div>
          <div className="py-4">
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span className="text-black/50">域名数量</span>
                <span className="font-medium">x1</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-black/50">合计</span>
                <span className="font-medium text-lg">$9.9</span>
              </li>
            </ul>
          </div>
          <div>
            <Button block type="primary" size="large">
              立即购买
            </Button>
          </div>
        </div>
      }
    >
      <AntdForm layout="vertical">
        <AntdFormItem label="域名后缀">
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
                  text: '热门',
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
                  text: '热门',
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
                  text: '热门',
                  color: 'red',
                }}
              />
              <DomainRadio
                value={'4'}
                title={'.net'}
                desc={'顶级通用域名，支持大部分产品服务'}
                price={9.9}
                origin_price={11.9}
                tag={{
                  text: '推荐',
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
                  text: '优惠',
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
                  text: '优惠',
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
                  text: '优惠',
                  color: 'orange',
                }}
              />
            </SliderScroller>
          </AntdRadioGroup>
        </AntdFormItem>
        <AntdFormItem label={'购买数量'}>
          <InputNumber placeholder={'0'} suffix={'个'} />
        </AntdFormItem>
        <AntdFormItem label={'期望域名'}>
          <AntdInput placeholder={'可选，不填默认随机注册'} suffix={'.com'} />
        </AntdFormItem>
        <AntdFormItem label={'备选方案'}>
          <Checkbox>允许期望域名落空时随机注册</Checkbox>
        </AntdFormItem>
      </AntdForm>
      <Divider type="horizontal" />
      <AntdTitle level={5}>常见问题</AntdTitle>
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
          items={[
            {
              key: '1',
              label: '1. 域名购买后多久可以使用？',
              children: (
                <div className="text-black/50 text-xs">
                  通常域名下单成功后1小时内即可生效，不同域名后缀可能受服务商DNS解析生效时间影响。
                </div>
              ),
            },
            {
              key: '2',
              label: '2. 为什么期望域名没有注册成功？',
              children: (
                <div className="text-black/50 text-xs">
                  域名是否可以注册依托于注册局信息更新，且部分域名属于白金词，价格远超当前售价。
                </div>
              ),
            },
            {
              key: '3',
              label: '3. 域名下单之后可以申请退款吗？',
              children: (
                <div className="text-black/50 text-xs">
                  不支持，由于商品特殊性质，下单成功后系统会进入注册流程，一旦通过域名注册局申请，无法撤销。
                </div>
              ),
            },
          ]}
        />
      </ConfigProvider>
    </Drawer>
  );
};

export default CreateDrawer;
