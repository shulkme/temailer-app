import { EmailRecord } from '@/apis/email/types';
import { RiArrowLeftSLine } from '@remixicon/react';
import { Avatar, Drawer } from 'antd';
import React, { useEffect, useState } from 'react';

const DetailDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (
      e: CustomEvent<{
        data: EmailRecord;
      }>,
    ) => {
      console.log(e);
      setOpen(true);
    };

    window.addEventListener('email:preview', handler as EventListener);

    return () => {
      window.removeEventListener('email:preview', handler as EventListener);
    };
  }, []);
  return (
    <Drawer
      title={
        <div className="flex gap-4">
          <div>
            <Avatar size={40}>FORM</Avatar>
          </div>
          <div className="leading-none">
            <h2 className="text-base font-bold leading-5">Form name</h2>
            <p className="text-xs font-normal leading-5 text-black/50">
              form_email@example.com
            </p>
          </div>
        </div>
      }
      extra={<div className="text-xs text-black/50">9月23日</div>}
      open={open}
      onClose={() => setOpen(false)}
      // placement="bottom"
      width={960}
      closeIcon={<RiArrowLeftSLine size={24} />}
    ></Drawer>
  );
};

export default DetailDrawer;
