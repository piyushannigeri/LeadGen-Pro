'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firebaseConfig } from '@/lib/firebase/config';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);

    if (firebaseConfig.apiKey === 'your-api-key' || !firebaseConfig.apiKey) {
      setError('Firebase is not configured. Please add your credentials to .env.local.');
      setIsLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: 'Login Successful',
        description: "Welcome back! Redirecting...",
      });
      router.push('/');
    } catch (err: any) {
      let description = 'Please check your credentials and try again.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        description = 'Invalid email or password. Please try again.';
      } else if (err.message) {
        description = err.message;
      }
      setError(description);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
        {error && (
            <div className="mb-6 rounded-lg border-l-4 border-destructive bg-destructive/20 p-3 text-sm text-destructive-foreground">
                {error}
            </div>
        )}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">Email Address</label>
                <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...form.register('email')}
                    className="w-full px-4 py-3 rounded-lg border border-transparent bg-background/50 text-foreground transition-all duration-300 focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                {form.formState.errors.email && <p className="mt-1 text-xs text-red-600">{form.formState.errors.email.message}</p>}
            </div>
            <div>
                <label htmlFor="password"  className="block text-sm font-medium text-muted-foreground mb-2">Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    {...form.register('password')}
                    className="w-full px-4 py-3 rounded-lg border border-transparent bg-background/50 text-foreground transition-all duration-300 focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                {form.formState.errors.password && <p className="mt-1 text-xs text-red-600">{form.formState.errors.password.message}</p>}
            </div>
            <button type="submit" disabled={isLoading} className="w-full mt-2.5 flex items-center justify-center rounded-lg bg-gradient-to-r from-primary to-accent px-4 py-3.5 text-base font-semibold text-white shadow-md transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-100 disabled:opacity-70 disabled:pointer-events-none">
                {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                Sign In
            </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Don't have an account? <Link href="/signup" className="font-medium text-primary hover:text-accent hover:underline">Sign up here</Link></p>
        </div>

        <div className="mt-8 text-center rounded-lg bg-primary/10 p-4 border border-primary/20">
            <h3 className="font-semibold text-primary">🚀 Supercharge Your Outreach</h3>
            <p className="text-sm text-primary/90">Use AI to find leads, and craft emails and LinkedIn messages.</p>
        </div>
    </div>
  );
}
