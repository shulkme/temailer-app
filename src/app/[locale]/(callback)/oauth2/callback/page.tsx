'use client';
import { setToken } from '@/utils/token';
import { redirect, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const searchParams = useSearchParams();
  const origin_uri = searchParams.get('origin_url');
  const access_token = searchParams.get('access_token');
  useEffect(() => {
    if (access_token) {
      setToken(access_token);
    }
    if (origin_uri) {
      redirect(origin_uri);
    } else {
      redirect('/login');
    }
  }, [origin_uri, access_token]);
  return;
}
