'use server';

/**
 * @fileOverview An AI agent that generates leads based on specified criteria.
 *
 * - generateLeads - A function that handles the lead generation process.
 * - GenerateLeadsInput - The input type for the generateLeads function.
 * - GenerateLeadsOutput - The return type for the generateLeads function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLeadsInputSchema = z.object({
  industry: z.string().describe('The industry to search for leads in, e.g., "Software as a Service".'),
  location: z.string().describe('The geographical location for the leads, e.g., "San Francisco, CA".'),
  companySize: z.string().describe('The size of the target companies, e.g., "50-200 employees".'),
  count: z.number().min(1).max(10).describe('The number of leads to generate.'),
});
export type GenerateLeadsInput = z.infer<typeof GenerateLeadsInputSchema>;

const GeneratedLeadSchema = z.object({
    companyName: z.string().describe("The name of the company."),
    contactPerson: z.string().describe("The full name of a relevant contact person at the company."),
    role: z.string().describe("The job title of the contact person."),
    email: z.string().describe("The business email address of the contact person."),
    address: z.string().describe("The plausible physical address of the company, suitable for use with a mapping service."),
    score: z.number().describe('An AI-generated score for the lead, from 0 to 100, indicating quality.'),
    reason: z.string().describe('A brief explanation for the assigned score.'),
});
export type GeneratedLead = z.infer<typeof GeneratedLeadSchema>;

const GenerateLeadsOutputSchema = z.object({
  leads: z.array(GeneratedLeadSchema).describe('A list of generated leads.'),
});
export type GenerateLeadsOutput = z.infer<typeof GenerateLeadsOutputSchema>;

export async function generateLeads(input: GenerateLeadsInput): Promise<GenerateLeadsOutput> {
  return generateLeadsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLeadsPrompt',
  input: {schema: GenerateLeadsInputSchema},
  output: {schema: GenerateLeadsOutputSchema},
  prompt: `You are an expert lead generation specialist. Your task is to generate a list of high-quality leads based on the following criteria.
  For each lead, provide a fictional but realistic company name, a contact person's name, their role, a plausible business email address, and a plausible full physical address for the company that is consistent with the specified location.
  Crucially, you must also provide an AI-generated score (0-100) indicating the potential quality of the lead, and a brief reason for that score. A higher score means a better fit.

Criteria:
- Industry: {{{industry}}}
- Location: {{{location}}}
- Company Size: {{{companySize}}}

Generate exactly {{{count}}} leads matching these criteria.
`,
});

const generateLeadsFlow = ai.defineFlow(
  {
    name: 'generateLeadsFlow',
    inputSchema: GenerateLeadsInputSchema,
    outputSchema: GenerateLeadsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
