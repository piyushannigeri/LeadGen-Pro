'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Wand2, Copy, Check, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { generateLinkedInMessageAction } from '@/lib/actions/generation';
import { useAuth } from '@/hooks/use-auth';

const formSchema = z.object({
  leadName: z.string().min(2, 'Lead name is required.'),
  leadRole: z.string().min(2, 'Lead role is required.'),
  leadCompany: z.string().min(2, 'Lead company is required.'),
  yourRole: z.string().min(2, 'Your role is required.'),
});

export default function LinkedinOutreachTab() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { leadName: '', leadRole: '', leadCompany: '', yourRole: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setMessage('');
    const result = await generateLinkedInMessageAction({
        ...values,
        yourName: user?.displayName || 'Sales Rep'
    });
    setIsLoading(false);

    if (result.success && result.data?.message) {
      setMessage(result.data.message);
      toast({ title: 'Message Generated!' });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error Generating Message',
        description: result.error || 'An unknown error occurred.',
      });
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setHasCopied(true);
    toast({ title: 'Message copied to clipboard!' });
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><MessageSquare size={24} />Craft LinkedIn Message</CardTitle>
          <CardDescription>Generate a personalized connection request or message.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField control={form.control} name="leadName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lead's Name</FormLabel>
                    <FormControl><Input placeholder="e.g., Jane Doe" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
              )} />
              <FormField control={form.control} name="leadRole" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lead's Role</FormLabel>
                    <FormControl><Input placeholder="e.g., VP of Marketing" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
              )} />
              <FormField control={form.control} name="leadCompany" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lead's Company</FormLabel>
                    <FormControl><Input placeholder="e.g., Acme Inc." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
              )} />
              <FormField control={form.control} name="yourRole" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Role</FormLabel>
                    <FormControl><Input placeholder="e.g., Account Executive" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
              )} />
              <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-primary to-accent text-white">
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating...</> : <><Wand2 className="mr-2 h-4 w-4" />Generate Message</>}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Generated Message</CardTitle>
            <CardDescription>Copy the message to use on LinkedIn.</CardDescription>
          </div>
           {message && (
             <Button variant="outline" size="icon" onClick={handleCopy}>
                {hasCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
           )}
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
            <Textarea 
                readOnly 
                value={isLoading ? 'Generating your personalized message...' : message} 
                className="flex-grow resize-none bg-secondary min-h-[250px]"
                placeholder="Your generated LinkedIn message will appear here..."
            />
        </CardContent>
      </Card>
    </div>
  );
}
