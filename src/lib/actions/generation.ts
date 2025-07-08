'use server';

import { generateLeads, type GenerateLeadsInput } from '@/ai/flows/generate-lead-flow';
import { generateLinkedInMessage, type GenerateLinkedInMessageInput } from '@/ai/flows/generate-linkedin-flow';
import { generateEmail, type GenerateEmailInput } from '@/ai/flows/generate-email-flow';

export async function generateLeadsAction(input: GenerateLeadsInput) {
  try {
    const output = await generateLeads(input);
    return { success: true, data: output };
  } catch (error) {
    console.error('Error generating leads:', error);
    return { success: false, error: 'Failed to generate leads. Please try again.' };
  }
}

export async function generateLinkedInMessageAction(input: GenerateLinkedInMessageInput) {
  try {
    const output = await generateLinkedInMessage(input);
    return { success: true, data: output };
  } catch (error) {
    console.error('Error generating LinkedIn message:', error);
    return { success: false, error: 'Failed to generate message. Please try again.' };
  }
}

export async function generateEmailAction(input: GenerateEmailInput) {
  try {
    const output = await generateEmail(input);
    return { success: true, data: output };
  } catch (error) {
    console.error('Error generating email:', error);
    return { success: false, error: 'Failed to generate email. Please try again.' };
  }
}
