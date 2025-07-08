import { config } from 'dotenv';
config();

import '@/ai/flows/score-lead.ts';
import '@/ai/flows/generate-lead-flow.ts';
import '@/ai/flows/generate-email-flow.ts';
import '@/ai/flows/generate-linkedin-flow.ts';
