'use client';
import themeConfig from '@/config/theme';
import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import React from 'react';

export const ThemeProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <StyleProvider layer>
      <ConfigProvider theme={themeConfig}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="light"
          enableColorScheme={false}
          enableSystem={false}
          storageKey="themeMode"
        >
          {children}
        </NextThemesProvider>
      </ConfigProvider>
    </StyleProvider>
  );
};
