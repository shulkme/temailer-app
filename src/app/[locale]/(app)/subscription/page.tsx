import { AntdTitle } from '@/components/antd';
import { Title } from '@/providers/title';
import { Card } from 'antd';

export default function Page() {
  return (
    <>
      <Title title={'订阅'} />
      <div className="p-8 space-y-4">
        <Card>
          <AntdTitle level={5} className="mb-6">
            当前套餐
          </AntdTitle>
        </Card>
      </div>
    </>
  );
}
