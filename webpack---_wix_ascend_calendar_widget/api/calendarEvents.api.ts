import { dsl } from '@wix/yoshi-serverless/wrap';

export const getCalendarEventsApi = dsl({
          functionName: 'getCalendarEventsApi',
          fileName: 'api/calendarEvents.api',
        });