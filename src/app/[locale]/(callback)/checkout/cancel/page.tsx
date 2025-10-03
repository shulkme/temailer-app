'use client';
import GlobalLoading from '@/components/global-loading';
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    setTimeout(() => window.close(), 100);
  }, []);

  return <GlobalLoading />;
}
