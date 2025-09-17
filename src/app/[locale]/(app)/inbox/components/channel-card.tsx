import { AntdRadioButton } from '@/components/antd';
import { RadioProps } from 'antd';
import Image from 'next/image';
import React from 'react';

const ChannelCard: React.FC<
  RadioProps & {
    label: string;
    desc: string;
    icon: string;
  }
> = ({ label, desc, icon, disabled, ...props }) => {
  return (
    <div className="w-80 relative shrink-0 snap-start">
      {disabled && (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
          <div className="text-red-600 text-sm bg-red-50 rotate-45 absolute top-2 -right-9 px-10 py-0.5">
            缺货
          </div>
        </div>
      )}
      <AntdRadioButton
        disabled={disabled}
        className="block text-left border-[2px] h-auto leading-none p-0 m-0"
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
              <div className="text-xs text-black/50">{desc}</div>
            </div>
          </div>
        </div>
      </AntdRadioButton>
    </div>
  );
};

export default ChannelCard;
