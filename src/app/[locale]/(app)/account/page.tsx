'use client';
import LoginLogs from '@/app/[locale]/(app)/account/components/login-logs';
import UserInfo from '@/app/[locale]/(app)/account/components/user-info';
import { Title } from '@/providers/title';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('app.pages.account');
  return (
    <>
      <Title title={t('title')} />
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        <UserInfo />
        <LoginLogs />
      </div>
    </>
  );
}
