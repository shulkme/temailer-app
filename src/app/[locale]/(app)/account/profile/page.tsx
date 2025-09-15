import LoginLogs from '@/app/[locale]/(app)/account/profile/components/login-logs';
import UserInfo from '@/app/[locale]/(app)/account/profile/components/user-info';

export default function Page() {
  return (
    <div className="space-y-6 p-8">
      <UserInfo />
      <LoginLogs />
    </div>
  );
}
