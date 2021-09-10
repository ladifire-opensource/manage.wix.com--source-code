import {
  CalendarEvent,
  CalendarSuggestion,
  EmailMarketingStatus,
  GetCalendarResponse,
  SocialPostStatus,
} from '@wix/ambassador-serverless-ascend-calendar-service/types';
import { CalendarData } from '../internal-types';
import { addDays, getDateFromatYYYYMMDD } from './dates';

const initClientCalendarEvents = (
  fromDate: Date,
  toDate: Date,
): CalendarData => {
  const clientStructure: CalendarData = {
    calendarInfo: {},
    calendarMetadata: {},
    totalFailEvents: { emailMarketing: 0, socialPost: 0 },
  };

  for (let date = fromDate; date < toDate; date = addDays(date, 1)) {
    clientStructure.calendarInfo[getDateFromatYYYYMMDD(date)] = {
      events: [],
      suggestions: [],
    };
  }

  return clientStructure;
};

export const calendarDateDTO = (
  serverCalendarData: GetCalendarResponse,
  fromDate: Date,
  toDate: Date,
): CalendarData => {
  const clientCalendarEvents = initClientCalendarEvents(fromDate, toDate);

  const calendarEventsDTO = () => {
    const events: CalendarEvent[] = serverCalendarData?.events || [];
    events.forEach((event) => {
      if (event.socialPostStatus === SocialPostStatus.Failed) {
        clientCalendarEvents.totalFailEvents.socialPost++;
      } else if (event.emailMarketingStatus === EmailMarketingStatus.Failed) {
        clientCalendarEvents.totalFailEvents.emailMarketing++;
      } else if (
        event.dateTime &&
        new Date(event.dateTime) >= fromDate &&
        new Date(event.dateTime) <= toDate
      ) {
        const clientEvetns =
          clientCalendarEvents.calendarInfo[
            getDateFromatYYYYMMDD(new Date(event.dateTime))
          ].events || [];
        event.dateTime = new Date(event.dateTime);
        clientEvetns.push(event);
      }
    });
  };

  const calendarSuggestionsDTO = () => {
    const suggestions: CalendarSuggestion[] =
      serverCalendarData?.suggestions || [];
    suggestions.forEach((suggestion) => {
      const suggestionDate = new Date(suggestion.dateTime ?? '');
      if (suggestionDate >= fromDate && suggestionDate <= toDate) {
        const clientSuggestions =
          clientCalendarEvents.calendarInfo[
            getDateFromatYYYYMMDD(suggestionDate)
          ].suggestions || [];
        clientSuggestions.push(suggestion);
      }
    });
  };

  clientCalendarEvents.calendarMetadata = {
    ...serverCalendarData.metaData,
  };
  calendarEventsDTO();
  calendarSuggestionsDTO();
  return clientCalendarEvents;
};
