import LoginLogs from '@/app/[locale]/(app)/account/components/login-logs';
import UserInfo from '@/app/[locale]/(app)/account/components/user-info';

export default function Page() {
  return (
    <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
      <UserInfo />
      <LoginLogs />
    </div>
  );
}
