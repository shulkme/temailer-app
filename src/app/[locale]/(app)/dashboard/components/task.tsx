'use client';
import { AntdListItem, AntdListMeta, AntdTitle } from '@/components/antd';
import { Link } from '@/i18n/navigation';
import { Button, Card, List, Progress } from 'antd';
import { useTranslations } from 'next-intl';
import React, { useMemo } from 'react';

const Task: React.FC = () => {
  const t = useTranslations('app.pages.dashboard.task');
  const mocks = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      name: 'Task Name',
      desc: 'This is the description of the task',
      statistics: {
        requests: 0,
        success: 0,
        failure: 0,
      },
    }));
  }, []);

  return (
    <Card>
      <div className="flex items-center justify-between gap-4 mb-4">
        <AntdTitle level={5} className="m-0">
          {t('title')}
        </AntdTitle>
        <div>
          <Link href="/outbox">{t('detail')}</Link>
        </div>
      </div>
      <div className="relative -mx-4 px-4">
        <List
          rowKey="id"
          dataSource={mocks}
          renderItem={(record, index) => (
            <AntdListItem key={index}>
              <AntdListMeta title={record.name} description={record.desc} />
              <div>
                <div className="w-32">
                  <Progress size="small" percent={50} />
                </div>
              </div>
            </AntdListItem>
          )}
        />
        <div className="absolute inset-0 bg-white/20 backdrop-blur-xs flex flex-col items-center justify-center">
          <div>
            <h3 className="font-medium text-lg mb-4">{t('empty')}</h3>
          </div>
          <div>
            <Link href="/outbox">
              <Button color="primary" variant="outlined">
                {t('action')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Task;
