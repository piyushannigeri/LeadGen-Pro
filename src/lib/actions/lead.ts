'use server';

import { scoreLead, ScoreLeadInput } from '@/ai/flows/score-lead';

export async function scoreLeadAction(input: ScoreLeadInput) {
  try {
    const output = await scoreLead(input);
    return { success: true, data: output };
  } catch (error) {
    console.error('Error scoring lead:', error);
    return { success: false, error: 'Failed to score lead. Please try again.' };
  }
}
