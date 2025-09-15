'use client';
import {
  AntdList,
  AntdListItem,
  AntdListMeta,
  AntdParagraph,
} from '@/components/antd';
import { RiPercentLine, RiVipCrown2Line, RiWalletLine } from '@remixicon/react';
import { Avatar, Card, ConfigProvider, Switch } from 'antd';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('app.pages.account.notifications');
  return (
    <div className="p-8">
      <Card>
        <AntdParagraph strong>{t('tips')}</AntdParagraph>
        <ConfigProvider
          theme={{
            components: {
              List: {
                itemPaddingLG: '24px 0',
              },
            },
          }}
        >
          <AntdList size="large">
            <AntdListItem
              actions={[<Switch key="switch" defaultValue={true} />]}
            >
              <AntdListMeta
                className="[&_h4]:font-medium"
                avatar={
                  <Avatar className="bg-(--ant-color-primary-bg) text-(--ant-color-primary)">
                    <RiWalletLine size={18} />
                  </Avatar>
                }
                title={t('items.wallet.title')}
                description={t('items.wallet.desc')}
              />
            </AntdListItem>
            <AntdListItem
              actions={[<Switch key="switch" defaultValue={true} />]}
            >
              <AntdListMeta
                className="[&_h4]:font-medium"
                avatar={
                  <Avatar className="bg-(--ant-color-primary-bg) text-(--ant-color-primary)">
                    <RiVipCrown2Line size={18} />
                  </Avatar>
                }
                title={t('items.subscription.title')}
                description={t('items.subscription.desc')}
              />
            </AntdListItem>
            <AntdListItem
              actions={[<Switch key="switch" defaultValue={true} />]}
            >
              <AntdListMeta
                className="[&_h4]:font-medium"
                avatar={
                  <Avatar className="bg-(--ant-color-primary-bg) text-(--ant-color-primary)">
                    <RiPercentLine size={18} />
                  </Avatar>
                }
                title={t('items.discounts.title')}
                description={t('items.discounts.desc')}
              />
            </AntdListItem>
          </AntdList>
        </ConfigProvider>
      </Card>
    </div>
  );
}
