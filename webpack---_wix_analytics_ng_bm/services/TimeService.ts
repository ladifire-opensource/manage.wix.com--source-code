import { ITimeService } from '../types/types';

const secondInMs = 1000;
const minuteInMs = 60 * secondInMs;
const hourInMs = minuteInMs * 60;

export class TimeService implements ITimeService {
  getHoursInMS(hours: number): number {
    return hours * hourInMs;
  }

  getCurrentTimestamp(): number {
    const date = new Date();
    return date.getTime();
  }
}
