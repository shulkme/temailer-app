'use client';
import { releaseDomain } from '@/apis/domain';
import { useRequest } from 'ahooks';
import { App, Button, Modal, Result } from 'antd';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useState } from 'react';

const ReleaseModal: React.FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
  id?: number;
  afterSubmit?: () => void;
  afterClose?: () => void;
}> = ({ open, setOpen, id, afterSubmit, afterClose }) => {
  const [success, setSuccess] = useState(false);
  const [salvage, setSalvage] = useState(0);
  const { message } = App.useApp();
  const t = useTranslations('app.pages.domain.release');

  const handleAfterClose = () => {
    setSuccess(false);
    setSalvage(0);
    afterClose?.();
  };

  const { loading: submitting, run: doSubmit } = useRequest(
    async () => {
      return await releaseDomain(id!);
    },
    {
      manual: true,
      onSuccess: (res) => {
        setSuccess(true);
        setSalvage(res.data);
      },
      onError: (e) => {
        message.error(e.message);
      },
    },
  );

  const handleClose = () => {
    if (success) {
      afterSubmit?.();
    }
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      footer={false}
      afterClose={handleAfterClose}
      onCancel={() => setOpen(false)}
    >
      {success ? (
        <>
          <Result
            icon={
              <Image
                className="inline-block"
                src="/images/credit.png"
                width={72}
                height={72}
                alt="icon"
                unoptimized={false}
              />
            }
            title={t('success.title')}
            subTitle={t('success.subtitle', {
              num: salvage,
            })}
          />
          <div>
            <Button block type="primary" size="large" onClick={handleClose}>
              {t('success.submit')}
            </Button>
          </div>
        </>
      ) : (
        <>
          <Result
            icon={
              <Image
                className="inline-block"
                src="/images/gift.png"
                width={72}
                height={72}
                alt="icon"
                unoptimized={false}
              />
            }
            title={t('ready.title')}
            subTitle={t('ready.subtitle')}
          />

          <div>
            <Button
              loading={submitting}
              block
              type="primary"
              size="large"
              onClick={doSubmit}
            >
              {t('ready.submit')}
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default ReleaseModal;
