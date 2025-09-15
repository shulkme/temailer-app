'use client';
import Cover from '@/app/[locale]/(auth)/components/cover';
import {
  AntdContent,
  AntdFooter,
  AntdHeader,
  AntdLayout,
  AntdSider,
} from '@/components/antd';
import { languages, Locale } from '@/i18n/config';
import { useLanguage } from '@/providers/language';
import { RiGlobalLine } from '@remixicon/react';
import { Select, SelectProps } from 'antd';
import React from 'react';

export default function Layout({ children }: { children?: React.ReactNode }) {
  const { locale, setLocale } = useLanguage();
  const handleLanguageChange: SelectProps['onChange'] = (value) => {
    setLocale(value as Locale);
  };
  return (
    <AntdLayout className="min-h-screen" hasSider>
      <AntdSider
        collapsible
        breakpoint="lg"
        collapsedWidth={0}
        theme="light"
        width={'35%'}
        className="bg-gray-50 relative"
        trigger={null}
      >
        <Cover />
      </AntdSider>
      <AntdLayout>
        <AntdHeader>
          <div className="flex justify-end p-8 pb-0">
            <Select
              variant="borderless"
              prefix={<RiGlobalLine size={18} />}
              defaultValue={locale}
              options={languages.map((lang) => ({
                value: lang.value,
                label: lang.label,
                disabled: lang.disabled,
              }))}
              onChange={handleLanguageChange}
            />
          </div>
        </AntdHeader>
        <AntdContent className="flex flex-col items-center justify-center">
          <div className="max-w-lg w-full mx-auto p-6">{children}</div>
        </AntdContent>
        <AntdFooter>
          <div className="text-sm text-black/50 text-center p-4">
            © {process.env.NEXT_PUBLIC_COPYRIGHT} {new Date().getFullYear()}
          </div>
        </AntdFooter>
      </AntdLayout>
    </AntdLayout>
  );
}
