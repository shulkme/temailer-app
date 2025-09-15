import { Link } from '@/i18n/navigation';
import { Button } from 'antd';

export default async function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8">
      <div>
        <Link href="/dashboard">
          <Button type="primary">Login</Button>
        </Link>
      </div>
    </div>
  );
}
