'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Loader2, Zap, UserPlus, Download, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { GeneratedLeadWithId } from '@/types';
import { generateLeadsAction } from '@/lib/actions/generation';
import { Badge } from '@/components/ui/badge';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const formSchema = z.object({
  industry: z.string().min(2, { message: 'Industry is required.' }),
  location: z.string().min(2, { message: 'Location is required.' }),
  companySize: z.string().min(1, { message: 'Company size is required.' }),
  count: z.coerce.number().min(1, "Please generate at least 1 lead.").max(10, "You can generate a maximum of 10 leads."),
});

type LeadGenerationTabProps = {
  leads: GeneratedLeadWithId[];
  onLeadsGenerated: (leads: GeneratedLeadWithId[]) => void;
};

export default function LeadGenerationTab({ leads, onLeadsGenerated }: LeadGenerationTabProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [mapLead, setMapLead] = useState<GeneratedLeadWithId | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { industry: '', location: '', companySize: '', count: 5 },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const result = await generateLeadsAction(values);
    setIsLoading(false);

    if (result.success && result.data?.leads) {
      const newLeads = result.data.leads.map(lead => ({...lead, id: crypto.randomUUID() }));
      onLeadsGenerated(newLeads);
      toast({
        title: 'Leads Generated!',
        description: `Successfully found ${result.data.leads.length} new leads.`,
      });
      form.reset({ ...form.getValues(), industry: '', location: '', companySize: '' });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error Generating Leads',
        description: result.error || 'An unknown error occurred.',
      });
    }
  }

  const getBadgeVariant = (score: number): 'default' | 'secondary' | 'destructive' => {
    if (score > 75) return 'default';
    if (score > 40) return 'secondary';
    return 'destructive';
  };

  const handleExport = () => {
    const doc = new jsPDF();
    doc.text("Generated Leads", 14, 16);
    (doc as any).autoTable({
      head: [['Company', 'Contact', 'Role', 'Email', 'Score', 'Reason']],
      body: leads.map(lead => [lead.companyName, lead.contactPerson, lead.role, lead.email, lead.score, lead.reason]),
      startY: 20,
      theme: 'grid',
      headStyles: { fillColor: [45, 52, 129] },
    });
    doc.save('generated-leads.pdf');
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Zap size={24}/> Generate New Leads</CardTitle>
          <CardDescription>Describe your ideal customer profile and let AI find them for you.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <FormField control={form.control} name="industry" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <FormControl><Input placeholder="e.g., SaaS" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="location" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl><Input placeholder="e.g., California, USA" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="companySize" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Size</FormLabel>
                    <FormControl><Input placeholder="e.g., 50-200" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                 <FormField control={form.control} name="count" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Leads</FormLabel>
                    <FormControl><Input type="number" min="1" max="10" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-primary to-accent text-white">
                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating...</> : <><Zap className="mr-2 h-4 w-4" />Generate Leads</>}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Generated Leads</CardTitle>
          <CardDescription>Review the leads found and scored by the AI.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && !leads.length && <div className="flex justify-center items-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary"/></div>}
          {!isLoading && leads.length === 0 && (
             <div className="flex flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed border-border bg-background/50 p-8 text-center">
                <div className="rounded-full bg-primary/10 p-3"><UserPlus className="h-8 w-8 text-primary" /></div>
                <h3 className="text-lg font-semibold">No leads generated yet</h3>
                <p className="text-sm text-muted-foreground">Fill out the form above to start generating leads.</p>
            </div>
          )}
          {leads.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map(lead => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.companyName}</TableCell>
                    <TableCell>{lead.contactPerson}</TableCell>
                    <TableCell>{lead.role}</TableCell>
                    <TableCell>{lead.email}</TableCell>
                    <TableCell>
                      <Badge variant={getBadgeVariant(lead.score)}>{lead.score}</Badge>
                    </TableCell>
                    <TableCell className="text-xs">{lead.reason}</TableCell>
                    <TableCell>
                      {lead.address && (
                        <Button variant="outline" size="icon" onClick={() => setMapLead(lead)}>
                          <MapPin className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        {leads.length > 0 && (
          <CardFooter className="border-t px-6 py-4">
            <Button onClick={handleExport} variant="outline" size="sm" className="ml-auto">
              <Download className="mr-2 h-4 w-4" />
              Export as PDF
            </Button>
          </CardFooter>
        )}
      </Card>

      <Dialog open={!!mapLead} onOpenChange={(isOpen) => !isOpen && setMapLead(null)}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-2">
            <DialogHeader className="p-4 pb-0">
                <DialogTitle>Lead Location: {mapLead?.companyName}</DialogTitle>
                <DialogDescription>{mapLead?.address}</DialogDescription>
            </DialogHeader>
            <div className="flex-grow rounded-b-lg overflow-hidden">
                {mapLead?.address && (
                    <iframe
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(mapLead.address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                    ></iframe>
                )}
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
