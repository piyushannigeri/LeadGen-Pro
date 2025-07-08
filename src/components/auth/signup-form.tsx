'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, firebaseConfig } from '@/lib/firebase/config';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  companyName: z.string().optional(),
  role: z.string().optional(),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ['confirmPassword'],
});

export default function SignupForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      companyName: '',
      role: '',
      email: '',
      password: '',
      confirmPassword: '',
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
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
            displayName: values.fullName
        });
      }

      toast({
        title: 'Account Created!',
        description: `Welcome to LeadGen Pro, ${values.fullName}! You're now logged in.`,
      });
      router.push('/');
    } catch (err: any) {
      let description = 'An error occurred. Please try again.';
      if (err.code === 'auth/email-already-in-use') {
        description = 'This email address is already in use by another account.';
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
             <div className="mb-4 rounded-lg border-l-4 border-destructive bg-destructive/20 p-3 text-sm text-destructive-foreground">
                {error}
            </div>
        )}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-muted-foreground mb-2">Full Name</label>
                <input
                    id="fullName"
                    type="text"
                    placeholder="e.g., Jane Doe"
                    {...form.register('fullName')}
                    className="w-full px-4 py-3 rounded-lg border border-transparent bg-background/50 text-foreground transition-all duration-300 focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                {form.formState.errors.fullName && <p className="mt-1 text-xs text-red-600">{form.formState.errors.fullName.message}</p>}
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-muted-foreground mb-2">Company (Optional)</label>
                    <input
                        id="companyName"
                        type="text"
                        placeholder="e.g., Acme Inc."
                        {...form.register('companyName')}
                        className="w-full px-4 py-3 rounded-lg border border-transparent bg-background/50 text-foreground transition-all duration-300 focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                </div>
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-muted-foreground mb-2">Role (Optional)</label>
                    <input
                        id="role"
                        type="text"
                        placeholder="e.g., Marketing Manager"
                        {...form.register('role')}
                        className="w-full px-4 py-3 rounded-lg border border-transparent bg-background/50 text-foreground transition-all duration-300 focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                </div>
            </div>
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
                    placeholder="8+ characters"
                    {...form.register('password')}
                    className="w-full px-4 py-3 rounded-lg border border-transparent bg-background/50 text-foreground transition-all duration-300 focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                {form.formState.errors.password && <p className="mt-1 text-xs text-red-600">{form.formState.errors.password.message}</p>}
            </div>
            <div>
                <label htmlFor="confirmPassword"  className="block text-sm font-medium text-muted-foreground mb-2">Confirm Password</label>
                <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Re-enter your password"
                    {...form.register('confirmPassword')}
                    className="w-full px-4 py-3 rounded-lg border border-transparent bg-background/50 text-foreground transition-all duration-300 focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                {form.formState.errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{form.formState.errors.confirmPassword.message}</p>}
            </div>
            <button type="submit" disabled={isLoading} className="w-full mt-2.5 flex items-center justify-center rounded-lg bg-gradient-to-r from-primary to-accent px-4 py-3.5 text-base font-semibold text-white shadow-md transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-100 disabled:opacity-70 disabled:pointer-events-none">
                {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                Create Account
            </button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Already have an account? <Link href="/login" className="font-medium text-primary hover:text-accent hover:underline">Sign in here</Link></p>
        </div>
    </div>
  );
}
