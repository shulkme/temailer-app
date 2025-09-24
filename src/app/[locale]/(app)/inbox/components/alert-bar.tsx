'use client';
import { useLocalStorageState } from 'ahooks';
import { Alert } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';

const AlertBar: React.FC = () => {
  const t = useTranslations('app.pages.inbox.alert');
  const [show, setShow] = useLocalStorageState('INBOX_ALERT', {
    defaultValue: true,
  });

  return (
    show && (
      <Alert
        showIcon
        type="info"
        banner
        message={t('message')}
        closable={{
          closeIcon: <a>{t('close')}</a>,
        }}
        onClose={() => setShow(false)}
      />
    )
  );
};

export default AlertBar;
