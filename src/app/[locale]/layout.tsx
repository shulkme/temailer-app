import NProgressBar from '@/app/[locale]/components/nprogress-bar';
import { routing } from '@/i18n/routing';
import { IdentityProvider } from '@/providers/identity';
import { LanguageProvider } from '@/providers/language';
import { ThemeProvider } from '@/providers/theme';
import { TitleProvider } from '@/providers/title';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { App } from 'antd';
import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import React from 'react';
import '../globals.css';

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Enable static rendering
  // setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <AntdRegistry>
          <ThemeProvider>
            <NProgressBar
              options={{
                showSpinner: false,
              }}
            />
            <NextIntlClientProvider>
              <LanguageProvider>
                <IdentityProvider>
                  <TitleProvider>
                    <App>{children}</App>
                  </TitleProvider>
                </IdentityProvider>
              </LanguageProvider>
            </NextIntlClientProvider>
          </ThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
