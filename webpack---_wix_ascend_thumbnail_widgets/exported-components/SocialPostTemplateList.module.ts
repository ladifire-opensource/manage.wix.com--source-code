import { ResolveFn } from '@wix/yoshi-flow-bm';
import { SocialPostTemplate } from '../services/interfaces';
import { getSocialPostTemplates } from '../services/social-posts';
import BiEventsFactory from '../utils/bi-events';

export interface ResolvedProps {
  isError?: boolean;
  socialPostTemplates: SocialPostTemplate[];
}

export const resolve: ResolveFn<ResolvedProps> = async ({
  getBILogger,
  moduleParams: { metaSiteId },
  fedopsLogger,
}) => {
  fedopsLogger.appLoadStarted();
  try {
    const socialPostTemplates = await getSocialPostTemplates();
    return {
      socialPostTemplates,
    };
  } catch (error) {
    const logger = await getBILogger();
    const biEvents = new BiEventsFactory(
      logger,
      metaSiteId,
      'social-post-templates',
    );
    biEvents.widgetLoadError(error);
    return {
      isError: true,
      socialPostTemplates: [],
    };
  }
};
