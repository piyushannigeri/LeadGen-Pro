'use client';

import { BarChart as BarChartIcon, Users, Target } from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { ScoredLead, GeneratedLeadWithId } from '@/types';
import { useMemo } from 'react';

type OverviewTabProps = {
    scoredLeads: ScoredLead[];
    generatedLeads: GeneratedLeadWithId[];
};

export default function OverviewTab({ scoredLeads, generatedLeads }: OverviewTabProps) {

    const averageScore = useMemo(() => {
        if (scoredLeads.length === 0) return 0;
        return Math.round(scoredLeads.reduce((acc, lead) => acc + lead.score, 0) / scoredLeads.length)
    }, [scoredLeads]);

    const scoreDistribution = useMemo(() => [
        { name: '0-25', count: scoredLeads.filter(l => l.score <= 25).length },
        { name: '26-50', count: scoredLeads.filter(l => l.score > 25 && l.score <= 50).length },
        { name: '51-75', count: scoredLeads.filter(l => l.score > 50 && l.score <= 75).length },
        { name: '76-100', count: scoredLeads.filter(l => l.score > 75).length },
    ], [scoredLeads]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads Generated</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{generatedLeads.length}</div>
            <p className="text-xs text-muted-foreground">From all your generation tasks.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads Scored</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scoredLeads.length}</div>
            <p className="text-xs text-muted-foreground">From manual scoring entries.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Lead Score</CardTitle>
            <BarChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore}</div>
            <p className="text-xs text-muted-foreground">Across all scored leads.</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Scored Leads Distribution</CardTitle>
            <CardDescription>A distribution of the quality of your manually scored leads.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
                {scoredLeads.length > 0 ? (
                    <BarChart data={scoreDistribution}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={true} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={true} allowDecimals={false} />
                        <Tooltip
                        contentStyle={{
                            background: 'hsl(var(--background))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: 'var(--radius)',
                        }}
                        />
                        <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Leads" />
                    </BarChart>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-2 text-center">
                        <BarChartIcon className="h-12 w-12 text-muted-foreground/50"/>
                        <p className="text-muted-foreground">No leads have been scored yet.</p>
                        <p className="text-sm text-muted-foreground/80">Score a lead to see its distribution here.</p>
                    </div>
                )}
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
