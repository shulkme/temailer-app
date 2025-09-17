import { AntdTitle } from '@/components/antd';
import { Title } from '@/providers/title';
import { Card } from 'antd';

export default function Page() {
  return (
    <>
      <Title title={'订阅'} />
      <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
        <Card>
          <AntdTitle level={5} className="mb-4 lg:mb-6">
            当前套餐
          </AntdTitle>
        </Card>
      </div>
    </>
  );
}
