'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Wand2, Copy, Check, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateEmailAction } from '@/lib/actions/generation';
import { useAuth } from '@/hooks/use-auth';

const formSchema = z.object({
  leadName: z.string().min(2, 'Lead name is required.'),
  leadCompany: z.string().min(2, 'Lead company is required.'),
  yourCompany: z.string().min(2, 'Your company name is required.'),
  goal: z.string({ required_error: 'Please select an email goal.' }),
});

type GeneratedEmail = {
    subject: string;
    body: string;
}

export default function EmailOutreachTab() {
  const [email, setEmail] = useState<GeneratedEmail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { leadName: '', leadCompany: '', yourCompany: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setEmail(null);
    const result = await generateEmailAction({
      ...values,
      yourName: user?.displayName || 'Sales Rep',
    });
    setIsLoading(false);

    if (result.success && result.data) {
      setEmail(result.data);
      toast({ title: 'Email Generated!' });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error Generating Email',
        description: result.error || 'An unknown error occurred.',
      });
    }
  }

  const handleCopy = () => {
    if (!email) return;
    const textToCopy = `Subject: ${email.subject}\n\n${email.body}`;
    navigator.clipboard.writeText(textToCopy);
    setHasCopied(true);
    toast({ title: 'Email copied to clipboard!' });
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Mail size={24} /> Draft a Cold Email</CardTitle>
          <CardDescription>Generate a personalized email for your outreach campaign.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField control={form.control} name="leadName" render={({ field }) => (
                <FormItem><FormLabel>Lead's Name</FormLabel><FormControl><Input placeholder="e.g., Alex Smith" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="leadCompany" render={({ field }) => (
                <FormItem><FormLabel>Lead's Company</FormLabel><FormControl><Input placeholder="e.g., Innovate Corp" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="yourCompany" render={({ field }) => (
                <FormItem><FormLabel>Your Company</FormLabel><FormControl><Input placeholder="e.g., Solutions Ltd." {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="goal" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Goal</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a goal..." /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="Book a meeting">Book a meeting</SelectItem>
                      <SelectItem value="Introduce a product">Introduce a product</SelectItem>
                      <SelectItem value="Follow up">Follow up</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-primary to-accent text-white">
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating...</> : <><Wand2 className="mr-2 h-4 w-4" />Generate Email</>}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Generated Email</CardTitle>
            <CardDescription>Review and copy the generated email.</CardDescription>
          </div>
           {email && (
             <Button variant="outline" size="icon" onClick={handleCopy}>
                {hasCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
           )}
        </CardHeader>
        <CardContent className="space-y-4">
            <Input 
                readOnly 
                value={isLoading ? 'Generating subject...' : (email?.subject || '')} 
                placeholder="Subject line"
                className="font-semibold bg-secondary"
            />
            <Textarea 
                readOnly 
                value={isLoading ? 'Generating email body...' : (email?.body || '')} 
                className="h-full min-h-[300px] resize-none bg-secondary"
                placeholder="Your generated email body will appear here..."
            />
        </CardContent>
      </Card>
    </div>
  );
}
