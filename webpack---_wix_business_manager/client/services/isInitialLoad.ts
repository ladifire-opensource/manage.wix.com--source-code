import { DataCapsule } from 'data-capsule';

export const isInitialLoad = async (dataCapsule: DataCapsule, eventId: number): Promise<string> => {
  try {
    const wasFired: boolean = await dataCapsule.getItem(`event_${eventId}_fired`);
    return wasFired ? 'false' : 'true';
  } catch (e) {
    return 'true';
  }
};

export const setIsInitialLoad = (dataCapsule: DataCapsule, eventId: number) => {
  return dataCapsule.setItem(`event_${eventId}_fired`, 'true');
};
