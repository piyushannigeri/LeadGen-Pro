'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zap, Target, Mail, MessageSquare, LayoutDashboard, Video } from 'lucide-react';
import LeadScoringTab from './lead-scoring-tab';
import LeadGenerationTab from './lead-generation-tab';
import EmailOutreachTab from './email-outreach-tab';
import LinkedinOutreachTab from './linkedin-outreach-tab';
import OverviewTab from './overview-tab';
import VideoCallTab from './video-call-tab';
import type { ScoredLead, GeneratedLeadWithId } from '@/types';

export default function MainDashboard() {
  const [scoredLeads, setScoredLeads] = useState<ScoredLead[]>([]);
  const [generatedLeads, setGeneratedLeads] = useState<GeneratedLeadWithId[]>([]);
  
  const handleLeadScored = (newLead: ScoredLead) => {
    setScoredLeads(prev => [newLead, ...prev]);
  };

  const handleLeadsGenerated = (newLeads: GeneratedLeadWithId[]) => {
    setGeneratedLeads(prev => [...newLeads, ...prev]);
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Tabs defaultValue="overview" className="w-full">
        <div className="w-full overflow-x-auto">
          <TabsList className="grid w-full min-w-max grid-cols-6 h-auto">
            <TabsTrigger value="overview" className="py-2.5">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="generation" className="py-2.5">
              <Zap className="mr-2 h-4 w-4" />
              Lead Generation
            </TabsTrigger>
            <TabsTrigger value="scoring" className="py-2.5">
              <Target className="mr-2 h-4 w-4" />
              Lead Scoring
            </TabsTrigger>
            <TabsTrigger value="email" className="py-2.5">
              <Mail className="mr-2 h-4 w-4" />
              Email Outreach
            </TabsTrigger>
            <TabsTrigger value="linkedin" className="py-2.5">
              <MessageSquare className="mr-2 h-4 w-4" />
              LinkedIn Outreach
            </TabsTrigger>
            <TabsTrigger value="video" className="py-2.5">
              <Video className="mr-2 h-4 w-4" />
              Video Call
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="overview" className="mt-6">
          <OverviewTab scoredLeads={scoredLeads} generatedLeads={generatedLeads} />
        </TabsContent>
        <TabsContent value="generation" className="mt-6">
          <LeadGenerationTab 
            leads={generatedLeads} 
            onLeadsGenerated={handleLeadsGenerated} 
          />
        </TabsContent>
        <TabsContent value="scoring" className="mt-6">
            <LeadScoringTab 
              leads={scoredLeads} 
              onLeadScored={handleLeadScored} 
            />
        </TabsContent>
        <TabsContent value="email" className="mt-6">
            <EmailOutreachTab />
        </TabsContent>
        <TabsContent value="linkedin" className="mt-6">
            <LinkedinOutreachTab />
        </TabsContent>
        <TabsContent value="video" className="mt-6">
            <VideoCallTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
