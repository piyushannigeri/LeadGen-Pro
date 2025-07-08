'use client';

import SignupForm from '@/components/auth/signup-form';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

export default function SignupPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden">
      <div className="absolute top-0 -left-1/4 w-96 h-96 bg-primary rounded-full filter blur-2xl opacity-20 animate-blob dark:opacity-40"></div>
      <div style={{ animationDelay: '2000ms' }} className="absolute top-1/2 -right-1/4 w-96 h-96 bg-accent rounded-full filter blur-2xl opacity-20 animate-blob dark:opacity-40"></div>
      <div style={{ animationDelay: '4000ms' }} className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-400 rounded-full filter blur-2xl opacity-20 animate-blob dark:opacity-30"></div>

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
           <div className="w-full max-w-md overflow-hidden rounded-2xl bg-card/80 backdrop-blur-xl border border-border/20 p-8 shadow-2xl transition-all duration-500">
            <div className="mb-10 text-center">
              <Link href="/" className="inline-block">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-primary to-accent text-4xl font-bold text-white shadow-lg transition-transform duration-300 hover:scale-105">
                    P
                </div>
              </Link>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Create Your Account</h1>
              <p className="text-sm text-muted-foreground">Join LeadGen Pro to get started</p>
            </div>
            
            {isClient ? (
              <SignupForm />
            ) : (
                <div className="space-y-6">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-12 w-full rounded-lg" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-12 w-full rounded-lg" />
                </div>
                <Skeleton className="h-12 w-full mt-2 rounded-lg" />
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
