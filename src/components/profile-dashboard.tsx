'use client';
import { User } from 'firebase/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

type ProfileDashboardProps = {
  user: User;
};

export default function ProfileDashboard({ user }: ProfileDashboardProps) {
    const router = useRouter();
    
    const handleLogout = async () => {
        await signOut(auth);
        router.push('/');
    };
    
    const getInitials = (email: string | null | undefined) => {
        if (!email) return 'U';
        return email.charAt(0).toUpperCase();
    }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary">
                <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                <AvatarFallback className="text-4xl">{getInitials(user.email)}</AvatarFallback>
            </Avatar>
          <CardTitle className="text-3xl">{user.displayName || "User Profile"}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Details</h3>
                <div className="space-y-2 text-sm">
                    <p><strong>Email Verified:</strong> {user.emailVerified ? 'Yes' : 'No'}</p>
                    <p><strong>Account Created:</strong> {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}</p>
                    <p><strong>Last Signed In:</strong> {user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleString() : 'N/A'}</p>
                </div>
            </div>
            <div className="flex justify-center pt-4">
                <Button onClick={handleLogout} variant="destructive">
                    <LogOut className="mr-2 h-4 w-4"/>
                    Log Out
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
