import type { ThemeConfig } from 'antd';
import { theme } from 'antd';

const config: ThemeConfig = {
  cssVar: true, // use css variables -> var(--xxx)
  hashed: false, // close hash
  algorithm: theme.defaultAlgorithm,
  token: {
    controlHeightXS: 24,
    controlHeightSM: 32,
    controlHeight: 40,
    controlHeightLG: 48,
    borderRadiusXS: 4,
    borderRadiusSM: 4,
    borderRadius: 4,
    borderRadiusLG: 4,
    colorPrimary: '#1062ff',
    colorLink: '#1062ff',
    colorBorderSecondary: '#e2e8f0',
    colorBorder: '#e2e8f0',
    colorBgLayout: '#f5f5f7',
  },
  components: {
    Layout: {
      headerBg: 'transparent',
      headerPadding: 0,
      headerHeight: 'auto',
      footerBg: 'transparent',
      footerPadding: 0,
      bodyBg: 'transparent',
    },
    Table: {
      headerBorderRadius: 0,
    },
    Menu: {
      activeBarBorderWidth: 0,
      itemBg: 'transparent',
    },
    Button: {
      dangerShadow: 'none',
      defaultShadow: 'none',
      primaryShadow: 'none',
      contentFontSizeSM: 12,
    },
    Pagination: {
      controlHeightXS: 20,
      controlHeightSM: 24,
      controlHeight: 32,
      controlHeightLG: 40,
    },
    // Card: {
    //   colorBorderSecondary: 'transparent',
    // },
    // Dropdown: {
    //   //borderRadiusSM: 6,
    //   //borderRadius: 8,
    //   //borderRadiusLG: 12,
    // },
  },
};

export default config;
