import { ResolveFn } from '@wix/yoshi-flow-bm';
import { getEmailTemplates } from '../services/email-marketing';
import { EmailTemplate } from '../services/interfaces';
import BiEventsFactory from '../utils/bi-events';

export interface ResolvedProps {
  isError?: boolean;
  emailTemplates: EmailTemplate[];
}

export const resolve: ResolveFn<ResolvedProps> = async ({
  getBILogger,
  moduleParams: { metaSiteId },
  fedopsLogger,
}) => {
  fedopsLogger.appLoadStarted();
  try {
    const emailTemplates = await getEmailTemplates();
    return {
      emailTemplates,
    };
  } catch (error) {
    const logger = await getBILogger();
    const biEvents = new BiEventsFactory(
      logger,
      metaSiteId,
      'shoutout-templates',
    );
    biEvents.widgetLoadError(error);
    return {
      isError: true,
      emailTemplates: [],
    };
  }
};
