import Spinner from '@/components/atoms/Spinner/Spinner';
import LandingPageSkeleton from '@/components/organisms/LandingPage/LandingPageSkeleton';

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Spinner />
      <LandingPageSkeleton />
    </div>
  );
}
