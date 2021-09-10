import { ResolveFn } from '@wix/yoshi-flow-bm';
import { getCalendarEventsApi } from '../api/calendarEvents.api';
import { getweekStartingDay } from '../services/siteProperties';
import { calendarDateDTO } from '../utils/calendarData.dto';
import {
  addDays,
  getCurrentDate,
  getDateFromatYYYYMMDD,
  getWeekEndDate,
  getWeekStartDate,
} from '../utils/dates';

export interface ResolvedProps {}

export const resolve: ResolveFn<ResolvedProps> = async ({
  fedopsLogger,
  httpClient,
}) => {
  fedopsLogger.appLoadStarted();
  const weekStartingDay = getweekStartingDay();
  const currentDate = getCurrentDate();

  const startDate = addDays(getWeekStartDate(currentDate, 'SUN'), -14);
  const endDate = addDays(getWeekEndDate(currentDate, 'MON'), 14);

  const { data: calendarData } = await httpClient.request(
    getCalendarEventsApi({
      fromDate: getDateFromatYYYYMMDD(startDate),
      toDate: getDateFromatYYYYMMDD(endDate),
    }),
  );

  return {
    calendarData: calendarDateDTO(
      calendarData.calendarData,
      startDate,
      endDate,
    ),
    weekStartingDay: await weekStartingDay,
    success: calendarData.success,
  };
};
