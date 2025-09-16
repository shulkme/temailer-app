'use client';
import Contact from '@/app/[locale]/(app)/dashboard/components/contact';
import Statistic from '@/app/[locale]/(app)/dashboard/components/statistic';
import Tabs from '@/app/[locale]/(app)/dashboard/components/tabs';
import Traffic from '@/app/[locale]/(app)/dashboard/components/traffic';
import Wallet from '@/app/[locale]/(app)/dashboard/components/wallet';
import { Title } from '@/providers/title';
import { Col, Row } from 'antd';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('app.pages.dashboard');
  return (
    <>
      <Title title={t('title')} />
      <div className="max-w-[1600px] mx-auto p-4 lg:p-8">
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={16} xxl={18}>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <Tabs />
              </Col>
              <Col span={24}>
                <Statistic />
              </Col>
              <Col span={24}>
                <Traffic />
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={6}>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <Wallet />
              </Col>
              <Col span={24}>
                <Contact />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}
