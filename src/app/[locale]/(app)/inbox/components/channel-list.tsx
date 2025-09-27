'use client';
import { useInbox } from '@/app/[locale]/(app)/inbox/context';
import { INBOX_MAILBOX_CONFIG } from '@/app/[locale]/(app)/inbox/mixins';
import { AntdRadioButton, AntdRadioGroup } from '@/components/antd';
import SliderScroller from '@/components/slider-scroller';
import { Link } from '@/i18n/navigation';
import { useSubscription } from '@/providers/subscription';
import { cn } from '@/utils/classname';
import { Button, RadioProps } from 'antd';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

const ChannelCard: React.FC<
  RadioProps & {
    label: string;
    desc: string;
    icon: string;
    available?: boolean;
    stock?: number;
  }
> = ({
  label,
  desc,
  icon,
  disabled,
  available = true,
  stock = Infinity,
  ...props
}) => {
  const t = useTranslations('global.tags');
  return (
    <div
      className="w-80 relative shrink-0 snap-start overflow-hidden"
      title={desc}
    >
      {stock < 1 && available && (
        <div className="absolute w-16 h-16 -right-2 -top-2 pointer-events-none z-10">
          <div className="w-[200%] text-red-600 text-xs text-center bg-red-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 leading-6">
            {t('soldOut')}
          </div>
        </div>
      )}
      <AntdRadioButton
        disabled={disabled || stock < 1 || !available}
        className={cn(
          'block text-black/80 relative rounded-lg text-left h-auto leading-none p-0 m-0 before:hidden [&.ant-radio-button-wrapper-checked]:bg-primary-500/5',
          (disabled || stock < 1 || !available) && 'border-white bg-white',
        )}
        {...props}
      >
        <div className="w-full py-4 px-6">
          <div className="flex items-center gap-4 leading-none">
            <div>
              <Image
                src={icon}
                alt={label}
                width={32}
                height={32}
                unoptimized={false}
              />
            </div>
            <div>
              <h3 className="font-bold text-base mb-1">{label}</h3>
              <div className="text-xs opacity-80 line-clamp-1">{desc}</div>
            </div>
          </div>
        </div>
      </AntdRadioButton>
      {!available && (
        <div className="absolute z-20 inset-[2px] bg-linear-to-l from-primary-50 to-transparent flex items-center justify-end p-4">
          <Link href="/subscription">
            <Button type="primary" size="small" shape="round">
              {t('subscriptionOnly')}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

const ChannelList: React.FC = () => {
  const g = useTranslations('global');
  const { is_free } = useSubscription();
  const { currentChannel, setCurrentChannel } = useInbox();
  return (
    <div>
      <AntdRadioGroup
        value={currentChannel}
        block
        className="block"
        onChange={(e) => setCurrentChannel(e.target.value)}
      >
        <SliderScroller
          navs={{
            size: 'small',
          }}
          classNames={{
            scroller: 'gap-4 lg:gap-6',
          }}
        >
          {Object.entries(INBOX_MAILBOX_CONFIG).map(
            ([value, config], index) => (
              <ChannelCard
                key={index}
                value={value}
                label={g(config.title)}
                desc={g(config.desc)}
                icon={config.icon}
                stock={config.stock}
                available={!config.subscription || !is_free}
              />
            ),
          )}
        </SliderScroller>
      </AntdRadioGroup>
    </div>
  );
};

export default ChannelList;
