import {
  ASCEND_PLAN,
  ASCEND_OFFERING_ID,
  siteAssetsUrl,
  MAP_FAMILY_ID_TO_ASCEND_PLAN,
  MAP_PRODUCT_ID_TO_ASCEND_PLAN,
} from './constants';
import * as _ from 'lodash';
import Experiments from '@wix/wix-experiments';

export const ascendDataUrl = (metaSiteId) =>
  `/_api/premium-store/v1/offering/${ASCEND_OFFERING_ID}?msid=${metaSiteId}`;

const getAscendDataByProductId = (productId) => {
  if (_.has(MAP_PRODUCT_ID_TO_ASCEND_PLAN, productId)) {
    const plan = MAP_PRODUCT_ID_TO_ASCEND_PLAN[productId];
    const isTopPremium = plan === ASCEND_PLAN.UNLIMITED;

    return { isTopPremium, plan, productId };
  }

  return { isTopPremium: false, plan: ASCEND_PLAN.FREE };
};

export const getCurrentAscendProductId = async ({
  debug,
  metaSiteId,
  instance,
  experiments,
}: {
  debug?: boolean;
  instance: string;
  metaSiteId: string;
  experiments: Experiments;
}): Promise<{
  isTopPremium: boolean;
  plan: string;
  productId?: string;
  productFamilyId?: string;
}> => {
  const res = await fetch(ascendDataUrl(metaSiteId), {
    method: 'GET',
    headers: {
      Authorization: instance,
    },
  });

  const data = await res.json();

  if (debug) {
    console.log('Ascend Offering Data', data);
  }

  const productId = _.get(data, 'currentSubscriptionInfo.productId');

  await experiments.ready();

  const useFamilyId = experiments.enabled(
    'specs.ascend.UseAscendProductFamilyId',
  );

  if (useFamilyId) {
    const products = _.get(data, 'products', []);
    const currentProductData = _.find(products, { productId });

    if (debug) {
      console.log('Current Ascend Product Data', currentProductData);
    }

    const productFamilyId = _.get(currentProductData, 'productFamilyId');

    if (_.has(MAP_FAMILY_ID_TO_ASCEND_PLAN, productFamilyId)) {
      const plan = MAP_FAMILY_ID_TO_ASCEND_PLAN[productFamilyId];
      const isTopPremium = plan === ASCEND_PLAN.UNLIMITED;

      return { isTopPremium, plan, productId, productFamilyId };
    }
  }

  return getAscendDataByProductId(productId);
};

const getWebsitePackage = async ({ debug, instance, metaSiteId }) => {
  const res = await fetch(siteAssetsUrl(metaSiteId), {
    method: 'GET',
    headers: {
      Authorization: instance,
    },
  });

  const data = await res.json();

  if (debug) {
    console.log('Site Assets Data', data);
  }

  if (data.assets.length > 0) {
    return _.get(data.assets, '[0].plansSpecificData.productName');
  }
};

export const fetchPremiumData = async ({
  debug,
  instance,
  metaSiteId,
  experiments,
}: {
  debug?: boolean;
  instance: string;
  metaSiteId: string;
  experiments: Experiments;
}) => {
  const [
    { productId, isTopPremium, plan, productFamilyId },
    planName,
  ] = await Promise.all([
    getCurrentAscendProductId({
      debug,
      instance,
      metaSiteId,
      experiments,
    }),
    getWebsitePackage({ debug, instance, metaSiteId }),
  ]);

  return {
    ascendPlan: plan,
    productId,
    productFamilyId,
    websitePlanName: planName,
    isAscendTopPremium: isTopPremium,
  };
};
