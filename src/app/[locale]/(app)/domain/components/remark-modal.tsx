'use client';
import { setDomainRemark } from '@/apis/domain';
import { DomainRecord } from '@/apis/domain/types';
import { AntdForm, AntdFormItem, AntdTextArea } from '@/components/antd';
import { useRequest } from 'ahooks';
import { App, FormProps, Modal } from 'antd';
import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';

const RemarkModal: React.FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
  record?: DomainRecord;
  afterClose?: () => void;
  afterSubmit?: () => void;
}> = ({ open, setOpen, record, afterClose, afterSubmit }) => {
  const [form] = AntdForm.useForm();
  const { message } = App.useApp();
  const g = useTranslations('global');
  const t = useTranslations('app.pages.domain.remark');

  const _afterClose = () => {
    form.resetFields();
    afterClose?.();
  };

  const { loading: submitting, run: doSubmit } = useRequest(setDomainRemark, {
    manual: true,
    onSuccess: () => {
      message.success(g('response.success'));
      setOpen(false);
      afterSubmit?.();
    },
    onError: (e) => {
      message.error(e.message);
    },
  });

  const onFormFinish: FormProps['onFinish'] = (values) => {
    doSubmit(record!.id, values);
  };

  useEffect(() => {
    if (open && record) {
      form.setFieldValue('remark', record.remark);
    }
  }, [form, open, record]);
  return (
    <Modal
      afterClose={_afterClose}
      title={t('title')}
      classNames={{
        header: 'mb-4',
      }}
      open={open}
      onCancel={() => setOpen(false)}
      okButtonProps={{
        loading: submitting,
      }}
      cancelButtonProps={{
        disabled: submitting,
      }}
      onOk={form.submit}
    >
      <AntdForm form={form} layout="vertical" onFinish={onFormFinish}>
        <AntdFormItem
          name="remark"
          messageVariables={{
            label: t('form.notes.label'),
          }}
        >
          <AntdTextArea rows={5} placeholder={t('form.notes.placeholder')} />
        </AntdFormItem>
      </AntdForm>
    </Modal>
  );
};

export default RemarkModal;
