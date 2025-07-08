'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, FileText, MapPin } from 'lucide-react';
import type { ScoredLead } from '@/types';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

type LeadsTableProps = {
  leads: ScoredLead[];
};

export default function LeadsTable({ leads }: LeadsTableProps) {
  const [mapLead, setMapLead] = useState<ScoredLead | null>(null);

  const handleExport = () => {
    const doc = new jsPDF();
    doc.text("Scored Leads", 14, 16);
    (doc as any).autoTable({
      head: [['Email', 'Company Size', 'Score', 'Reason']],
      body: leads.map(lead => [lead.email, lead.companySize, lead.score, lead.reason]),
      startY: 20,
      theme: 'grid',
      headStyles: { fillColor: [103, 58, 183] },
    });
    doc.save('leads.pdf');
  };

  const getBadgeVariant = (score: number): 'default' | 'secondary' | 'destructive' => {
    if (score > 75) {
      return 'default';
    }
    if (score > 40) {
      return 'secondary';
    }
    return 'destructive';
  };

  return (
    <>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Scored Leads</CardTitle>
          <CardDescription>View and manage your AI-scored leads.</CardDescription>
        </CardHeader>
        <CardContent>
          {leads.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[25%]">Email</TableHead>
                  <TableHead>Company Size</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead className="w-[45%]">Reason</TableHead>
                  <TableHead>Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.email}</TableCell>
                    <TableCell>{lead.companySize}</TableCell>
                    <TableCell>
                      <Badge variant={getBadgeVariant(lead.score)} className="text-sm">
                        {lead.score}
                      </Badge>
                    </TableCell>
                    <TableCell>{lead.reason}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="icon" onClick={() => setMapLead(lead)}>
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed border-border bg-background/50 p-8 text-center">
              <div className="rounded-full bg-primary/10 p-3">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">No leads scored yet</h3>
              <p className="text-sm text-muted-foreground">
                Use the form above to score your first lead.
              </p>
            </div>
          )}
        </CardContent>
        {leads.length > 0 && (
          <CardFooter className="border-t px-6 py-4">
            <Button onClick={handleExport} className="ml-auto" variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export as PDF
            </Button>
          </CardFooter>
        )}
      </Card>

      <Dialog open={!!mapLead} onOpenChange={(isOpen) => !isOpen && setMapLead(null)}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-2">
            <DialogHeader className="p-4 pb-0">
                <DialogTitle>Lead Location: {mapLead?.email}</DialogTitle>
                <DialogDescription>{mapLead?.address}</DialogDescription>
            </DialogHeader>
            <div className="flex-grow rounded-b-lg overflow-hidden">
                {mapLead && (
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
    </>
  );
}
