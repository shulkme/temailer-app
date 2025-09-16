'use client';
import { languages, Locale } from '@/i18n/config';
import { usePathname, useRouter } from '@/i18n/navigation';
import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import zhTW from 'antd/locale/zh_TW';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/zh';
import 'dayjs/locale/zh-tw';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useLocale } from 'next-intl';
import { useParams, useSearchParams } from 'next/navigation';
import React, { createContext, useContext, useEffect, useMemo } from 'react';

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

const setDayjsLocale = (locale: string) => {
  switch (locale) {
    case 'en':
      dayjs.locale('en');
      break;
    case 'zh':
      dayjs.locale('zh');
      break;
    case 'tw':
      dayjs.locale('zh-tw');
      break;
  }
};

const LanguageContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
  language?: string;
} | null>(null);

const LanguageProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const locale = useLocale();
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const query = Object.fromEntries(useSearchParams().entries());
  const setLocale = (locale: string) => {
    setDayjsLocale(locale);
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      { pathname, params, query },
      {
        locale,
      },
    );
  };
  const _locale = useMemo(() => {
    switch (locale) {
      case 'zh':
        return zhCN;
      case 'tw':
        return zhTW;
      default:
        return enUS;
    }
  }, [locale]);

  const language = useMemo(() => {
    return languages.find((f) => f.value === locale)?.label;
  }, [locale]);

  useEffect(() => {
    setDayjsLocale(locale);
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        language,
      }}
    >
      <ConfigProvider locale={_locale}>{children}</ConfigProvider>
    </LanguageContext.Provider>
  );
};

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be within a LanguageProvider');
  }
  return context;
};

export { LanguageProvider, useLanguage };
