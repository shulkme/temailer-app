'use client';
import { delSession, getSessionList } from '@/apis/session';
import { SessionRecord } from '@/apis/session/types';
import { AntdParagraph, AntdTitle } from '@/components/antd';
import {
  RemixiconComponentType,
  RiComputerLine,
  RiQuestionMark,
  RiSmartphoneLine,
} from '@remixicon/react';
import { useRequest } from 'ahooks';
import { App, Avatar, Button, Card, Col, Row, Table } from 'antd';
import { useTranslations } from 'next-intl';
import React, { useCallback } from 'react';

const DeviceIcon: React.FC<{
  type: string;
}> = ({ type }) => {
  let icon: RemixiconComponentType;
  switch (type) {
    case 'PC':
      icon = RiComputerLine;
      break;
    case 'iPhone':
      icon = RiSmartphoneLine;
      break;
    default:
      icon = RiQuestionMark;
  }
  return (
    <Avatar
      className="bg-primary-500"
      shape="square"
      size={40}
      icon={React.createElement(icon, {
        size: 20,
      })}
    />
  );
};

const LoginLogs: React.FC = () => {
  const { message } = App.useApp();
  const t = useTranslations('app.pages.account.session');
  const g = useTranslations('global');
  const { data, loading, mutate, refresh } = useRequest(async () => {
    return await getSessionList().then((res) => res.data);
  });

  const handleLogout = useCallback(
    async (session_uuid: string) => {
      mutate((origin) => {
        return (origin || []).map((f) => {
          if (f.session_uuid === session_uuid) {
            return {
              ...f,
              loading: true,
            };
          }
          return f;
        });
      });
      try {
        await delSession(session_uuid);
        message.success(g('response.success'));
        refresh();
      } catch (e) {
        message.error((e as unknown as Error).message || g('response.error'));
      } finally {
        mutate((origin) => {
          return (origin || []).map((f) => {
            if (f.session_uuid === session_uuid) {
              return {
                ...f,
                loading: false,
              };
            }
            return f;
          });
        });
      }
    },
    [g, message, mutate],
  );

  return (
    <Card>
      <AntdTitle level={5} className="m-0 mb-2">
        {t('title')}
      </AntdTitle>
      <AntdParagraph type="secondary" className="mb-6">
        {t('subtitle')}
      </AntdParagraph>
      <Table<SessionRecord & { loading?: boolean }>
        loading={loading}
        dataSource={data}
        rowKey="id"
        scroll={{
          x: 1200,
        }}
        columns={[
          {
            title: t('columns.device'),
            render: (_, record) => {
              return (
                <Row gutter={8} wrap={false}>
                  <Col flex="none">
                    <DeviceIcon type={record.device} />
                  </Col>
                  <Col flex="auto">
                    <div>{record.browser}</div>
                    <div className="text-xs text-black/50">{record.os}</div>
                  </Col>
                </Row>
              );
            },
          },
          {
            title: t('columns.location'),
            render: () => {
              return <></>;
            },
          },
          {
            title: t('columns.ip'),
            dataIndex: 'ip',
          },
          {
            title: t('columns.time'),
            dataIndex: 'last_login_time',
          },
          {
            title: t('columns.operate'),
            dataIndex: 'session_uuid',
            width: 140,
            align: 'center',
            render: (value, record) => {
              return (
                <>
                  <Button
                    loading={record?.loading}
                    type="link"
                    onClick={() => handleLogout(value)}
                  >
                    {t('actions.logout')}
                  </Button>
                </>
              );
            },
          },
        ]}
        pagination={false}
      />
    </Card>
  );
};

export default LoginLogs;
