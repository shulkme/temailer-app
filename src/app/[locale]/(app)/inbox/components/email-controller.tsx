'use client';
import { addArchive } from '@/apis/archive';
import { EMAIL_CHANNEL_TYPE_ENUM } from '@/apis/email/enums';
import { createIssue } from '@/apis/issue';
import { ISSUE_TYPE_ENUM } from '@/apis/issue/enums';
import { useInbox } from '@/app/[locale]/(app)/inbox/context';
import {
  AntdForm,
  AntdFormItem,
  AntdInput,
  AntdSkeletonInput,
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
import { useRequest, useSetState } from 'ahooks';
import {
  Alert,
  App,
  AutoComplete,
  AutoCompleteProps,
  Button,
  Card,
  FormProps,
  Modal,
  Space,
} from 'antd';
import { useTranslations } from 'next-intl';
import { debounce } from 'radash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

const CustomModal: React.FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
}> = ({ open, setOpen }) => {
  const t = useTranslations('app.pages.inbox.custom');
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
  const { domains, currentChannel, setCurrentEmails, randomEmail } = useInbox();
  const [form] = AntdForm.useForm();

  const afterClose = () => {
    form.resetFields();
  };

  const currentDomains = useMemo(() => {
    return domains
      .filter((f) => f.provider_type === currentChannel)
      .map((f) => f.name);
  }, [domains, currentChannel]);

  const handleSearch = useCallback(
    (value: string) => {
      setOptions(() => {
        if (!value || value.includes('@')) {
          return [];
        }
        return [
          {
            label: 'Public',
            options: currentDomains.map((domain) => ({
              label: `${value}@${domain}`,
              value: `${value}@${domain}`,
            })),
          },
        ];
      });
    },
    [currentDomains],
  );

  const handleRandom = debounce({ delay: 100 }, () => {
    const email = randomEmail(currentChannel);
    if (email) form.setFieldValue('email', email);
  });

  const handleFormFinish: FormProps['onFinish'] = (values) => {
    const { email } = values;
    setCurrentEmails({
      [currentChannel]: email as string,
    });
    setOpen(false);
  };

  return (
    <Modal
      classNames={{
        body: 'pt-6 pb-1',
      }}
      open={open}
      onCancel={() => setOpen(false)}
      title={t('title')}
      afterClose={afterClose}
      onOk={form.submit}
    >
      <AntdForm form={form} layout="vertical" onFinish={handleFormFinish}>
        <div className="relative">
          <AntdFormItem
            name="email"
            rules={[
              {
                type: 'email',
              },
            ]}
            validateDebounce={300}
          >
            <AutoComplete
              maxLength={24}
              allowClear
              classNames={{
                root: '[&_.ant-select-selector]:pr-12 [&_.ant-select-clear]:right-12',
              }}
              size="large"
              options={options}
              className="w-full"
              placeholder={t('form.email.placeholder')}
              onSearch={handleSearch}
            />
          </AntdFormItem>
          <div className="absolute top-2 right-2 flex items-center justify-center">
            <AntdTooltip title={t('actions.random')}>
              <Button
                color="default"
                variant="filled"
                size="small"
                className="leading-none"
                icon={<RiDiceLine size={20} />}
                onClick={handleRandom}
              />
            </AntdTooltip>
          </div>
        </div>
      </AntdForm>
    </Modal>
  );
};

