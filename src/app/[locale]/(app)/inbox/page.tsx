'use client';
import ChannelList from '@/app/[locale]/(app)/inbox/components/channel-list';
import EmailController from '@/app/[locale]/(app)/inbox/components/email-controller';
import MessageList from '@/app/[locale]/(app)/inbox/components/message-list';
import { InboxProvider } from '@/app/[locale]/(app)/inbox/context';
import { Title } from '@/providers/title';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('app.pages.inbox');

  return (
    <InboxProvider>
      <Title title={t('title')} />
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        <ChannelList />
        <EmailController />
        <MessageList />
        <div className="text-xs text-black/50 text-center py-1">
          {t('messages.tips')}
        </div>
      </div>
    </InboxProvider>
  );
}
