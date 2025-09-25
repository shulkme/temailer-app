import { getEmailDetail } from '@/apis/email';
import { EmailRecord } from '@/apis/email/types';
import { formatTimeWithTimezone } from '@/utils/time';
import { RiArrowLeftSLine } from '@remixicon/react';
import { useRequest } from 'ahooks';
import { Avatar, Drawer, DrawerProps } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const DetailDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState<EmailRecord>();
  const [error] = useState<string>();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const afterOpenChange: DrawerProps['afterOpenChange'] = (open) => {
    if (!open) {
      setRecord(undefined);
    }
  };

  const { run, loading } = useRequest(getEmailDetail, {
    manual: true,
    onSuccess: (res) => {
      setRecord(res.data);
    },
  });

  useEffect(() => {
    const handler = (e: CustomEvent<string>) => {
      setOpen(true);
      if (e.detail) run(e.detail);
    };

    window.addEventListener('email:preview', handler as EventListener);

    return () => {
      window.removeEventListener('email:preview', handler as EventListener);
    };
  }, []);

  return (
    <Drawer
      loading={loading}
      afterOpenChange={afterOpenChange}
      styles={{
        body: {
          padding: 0,
        },
      }}
      title={
        <div className="flex gap-4">
          <div>
            <Avatar size={40}>FORM</Avatar>
          </div>
          <div className="leading-none">
            <h2 className="text-base font-bold leading-5">
              {record?.from_name || 'Unknown'}
            </h2>
            <p className="text-xs font-normal leading-5 text-black/50">
              {record?.from_email || 'Unknown'}
            </p>
          </div>
        </div>
      }
      extra={
        <div className="text-xs text-black/50">
          {record?.created_time &&
            formatTimeWithTimezone(record?.created_time, 'YYYY-MM-DD HH:mm')}
        </div>
      }
      open={open}
      onClose={() => setOpen(false)}
      // placement="bottom"
      width={960}
      closeIcon={<RiArrowLeftSLine size={24} />}
    >
      <iframe
        style={{
          width: '100%',
          height: '100%',
          border: '0',
        }}
        srcDoc={record?.content}
        sandbox="allow-popups allow-popups-to-escape-sandbox" // 仅允许新标签页打开链接
      />
    </Drawer>
  );
};

export default DetailDrawer;
