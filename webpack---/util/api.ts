import { fedopsLogger } from '../sdk';

export interface ActiveSession {
  startUrl: string;
  secondsSinceLastActivity: number | null;
}

export async function getActiveSession(): Promise<ActiveSession | null> {
  fedopsLogger.interactionStarted('getActiveSession');
  try {
    const result = await fetch(`https://apps.wix.com/_api/chatbot/session`, {
      method: 'GET',
      credentials: 'include',
    }).then((r) => r.json());
    fedopsLogger.interactionEnded('getActiveSession');
    return result;
  } catch (e) {
    console.error('ERROR', e.message);
    return null;
  }
}
