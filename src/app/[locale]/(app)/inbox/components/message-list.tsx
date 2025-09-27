'use client';
import { getEmailMessages } from '@/apis/email';
import { EmailRecord } from '@/apis/email/types';
import { useInbox } from '@/app/[locale]/(app)/inbox/context';
import { AntdListItem, AntdTitle } from '@/components/antd';
import { Link } from '@/i18n/navigation';
import { useCredit } from '@/providers/credit';
import { RiRefreshLine } from '@remixicon/react';
import { useCountDown, useRequest } from 'ahooks';
import { Button, Card, ConfigProvider, List, Space, Switch } from 'antd';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

const MessageList: React.FC = () => {
  const t = useTranslations('app.pages.inbox.messages');
  const [nextRefreshTime, setNextRefreshTime] = useState<number>();
  const { currentEmail, currentChannel, autoRefresh, setAutoRefresh } =
    useInbox();
  const {
    refresh: refreshCredit,
    available,
    loading: creditLoading,
  } = useCredit();
  const [emails, setEmails] = useState<Omit<EmailRecord, 'content'>[]>([]);
  // 刷新倒计时
  const [countDown] = useCountDown({
    targetDate: nextRefreshTime,
  });

  // 轮询消息
  const { loading, run, cancel, refresh } = useRequest(getEmailMessages, {
    manual: true,
    pollingInterval: 10000,
    pollingErrorRetryCount: 2,
    pollingWhenHidden: false, // 页面失活停止请求
    onSuccess: (res) => {
      const emails = res.data.items;
      setEmails(emails);
      if (emails.length > 0) refreshCredit();
    },
    onFinally: () => {
      setNextRefreshTime(Date.now() + 10000);
    },
  });

  const handlePreview = (id: number) => {
    window.dispatchEvent(
      new CustomEvent('email:preview', {
        detail: id,
      }),
    );
  };

  useEffect(() => {
    cancel();
    setNextRefreshTime(undefined);
    if (currentEmail && available > 0 && autoRefresh) {
      run(currentEmail, currentChannel);
    }
  }, [available, cancel, currentChannel, currentEmail, run, autoRefresh]);

  useEffect(() => {
    setEmails([]);
  }, [currentChannel, currentEmail]);

  return (
    <Card
      classNames={{
        header: 'bg-orange-50',
      }}
      title={
        !available && !creditLoading ? (
          <div className="font-normal text-sm text-orange-600">
            {t.rich('alert', {
              link: (chunks) => (
                <Link href="/subscription#credit">{chunks}</Link>
              ),
            })}
          </div>
        ) : null
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 lg:mb-6">
        <div>
          <AntdTitle level={5} className="m-0">
            {t('title')}
          </AntdTitle>
        </div>
        <div>
          <Space size="middle">
            <div className="flex items-center gap-2 border rounded-sm border-slate-200 h-(--ant-control-height-sm) px-2">
              <ConfigProvider
                theme={{
                  components: {
                    Switch: {
                      controlHeight: 32,
                    },
                  },
                }}
              >
                <Switch
                  size="small"
                  checked={autoRefresh}
                  onChange={setAutoRefresh}
                />
              </ConfigProvider>
              <span>
                {t('countdown', {
                  num: Math.round(countDown / 1000),
                })}
              </span>
            </div>
            <Button
              disabled={!available}
              loading={loading}
              size="small"
              className="leading-none"
              icon={<RiRefreshLine size={16} />}
              onClick={refresh}
            >
              {t('actions.refresh')}
            </Button>
          </Space>
        </div>
      </div>
      <List
        dataSource={emails}
        renderItem={(email) => (
          <AntdListItem key={email.id} onClick={() => handlePreview(email.id)}>
            <div className="flex-auto space-y-2 p-4 border-l-[4px] border-transparent transition hover:bg-primary-50 hover:border-primary-500 cursor-pointer">
              <div className="flex items-center justify-between">
                <h4 className="font-bold">{email.from_name}</h4>
                <span className="text-xs text-black/50">
                  {dayjs(email.created_time).format('HH:mm')}
                </span>
              </div>
              <div className="text-sm">{email.subject}</div>
              <div className="text-xs text-black/50 line-clamp-2">
                {email.summary}
              </div>
            </div>
          </AntdListItem>
        )}
      />
    </Card>
  );
};

export default MessageList;
