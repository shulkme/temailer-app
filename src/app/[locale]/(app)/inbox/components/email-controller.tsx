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
      title={'Custom Email'}
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
              placeholder="Enter Email Address"
              onSearch={handleSearch}
            />
            <div className="absolute top-0 bottom-0 right-2 flex items-center justify-center">
              <AntdTooltip title={'Random'}>
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
  return (
    <Modal
      classNames={{
        header: 'mb-4',
      }}
      open={open}
      title={'Issue'}
      onCancel={() => setOpen(false)}
    >
      <div className="mb-4">
        <Alert
          showIcon
          type="warning"
          message={
            'If an email address cannot receive emails, please report it to us.'
          }
        />
      </div>
      <AntdForm layout="vertical">
        <AntdFormItem label={'Email Address'}>
          <AntdInput />
        </AntdFormItem>
        <AntdFormItem label={'Email Address'}>
          <AntdTextArea />
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
  }>({
    custom: false,
    issue: false,
  });
  return (
    <>
      <Card>
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
      </Card>
      <CustomModal open={open.custom} setOpen={(o) => setOpen({ custom: o })} />
      <IssueModal open={open.issue} setOpen={(o) => setOpen({ issue: o })} />
    </>
  );
};

export default EmailController;
