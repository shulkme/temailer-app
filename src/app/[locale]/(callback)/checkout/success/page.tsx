'use client';
import GlobalLoading from '@/components/global-loading';
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    if (window.opener && !window.opener.closed) {
      window.opener?.postMessage(
        {
          type: 'PAYMENT_SUCCESS',
        },
        '*',
      );
      setTimeout(() => window.close(), 100);
    }
  }, []);

  return <GlobalLoading />;
}