const IssueModal: React.FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
}> = ({ open, setOpen }) => {
  const t = useTranslations('app.pages.inbox.issue');
  const g = useTranslations('global');
  const [form] = AntdForm.useForm();
  const { message } = App.useApp();
  const { currentEmail } = useInbox();

  const afterClose = () => {
    form.resetFields();
  };

  const { run: doSubmit, loading: submitting } = useRequest(createIssue, {
    manual: true,
    onSuccess: () => {
      message.success(g('response.success'));
      setOpen(false);
    },
    onError: (e) => {
      message.error(e.message);
    },
  });

  const handleFormFinish: FormProps['onFinish'] = (values) => {
    doSubmit(values);
  };

  useEffect(() => {
    if (currentEmail && open) {
      form.setFieldValue(['meta', 'email'], currentEmail);
    }
  }, [currentEmail, open]);
  return (
    <Modal
      classNames={{
        header: 'mb-4',
      }}
      okButtonProps={{
        loading: submitting,
      }}
      cancelButtonProps={{
        disabled: submitting,
      }}
      open={open}
      title={t('title')}
      onCancel={() => setOpen(false)}
      okText={t('actions.submit')}
      onOk={form.submit}
      afterClose={afterClose}
    >
      <div className="mb-4">
        <Alert showIcon type="warning" message={t('tips')} />
      </div>
      <AntdForm
        form={form}
        requiredMark={false}
        layout="vertical"
        onFinish={handleFormFinish}
      >
        <AntdFormItem name="type" hidden initialValue={ISSUE_TYPE_ENUM.EMAIL}>
          <AntdInput />
        </AntdFormItem>
        <AntdFormItem
          name={['meta', 'email']}
          label={t('form.email.label')}
          messageVariables={{
            label: t('form.email.label'),
          }}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <AntdInput placeholder={t('form.email.placeholder')} readOnly />
        </AntdFormItem>
        <AntdFormItem
          name="content"
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
  const g = useTranslations('global');
  const [form] = AntdForm.useForm();
  const { message } = App.useApp();
  const { currentEmail } = useInbox();

  const afterClose = () => {
    form.resetFields();
  };

  const { run: doSubmit, loading: submitting } = useRequest(addArchive, {
    manual: true,
    onSuccess: () => {
      message.success(g('response.success'));
      setOpen(false);
    },
    onError: (e) => {
      message.error(e.message);
    },
  });

  const handleFormFinish: FormProps['onFinish'] = (values) => {
    doSubmit(values);
  };

  useEffect(() => {
    if (currentEmail && open) {
      form.setFieldValue('name', currentEmail);
    }
  }, [currentEmail, open]);

  return (
    <Modal
      classNames={{
        header: 'mb-4',
      }}
      title={t('title')}
      okButtonProps={{
        loading: submitting,
      }}
      cancelButtonProps={{
        disabled: submitting,
      }}
      open={open}
      onCancel={() => setOpen(false)}
      okText={t('actions.save')}
      onOk={form.submit}
      afterClose={afterClose}
    >
      <AntdForm
        requiredMark={false}
        form={form}
        layout="vertical"
        onFinish={handleFormFinish}
      >
        <AntdFormItem
          rules={[
            {
              required: true,
            },
          ]}
          name="name"
          label={t('form.email.label')}
          messageVariables={{
            label: t('form.email.label'),
          }}
        >
          <AntdInput placeholder={t('form.email.placeholder')} readOnly />
        </AntdFormItem>
        <AntdFormItem name="remark" label={t('form.remark.label')}>
          <AntdTextArea placeholder={t('form.remark.placeholder')} />
        </AntdFormItem>
      </AntdForm>
    </Modal>
  );
};

const EmailController: React.FC = () => {
  const t = useTranslations('app.pages.inbox');
  const {
    currentChannel,
    currentEmail,
    setCurrentEmails,
    randomEmail,
    loading,
  } = useInbox();
  const [open, setOpen] = useSetState<{
    custom: boolean;
    issue: boolean;
    archive: boolean;
  }>({
    custom: false,
    issue: false,
    archive: false,
  });

  const handleRandom = debounce({ delay: 100 }, () => {
    const email = randomEmail(currentChannel);
    setCurrentEmails({
      [currentChannel]: email,
    });
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
            {loading ? (
              <AntdSkeletonInput active />
            ) : (
              <AntdTitle level={2} className="m-0">
                {currentEmail || t('email.empty')}
              </AntdTitle>
            )}
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
                onClick={handleRandom}
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
        <div className="bg-gray-50 px-6 py-2 text-black/50 text-xs rounded-b-lg">
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
