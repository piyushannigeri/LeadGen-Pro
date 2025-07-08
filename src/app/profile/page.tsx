'use client';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from '@/components/header';
import ProfileDashboard from '@/components/profile-dashboard';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header/>
            <div className="container mx-auto p-8">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-64 w-full mt-8" />
            </div>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
        <Header/>
        <ProfileDashboard user={user} />
    </div>
  );
}
