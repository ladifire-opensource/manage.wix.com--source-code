import { referrer } from '@common/consts';
import {
  PageComponentId,
  INavigateToPageConfig,
} from '@wix/business-manager-api';
import { Permissions } from './permissions';

export interface ToolData {
  biName: string;
  titleKey: string;
  descriptionKey: string;
  permissions: string[];
  cta: INavigateToPageConfig;
}

export const MoreTools: ToolData[] = [
  {
    biName: 'site-settings',
    titleKey: 'more-tools.tool.website-settings.title',
    descriptionKey: 'more-tools.tool.website-settings.desc',
    permissions: [Permissions.WEBSITE_SETTINGS],
    cta: {
      pageComponentId: PageComponentId.WebsiteSettings,
      contextData: { referrer },
    },
  },
  {
    biName: 'seo',
    titleKey: 'more-tools.tool.seo-tools.title',
    descriptionKey: 'more-tools.tool.seo-tools.desc',
    permissions: [Permissions.SEO_TOOLS],
    cta: {
      pageComponentId: PageComponentId.PromoteSeoTools,
      contextData: { referrer },
    },
  },
  {
    biName: 'privacy',
    titleKey: 'more-tools.tool.privacy-and-cookies.title',
    descriptionKey: 'more-tools.tool.privacy-and-cookies.desc',
    permissions: [Permissions.PRIVACY_AND_COOKIES],
    cta: {
      pageComponentId: PageComponentId.CookieConsentBannerSettings,
      contextData: { referrer },
    },
  },
  {
    biName: 'site-history',
    titleKey: 'more-tools.tool.site-history.title',
    descriptionKey: 'more-tools.tool.site-history.desc',
    permissions: [Permissions.SITE_HISTORY],
    cta: {
      pageComponentId: PageComponentId.SiteHistory,
      contextData: { referrer },
    },
  },
];
