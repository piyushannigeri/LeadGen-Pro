'use client';

import { useState } from 'react';
import LeadForm from '@/components/lead-form';
import LeadsTable from '@/components/leads-table';
import type { ScoredLead } from '@/types';
import { scoreLeadAction } from '@/lib/actions/lead';
import type { ScoreLeadInput } from '@/ai/flows/score-lead';
import { useToast } from '@/hooks/use-toast';

type LeadScoringTabProps = {
  leads: ScoredLead[];
  onLeadScored: (lead: ScoredLead) => void;
};

export default function LeadScoringTab({ leads, onLeadScored }: LeadScoringTabProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAddLead = async (data: ScoreLeadInput, resetForm: () => void) => {
    setIsLoading(true);
    const result = await scoreLeadAction(data);
    setIsLoading(false);

    if (result.success && result.data) {
      const newLead: ScoredLead = {
        id: crypto.randomUUID(),
        ...data,
        ...result.data,
      };
      onLeadScored(newLead);
      toast({
        title: "Lead Scored Successfully!",
        description: `The lead for ${data.email} received a score of ${result.data.score}.`,
      });
      resetForm();
    } else {
      toast({
        variant: 'destructive',
        title: 'Error Scoring Lead',
        description: result.error || 'An unknown error occurred.',
      });
    }
  };

  return (
    <div className="space-y-8">
      <LeadForm 
        onSubmit={(data, reset) => handleAddLead(data, reset)} 
        isLoading={isLoading} 
      />
      <LeadsTable leads={leads} />
    </div>
  );
}
