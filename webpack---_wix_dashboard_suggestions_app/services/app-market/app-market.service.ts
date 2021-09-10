import { RecommendedApp } from '@common/templates';
import { ActionTargetType } from '@src/common/types';
import { WebSolution } from '@wix/ambassador-app-market-api/types';
import { wixAxios, addAuthorization } from '../../utils/wix-axios';
import { PageComponentId } from '@wix/business-manager-api';
import appsToExclude from './apps-to-exclude.json';

export const APP_MARKET_RECOMMENDATIONS_URL = `${location.origin}/_serverless/app-market-recommendations`;
const injectMetaSiteIdToUrl = (metaSiteId: string) =>
  `${APP_MARKET_RECOMMENDATIONS_URL}/${metaSiteId}`;

export interface AppMarketRecommendationsResponse {
  body: WebSolution[];
  tag: string;
}

export const getAppMarketRecommendations = async ({
  metaSiteId,
  lang,
}: {
  metaSiteId: string;
  lang: string;
}): Promise<RecommendedApp[]> => {
  let appMarket: AppMarketRecommendationsResponse;

  try {
    const response = await wixAxios.get(injectMetaSiteIdToUrl(metaSiteId), {
      params: { lang, limit: 100 },
      ...addAuthorization(),
    });
    appMarket = response.data;
  } catch (e) {
    const error = new Error(`HTTP call to app-market-recommendations failed with error: ${e}`);
    throw error;
  }

  return appMarket.body.reduce((acc, item) => {
    if (acc.length === 3) {
      return acc;
    }
    if (!item.baseInfo) {
      return acc;
    }
    const { id, name, teaser, reviewStars, numberOfReviews, icon, slug } = item.baseInfo;
    if (!(id && name && teaser && slug)) {
      return acc;
    }
    if (appsToExclude.includes(id)) {
      return acc;
    }

    acc.push({
      id,
      name,
      description: teaser,
      reviewStars: reviewStars || 0,
      numberOfReviews: numberOfReviews || 0,
      icon,
      cta: {
        type: ActionTargetType.bizMgrNavigation,
        titleKey: '',
        params: {
          pageComponentId: PageComponentId.AppMarket,
          contextData: {
            appState: `web-solution/${slug}`,
          },
          openInNewTab: false,
        },
      },
    });
    return acc;
  }, [] as RecommendedApp[]);
};
