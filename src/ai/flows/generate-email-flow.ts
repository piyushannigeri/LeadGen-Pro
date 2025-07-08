'use server';

/**
 * @fileOverview An AI agent that generates personalized cold emails.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEmailInputSchema = z.object({
  leadName: z.string().describe("The first name of the lead."),
  leadCompany: z.string().describe("The lead's company name."),
  yourName: z.string().describe("Your first name."),
  yourCompany: z.string().describe("Your company name."),
  goal: z.string().describe("The primary goal of the email (e.g., 'Book a meeting', 'Introduce a product')."),
});
export type GenerateEmailInput = z.infer<typeof GenerateEmailInputSchema>;

const GenerateEmailOutputSchema = z.object({
  subject: z.string().describe('The generated email subject line. It should be catchy and professional.'),
  body: z.string().describe('The generated email body. It should be personalized, clear, and include a call to action.'),
});
export type GenerateEmailOutput = z.infer<typeof GenerateEmailOutputSchema>;

export async function generateEmail(input: GenerateEmailInput): Promise<GenerateEmailOutput> {
  return generateEmailFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateEmailPrompt',
  input: {schema: GenerateEmailInputSchema},
  output: {schema: GenerateEmailOutputSchema},
  prompt: `You are a world-class sales copywriter specializing in cold emails that get replies.
Your task is to write a persuasive and personalized cold email.

Email Details:
- To: {{{leadName}}} at {{{leadCompany}}}
- From: {{{yourName}}} from {{{yourCompany}}}
- Goal: {{{goal}}}

Instructions:
1.  Create a compelling, curiosity-inducing subject line.
2.  Write a personalized opening line that shows you've done some research.
3.  Clearly state the value proposition of {{{yourCompany}}}.
4.  Include a clear, low-friction call-to-action related to the goal.
5.  Keep the email concise and easy to read.
`,
});

const generateEmailFlow = ai.defineFlow(
  {
    name: 'generateEmailFlow',
    inputSchema: GenerateEmailInputSchema,
    outputSchema: GenerateEmailOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
