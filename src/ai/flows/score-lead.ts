'use server';

/**
 * @fileOverview An AI agent that scores leads based on input criteria.
 *
 * - scoreLead - A function that handles the lead scoring process.
 * - ScoreLeadInput - The input type for the scoreLead function.
 * - ScoreLeadOutput - The return type for the scoreLead function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ScoreLeadInputSchema = z.object({
  email: z.string().email().describe('The email address of the lead.'),
  contactNumber: z.string().describe('The contact number of the lead.'),
  companySize: z.string().describe('The size of the company.'),
  address: z.string().describe('The address of the lead.'),
  otherInfo: z.string().describe('Any other relevant information about the lead.'),
});
export type ScoreLeadInput = z.infer<typeof ScoreLeadInputSchema>;

const ScoreLeadOutputSchema = z.object({
  score: z.number().describe('The score of the lead, from 0 to 100.'),
  reason: z.string().describe('The reason for the score.'),
});
export type ScoreLeadOutput = z.infer<typeof ScoreLeadOutputSchema>;

export async function scoreLead(input: ScoreLeadInput): Promise<ScoreLeadOutput> {
  return scoreLeadFlow(input);
}

const prompt = ai.definePrompt({
  name: 'scoreLeadPrompt',
  input: {schema: ScoreLeadInputSchema},
  output: {schema: ScoreLeadOutputSchema},
  prompt: `You are an expert lead scorer. You will score the lead based on the following information:

Email: {{{email}}}
Contact Number: {{{contactNumber}}}
Company Size: {{{companySize}}}
Address: {{{address}}}
Other Info: {{{otherInfo}}}

Give a score between 0 and 100, and explain the reason for the score.
`,
});

const scoreLeadFlow = ai.defineFlow(
  {
    name: 'scoreLeadFlow',
    inputSchema: ScoreLeadInputSchema,
    outputSchema: ScoreLeadOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
