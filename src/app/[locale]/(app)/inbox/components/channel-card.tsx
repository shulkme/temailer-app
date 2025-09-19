'use client';
import { AntdRadioButton } from '@/components/antd';
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
    <div className="w-80 relative shrink-0 snap-start" title={desc}>
      {stock < 1 && available && (
        <div className="absolute w-16 h-16 right-0 top-0 pointer-events-none z-40 overflow-hidden">
          <div className="w-[200%] text-red-600 text-sm bg-red-50 rotate-45 absolute top-2 -right-9 px-10 py-0.5">
            {t('soldOut')}
          </div>
        </div>
      )}
      <AntdRadioButton
        className={cn(
          'block text-left border-[2px] h-auto leading-none p-0 m-0',
          (disabled || stock < 1 || !available) && 'pointer-events-none',
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
              <div className="text-xs text-black/50 line-clamp-1">{desc}</div>
            </div>
          </div>
        </div>
      </AntdRadioButton>
      {!available && (
        <div className="absolute z-50 inset-[2px] bg-linear-to-l from-primary-50 to-white/30 flex items-center justify-end p-4">
          <Button type="primary" size="small" shape="round">
            {t('subscriptionOnly')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChannelCard;
