'use client';
import { EMAIL_CHANNEL_TYPE_ENUM } from '@/apis/email/enums';
import { useInbox } from '@/app/[locale]/(app)/inbox/context';
import {
  AntdForm,
  AntdFormItem,
  AntdInput,
  AntdTextArea,
  AntdTitle,
  AntdTooltip,
} from '@/components/antd';
import {
  RiBookmarkLine,
  RiDiceLine,
  RiEditLine,
  RiFileCopyLine,
  RiQuestionnaireLine,
} from '@remixicon/react';
import { useSetState } from 'ahooks';
import {
  Alert,
  AutoComplete,
  AutoCompleteProps,
  Button,
  Card,
  Modal,
  Space,
} from 'antd';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

const CustomModal: React.FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
}> = ({ open, setOpen }) => {
  const t = useTranslations('app.pages.inbox.custom');
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);

  const handleSearch = (value: string) => {
    setOptions(() => {
      if (!value || value.includes('@')) {
        return [];
      }
      return ['gmail.com', '163.com', 'qq.com'].map((domain) => ({
        label: `${value}@${domain}`,
        value: `${value}@${domain}`,
      }));
    });
  };

  return (
    <Modal
      classNames={{
        body: 'py-4',
      }}
      open={open}
      onCancel={() => setOpen(false)}
      title={t('title')}
    >
      <AntdForm layout="vertical">
        <AntdFormItem noStyle>
          <div className="relative">
            <AutoComplete
              classNames={{
                root: '[&>div]:pr-12',
              }}
              size="large"
              options={options}
              className="w-full"
              placeholder={t('form.email.placeholder')}
              onSearch={handleSearch}
            />
            <div className="absolute top-0 bottom-0 right-2 flex items-center justify-center">
              <AntdTooltip title={t('actions.random')}>
                <Button
                  color="default"
                  variant="filled"
                  size="small"
                  className="leading-none"
                  icon={<RiDiceLine size={20} />}
                />
              </AntdTooltip>
            </div>
          </div>
        </AntdFormItem>
      </AntdForm>
    </Modal>
  );
};

const IssueModal: React.FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
}> = ({ open, setOpen }) => {
  const t = useTranslations('app.pages.inbox.issue');
  return (
    <Modal
      classNames={{
        header: 'mb-4',
      }}
      open={open}
      title={t('title')}
      onCancel={() => setOpen(false)}
      okText={t('actions.submit')}
    >
      <div className="mb-4">
        <Alert showIcon type="warning" message={t('tips')} />
      </div>
      <AntdForm layout="vertical">
        <AntdFormItem
          label={t('form.email.label')}
          messageVariables={{
            label: t('form.email.label'),
          }}
        >
          <AntdInput placeholder={t('form.email.placeholder')} />
        </AntdFormItem>
        <AntdFormItem
          label={t('form.content.label')}
          messageVariables={{
            label: t('form.content.label'),
          }}
        >
          <AntdTextArea placeholder={t('form.content.placeholder')} />
        </AntdFormItem>
      </AntdForm>
    </Modal>
  );
};

const ArchiveModal: React.FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
}> = ({ open, setOpen }) => {
  const t = useTranslations('app.pages.inbox.archive');
  return (
    <Modal
      classNames={{
        header: 'mb-4',
      }}
      title={t('title')}
      open={open}
      onCancel={() => setOpen(false)}
      okText={t('actions.save')}
    >
      <AntdForm layout="vertical">
        <AntdFormItem
          label={t('form.email.label')}
          messageVariables={{
            label: t('form.email.label'),
          }}
        >
          <AntdInput placeholder={t('form.email.placeholder')} />
        </AntdFormItem>
        <AntdFormItem label={t('form.remark.label')}>
          <AntdTextArea placeholder={t('form.remark.placeholder')} />
        </AntdFormItem>
      </AntdForm>
    </Modal>
  );
};

const EmailController: React.FC = () => {
  const t = useTranslations('app.pages.inbox');
  const { currentChannel } = useInbox();
  const [open, setOpen] = useSetState<{
    custom: boolean;
    issue: boolean;
    archive: boolean;
  }>({
    custom: false,
    issue: false,
    archive: false,
  });
  return (
    <>
      <Card
        classNames={{
          body: 'p-0',
        }}
      >
        <div className="p-6">
          <div className="text-xs text-black/50 mb-4">{t('email.current')}</div>
          <div>
            <AntdTitle level={2} className="m-0">
              username@example.com
            </AntdTitle>
          </div>
          <div className="-ml-2 mt-6 flex justify-between items-center gap-2 flex-wrap">
            <Space>
              <Button
                type="text"
                className="leading-none"
                icon={<RiFileCopyLine size={18} />}
                size="small"
              >
                {t('email.actions.copy')}
              </Button>
              <Button
                type="text"
                className="leading-none"
                icon={<RiBookmarkLine size={18} />}
                size="small"
                onClick={() => setOpen({ archive: true })}
              >
                {t('email.actions.archive')}
              </Button>
              <Button
                type="text"
                className="leading-none"
                icon={<RiDiceLine size={18} />}
                size="small"
              >
                {t('email.actions.random')}
              </Button>
              {(currentChannel === EMAIL_CHANNEL_TYPE_ENUM.TEMP ||
                currentChannel === EMAIL_CHANNEL_TYPE_ENUM.EDU) && (
                <Button
                  type="text"
                  className="leading-none"
                  icon={<RiEditLine size={18} />}
                  size="small"
                  onClick={() => setOpen({ custom: true })}
                >
                  {t('email.actions.custom')}
                </Button>
              )}
            </Space>
            <Space>
              <Button
                type="text"
                className="leading-none"
                icon={<RiQuestionnaireLine size={18} />}
                size="small"
                onClick={() => setOpen({ issue: true })}
              >
                {t('email.actions.help')}
              </Button>
            </Space>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-2 text-black/50 text-xs">
          {t('email.alert')} 2025-09-24 16:40
        </div>
      </Card>
      <CustomModal open={open.custom} setOpen={(o) => setOpen({ custom: o })} />
      <IssueModal open={open.issue} setOpen={(o) => setOpen({ issue: o })} />
      <ArchiveModal
        open={open.archive}
        setOpen={(o) => setOpen({ archive: o })}
      />
    </>
  );
};

export default EmailController;
