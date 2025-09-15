'use client';
import GlobalLoading from '@/components/global-loading';
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    if (window !== undefined) {
      window.opener?.postMessage(
        {
          type: 'PAYMENT_SUCCESS',
        },
        '*',
      );

      window.close();
    }
  }, []);

  return <GlobalLoading />;
}
