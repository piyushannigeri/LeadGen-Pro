import type { ScoreLeadInput, ScoreLeadOutput } from "@/ai/flows/score-lead";
import type { GeneratedLead } from "@/ai/flows/generate-lead-flow";

export type ScoredLead = ScoreLeadInput & ScoreLeadOutput & { id: string };

export type GeneratedLeadWithId = GeneratedLead & { id: string };
