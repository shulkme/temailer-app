'use client';
import Banner from '@/app/[locale]/(app)/dashboard/components/banner';
import Contact from '@/app/[locale]/(app)/dashboard/components/contact';
import Credit from '@/app/[locale]/(app)/dashboard/components/credit';
import Statistic from '@/app/[locale]/(app)/dashboard/components/statistic';
import Task from '@/app/[locale]/(app)/dashboard/components/task';
import Trend from '@/app/[locale]/(app)/dashboard/components/trend';
import { Title } from '@/providers/title';
import { Col, Row } from 'antd';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('app.pages.dashboard');
  return (
    <>
      <Title title={t('title')} />
      <div className="max-w-[1600px] mx-auto p-4 lg:p-6">
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={16} xxl={18}>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <Statistic />
              </Col>
              <Col span={24}>
                <Task />
              </Col>
              <Col span={24}>
                <Trend />
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={6}>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <Credit />
              </Col>
              <Col span={24}>
                <Contact />
              </Col>
              <Col span={24}>
                <Banner />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
}
