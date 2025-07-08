'use client';

import { useAuth } from '@/hooks/use-auth';
import LandingPage from '@/components/landing-page';
import Header from '@/components/header';
import MainDashboard from '@/components/main-dashboard';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const { user, loading } = useAuth();

  const renderLoading = () => (
    <div className="container mx-auto p-4 md:p-8">
      <div className="space-y-4">
        <Skeleton className="h-12 w-1/4" />
        <div className="flex gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background/50 dark:bg-gray-900">
      <Header />
      <main className="flex-grow">
        {loading ? renderLoading() : user ? <MainDashboard /> : <LandingPage />}
      </main>
    </div>
  );
}
