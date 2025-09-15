'use client';
import { Title } from '@/providers/title';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('app.pages.dashboard');
  return (
    <>
      <Title title={t('title')} />
    </>
  );
}
