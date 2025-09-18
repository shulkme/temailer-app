'use client';
import { AntdTitle } from '@/components/antd';
import { Link } from '@/i18n/navigation';
import { Card, List } from 'antd';
import React from 'react';

const Task: React.FC = () => {
  return (
    <Card>
      <div className="flex items-center justify-between gap-4 mb-4">
        <AntdTitle level={5} className="m-0">
          发信任务
        </AntdTitle>
        <div>
          <Link href={''}>查看全部</Link>
        </div>
      </div>
      <List />
    </Card>
  );
};

export default Task;
