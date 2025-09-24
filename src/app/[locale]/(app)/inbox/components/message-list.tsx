'use client';
import { getEmailList } from '@/apis/email';
import { EmailRecord } from '@/apis/email/types';
import { useInbox } from '@/app/[locale]/(app)/inbox/context';
import { AntdListItem, AntdTitle } from '@/components/antd';
import { useCredit } from '@/providers/credit';
import { formatTimeWithTimezone } from '@/utils/time';
import { RiRefreshLine } from '@remixicon/react';
import { useCountDown, useRequest } from 'ahooks';
import { Button, Card, List, Space } from 'antd';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

const MessageList: React.FC = () => {
  const t = useTranslations('app.pages.inbox');
  const [nextRefreshTime, setNextRefreshTime] = useState<number>();
  const { currentEmail } = useInbox();
  const { refresh: refreshCredit, available } = useCredit();
  const [emails, setEmails] = useState<Omit<EmailRecord, 'content'>[]>([]);
  // 刷新倒计时
  const [countDown] = useCountDown({
    targetDate: nextRefreshTime,
  });

  // 轮询消息
  const { loading, run, cancel, refresh } = useRequest(getEmailList, {
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
    if (currentEmail && available > 0) {
      run(currentEmail);
    }
  }, [available, currentEmail]);

  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 lg:mb-6">
        <div>
          <AntdTitle level={5} className="m-0">
            {t('messages.title')}
          </AntdTitle>
        </div>
        <div>
          <Space size="middle">
            <span className="text-black/50">
              {t('messages.countdown', {
                num: Math.round(countDown / 1000),
              })}
            </span>
            <Button
              loading={loading}
              size="small"
              className="leading-none"
              icon={<RiRefreshLine size={16} />}
              onClick={refresh}
            >
              {t('messages.actions.refresh')}
            </Button>
          </Space>
        </div>
      </div>
      <List
        dataSource={emails}
        renderItem={(email) => (
          <AntdListItem
            key={email.id}
            className="hover:bg-gray-100 cursor-pointer"
            onClick={() => handlePreview(email.id)}
          >
            <div className="flex-auto space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{email.from_name}</h4>
                <span className="text-xs text-black/50">
                  {formatTimeWithTimezone(email.created_time, 'HH:mm')}
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
