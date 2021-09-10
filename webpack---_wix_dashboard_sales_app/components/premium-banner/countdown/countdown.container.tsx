import React, { FC, useState, useEffect, memo } from 'react';
import { Counter } from '@types';
import { calcRemainingHoursInMs } from './utils';
import { CountdownComponent } from './countdown.component';

const COUNTER_INTERVAL_IN_MILLISECONDS = 1000;

export const Countdown: FC<Counter> = memo(({ endDate, countingHours, color, weight }) => {
  const [timeLeft, setTimeLeft] = useState(calcRemainingHoursInMs(endDate, countingHours));

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTimeLeft(currentTimeLeft => currentTimeLeft - 1000);
    }, COUNTER_INTERVAL_IN_MILLISECONDS);
    return () => clearTimeout(timeout);
  });

  return <CountdownComponent timeLeft={timeLeft} weight={weight} color={color} />;
});
