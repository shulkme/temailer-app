'use client';
import { Card } from 'antd';
import Image from 'next/image';
import React from 'react';

const Banner: React.FC = () => {
  return (
    <Card
      classNames={{
        body: 'p-0',
      }}
    >
      <Image
        className="w-full h-auto"
        alt="banner"
        width={630}
        height={330}
        unoptimized={false}
        src={
          'https://wapi.lunaproxy.com/static/index/img/ucenter/630_330-1.png'
        }
      />
    </Card>
  );
};

export default Banner;
