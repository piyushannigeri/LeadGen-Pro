'use server';

/**
 * @fileOverview An AI agent that generates personalized LinkedIn messages.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLinkedInMessageInputSchema = z.object({
  leadName: z.string().describe("The full name of the lead."),
  leadRole: z.string().describe("The lead's job title."),
  leadCompany: z.string().describe("The lead's company name."),
  yourName: z.string().describe("Your full name."),
  yourRole: z.string().describe("Your job title."),
});
export type GenerateLinkedInMessageInput = z.infer<typeof GenerateLinkedInMessageInputSchema>;

const GenerateLinkedInMessageOutputSchema = z.object({
  message: z.string().describe('The generated LinkedIn connection message. It should be friendly, concise, and under 300 characters.'),
});
export type GenerateLinkedInMessageOutput = z.infer<typeof GenerateLinkedInMessageOutputSchema>;

export async function generateLinkedInMessage(input: GenerateLinkedInMessageInput): Promise<GenerateLinkedInMessageOutput> {
  return generateLinkedInMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLinkedInMessagePrompt',
  input: {schema: GenerateLinkedInMessageInputSchema},
  output: {schema: GenerateLinkedInMessageOutputSchema},
  prompt: `You are an expert social selling copywriter. Your task is to write a short, personalized, and effective LinkedIn connection request message.

The message should be from {{{yourName}}} ({{{yourRole}}}) to {{{leadName}}} ({{{leadRole}}} at {{{leadCompany}}}).

Make it concise, professional, and engaging. Mention a plausible commonality or reason for connecting. Keep it under 300 characters.
`,
});

const generateLinkedInMessageFlow = ai.defineFlow(
  {
    name: 'generateLinkedInMessageFlow',
    inputSchema: GenerateLinkedInMessageInputSchema,
    outputSchema: GenerateLinkedInMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
