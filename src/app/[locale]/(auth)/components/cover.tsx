'use client';
import { Link } from '@/i18n/navigation';
import Logo from '@/icons/logo';
import { RiCheckLine } from '@remixicon/react';
import { useMessages, useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

const Cover: React.FC = () => {
  const t = useTranslations('auth.global');
  const messages = useMessages();
  const keys = Object.keys(messages.auth.global.features);
  return (
    <>
      <Image
        fill
        src="/images/sso.jpg"
        alt=""
        className="object-cover object-right"
      />
      <div className="relative flex flex-col z-10 p-10 h-full">
        <div className="flex-none">
          <Link
            className="inline-flex items-center gap-2 text-xl font-bold text-white leading-none"
            href="/"
          >
            <span className="text-primary-500">
              <Logo width={24} height={24} />
            </span>
            <span>{process.env.NEXT_PUBLIC_APP_NAME}</span>
          </Link>
        </div>
        <div className="pt-[30%] flex-auto">
          <h1 className="text-white text-4xl leading-14 font-medium mb-12 whitespace-pre-line">
            {t('slogan')}
          </h1>
          <ul className="space-y-5 text-lg text-white/80">
            {keys.map((_, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-green-500">
                  <RiCheckLine size={16} />
                </span>
                <span>{t(`features.${i}`)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-none text-white/80">
          <p className="">{t('footer')}</p>
        </div>
      </div>
    </>
  );
};

export default Cover;
