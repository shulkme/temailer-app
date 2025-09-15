import Hero from '@/app/[locale]/(app)/referral/program/components/hero';
import Material from '@/app/[locale]/(app)/referral/program/components/material';
import Reward from '@/app/[locale]/(app)/referral/program/components/reward';

export default function Page() {
  return (
    <>
      <div className="space-y-6 p-8">
        <Hero />
        <Reward />
        <Material />
      </div>
    </>
  );
}
