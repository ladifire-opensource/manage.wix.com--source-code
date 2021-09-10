import {
  ViewType,
  CTA,
  ActionTargetType,
  ActionTargetExternalUrl,
  ActionTargetBizMgrNavigation,
} from '@src/common/types';
import { navigateTo } from '@wix/business-manager-api';
import { Referral } from '../../common/types/types';

const META_SITE_ID_PARAM = '<meta-site-id>';

export const EXTERNAL_LINK_LANG_PLACEHOLDER = '{accountLanguage}';

export const injectMetasiteIdIfNeeded = (url: string, metaSiteId: string) =>
  url.replace(META_SITE_ID_PARAM, metaSiteId);

export const injectLanguageIfNeeded = (url: string, language: string) =>
  url.replace(EXTERNAL_LINK_LANG_PLACEHOLDER, language);

export const appendReferral = (urlWithoutReferral: string, viewType: ViewType): string => {
  const url = new URL(urlWithoutReferral);
  url.searchParams.delete('referral');
  url.searchParams.append('referral', Referral[viewType]);
  return url.href;
};

export interface navigateToParams {
  cta: CTA;
  metaSiteId: string;
  viewType: ViewType;
  accountLanguage?: string;
  openInSameWindow?: boolean;
}

export const navigateToCTA = ({
  cta,
  metaSiteId,
  viewType,
  accountLanguage,
  openInSameWindow,
}: navigateToParams): void => {
  switch (cta.type) {
    case ActionTargetType.externalUrl:
      const url = appendReferral(
        injectLanguageIfNeeded(
          injectMetasiteIdIfNeeded((cta as ActionTargetExternalUrl).params.url, metaSiteId),
          accountLanguage || 'en',
        ),
        viewType,
      );
      if (openInSameWindow) {
        window.location.assign(url);
      } else {
        window.open(url);
      }
      break;
    case ActionTargetType.bizMgrNavigation:
      navigateTo({
        pageComponentId: cta.params.pageComponentId,
        openInNewTab: false,
        contextData: {
          ...(cta as ActionTargetBizMgrNavigation).params.contextData,
          referrer: Referral[viewType],
        },
      });
      break;
    case ActionTargetType.video:
      // TODO: handle video in the next phase
      break;
    default:
      throw new Error('Unexpected action type');
  }
};
