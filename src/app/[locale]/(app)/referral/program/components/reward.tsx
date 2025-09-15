'use client';
import { AntdTitle } from '@/components/antd';
import { Card, Col, Row, Statistic } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';

const Reward: React.FC = () => {
  const t = useTranslations('app.pages.referral.program.reward');
  return (
    <>
      <Card>
        <AntdTitle level={5} className="mb-6">
          {t('title')}
        </AntdTitle>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
            <Statistic
              title={t('items.accrued')}
              value={0}
              prefix={'$'}
              precision={2}
              className="[&_.ant-statistic-content]:font-medium"
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
            <Statistic
              title={t('items.total')}
              value={0}
              prefix={'$'}
              precision={2}
              className="[&_.ant-statistic-content]:font-medium"
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
            <Statistic
              title={t('items.invites')}
              value={0}
              className="[&_.ant-statistic-content]:font-medium"
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
            <Statistic
              title={t('items.settlement')}
              value={0}
              prefix={'$'}
              precision={2}
              className="[&_.ant-statistic-content]:font-medium"
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
            <Statistic
              title={t('items.withdrawn')}
              value={0}
              prefix={'$'}
              precision={2}
              className="[&_.ant-statistic-content]:font-medium"
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
            <Statistic
              title={t('items.ratio')}
              value={10}
              suffix={'%'}
              className="[&_.ant-statistic-content]:font-medium"
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Reward;
