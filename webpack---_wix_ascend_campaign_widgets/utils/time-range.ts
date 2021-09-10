export enum TimeFrame {
  ONE_WEEK = 'ONE_WEEK',
  TWO_WEEKS = 'TWO_WEEKS',
  FOUR_WEEKS = 'FOUR_WEEKS',
  LIFETIME = 'LIFETIME',
}

export interface TimeRange {
  startDate: string;
  endDate: string;
}

export const TIME_FRAMES_IN_MS: {
  [key: string]: { epoch: number; intValue: number };
} = {
  [TimeFrame.ONE_WEEK]: { epoch: 6.048e8, intValue: 7 },
  [TimeFrame.TWO_WEEKS]: { epoch: 1.21e9, intValue: 14 },
  [TimeFrame.FOUR_WEEKS]: { epoch: 2.419e9, intValue: 28 },
};

export const getTimeRange = (timeFrame: TimeFrame): TimeRange | undefined => {
  if (timeFrame === TimeFrame.LIFETIME) {
    return;
  }

  const now = Date.now();
  const startTimeInMs = now - TIME_FRAMES_IN_MS[timeFrame].epoch;
  const startDate = new Date(startTimeInMs).toISOString();
  return {
    startDate,
    endDate: new Date(now).toISOString(),
  };
};
