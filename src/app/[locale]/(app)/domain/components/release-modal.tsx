'use client';
import { useRequest } from 'ahooks';
import { App, Button, Modal, Result } from 'antd';
import Confetti from 'canvas-confetti';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

const ReleaseModal: React.FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
  id?: number;
  afterSubmit?: () => void;
  afterClose?: () => void;
}> = ({ open, setOpen, id, afterSubmit, afterClose }) => {
  const [success, setSuccess] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
      //return await releaseDomain(id!);
      return { data: 100 };
    },
    {
      manual: true,
      onSuccess: (res) => {
        setSuccess(true);
        setSalvage(res.data);
        if (!canvasRef.current) return;
        const myConfetti = Confetti.create(canvasRef.current, { resize: true });
        myConfetti({
          particleCount: 100, // 例子数量
          scalar: 1.5, // 粒子大小比例
          spread: 180, // 扩散角度
          origin: { y: -0.1 },
          startVelocity: -35, // 初速度
          gravity: 2, // 重力
          ticks: 100, // 粒子寿命
        });
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
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none', // 不阻止点击
          zIndex: 10000, // 保证在 Modal 上层
        }}
      />
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
