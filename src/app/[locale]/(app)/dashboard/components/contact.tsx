'use client';
import { AntdParagraph, AntdText, AntdTitle } from '@/components/antd';
import { Link } from '@/i18n/navigation';
import { useChatbot } from '@/providers/chatbot';
import {
  RiChatSmile2Line,
  RiExternalLinkLine,
  RiFileList3Line,
  RiMailLine,
  RiQuestionLine,
  RiTelegram2Line,
} from '@remixicon/react';
import { Avatar, Button, Card, ConfigProvider, Divider } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';

const Contact: React.FC = () => {
  const t = useTranslations('app.pages.dashboard.help');
  const { openChatbot } = useChatbot();
  return (
    <Card
      className="bg-linear-210 from-blue-50 to-transparent to-35%"
      classNames={{
        body: 'bg-transparent',
      }}
    >
      <div className="mb-2 text-(--ant-color-primary)">
        <RiChatSmile2Line size={32} />
      </div>
      <AntdTitle level={5} className="mt-0 mb-4">
        {t('title')}
      </AntdTitle>
      <AntdParagraph>{t('desc')}</AntdParagraph>
      <Button block color="primary" variant="outlined" onClick={openChatbot}>
        {t('contact')}
      </Button>

      <Divider type="horizontal" dashed />

      <ul className="space-y-4">
        <li>
          <Link
            href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`}
            className="flex items-center justify-between"
          >
            <div className="flex-auto flex items-center gap-2">
              <Avatar
                size={32}
                className="bg-(--ant-color-primary-bg) text-(--ant-color-primary)"
              >
                <RiMailLine size={18} />
              </Avatar>
              <span className="text-black font-bold">
                {process.env.NEXT_PUBLIC_SUPPORT_EMAIL}
              </span>
            </div>
            <div className="flex-none text-black/50">
              <ConfigProvider
                theme={{
                  components: {
                    Typography: {
                      colorLink: 'rgba(0,0,0,0.5)',
                    },
                  },
                }}
              >
                <AntdText
                  copyable={{
                    text: process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
                  }}
                />
              </ConfigProvider>
            </div>
          </Link>
        </li>
        <li>
          <Link
            target="_blank"
            href={process.env.NEXT_PUBLIC_SUPPORT_TELEGRAM!}
            className="flex items-center justify-between"
          >
            <div className="flex-auto flex items-center gap-2">
              <Avatar
                size={32}
                className="bg-(--ant-color-primary-bg) text-(--ant-color-primary)"
              >
                <RiTelegram2Line size={18} />
              </Avatar>
              <span className="text-black font-bold">
                {process.env.NEXT_PUBLIC_SUPPORT_TELEGRAM}
              </span>
            </div>
            <div className="flex-none text-black/50">
              <ConfigProvider
                theme={{
                  components: {
                    Typography: {
                      colorLink: 'rgba(0,0,0,0.5)',
                    },
                  },
                }}
              >
                <AntdText
                  copyable={{
                    text: process.env.NEXT_PUBLIC_SUPPORT_TELEGRAM,
                  }}
                />
              </ConfigProvider>
            </div>
          </Link>
        </li>
        <li>
          <Link
            href={process.env.NEXT_PUBLIC_DOC_URL!}
            target="_blank"
            className="flex items-center justify-between"
          >
            <div className="flex-auto flex items-center gap-2">
              <Avatar
                size={32}
                className="bg-(--ant-color-primary-bg) text-(--ant-color-primary)"
              >
                <RiFileList3Line size={18} />
              </Avatar>
              <span className="text-black font-bold">
                {t('links.documentation')}
              </span>
            </div>
            <div className="flex-none text-black/50">
              <RiExternalLinkLine size={16} />
            </div>
          </Link>
        </li>
        <li>
          <Link
            href={`${process.env.NEXT_PUBLIC_DOC_URL}/faq`}
            target="_blank"
            className="flex items-center justify-between"
          >
            <div className="flex-auto flex items-center gap-2">
              <Avatar
                size={32}
                className="bg-(--ant-color-primary-bg) text-(--ant-color-primary)"
              >
                <RiQuestionLine size={18} />
              </Avatar>
              <span className="text-black font-bold">{t('links.faq')}</span>
            </div>
            <div className="flex-none text-black/50">
              <RiExternalLinkLine size={16} />
            </div>
          </Link>
        </li>
      </ul>
    </Card>
  );
};

export default Contact;
