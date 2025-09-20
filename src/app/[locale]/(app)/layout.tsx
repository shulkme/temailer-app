import Header from '@/app/[locale]/(app)/components/header';
import Sidebar from '@/app/[locale]/(app)/components/sidebar';
import { AntdContent, AntdLayout } from '@/components/antd';
import { AuthorizedProvider } from '@/providers/authorized';
import { CreditProvider } from '@/providers/credit';
import { SubscriptionProvider } from '@/providers/subscription';
import React from 'react';

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <AuthorizedProvider>
      <CreditProvider>
        <SubscriptionProvider>
          <AntdLayout hasSider className="min-h-screen bg-background">
            <Sidebar />
            <AntdLayout>
              <Header />
              <AntdContent>{children}</AntdContent>
            </AntdLayout>
          </AntdLayout>
        </SubscriptionProvider>
      </CreditProvider>
    </AuthorizedProvider>
  );
}
