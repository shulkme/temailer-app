'use client';
import { Card, Table } from 'antd';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('app.pages.referral.record');
  return (
    <div className="p-8">
      <Card>
        <div>
          <Table
            scroll={{
              x: 1200,
            }}
            columns={[
              {
                title: t('table.columns.traffic'),
              },
              {
                title: t('table.columns.pay'),
              },
              {
                title: t('table.columns.remaining'),
              },
              {
                title: t('table.columns.time'),
              },
            ]}
          />
        </div>
      </Card>
    </div>
  );
}
