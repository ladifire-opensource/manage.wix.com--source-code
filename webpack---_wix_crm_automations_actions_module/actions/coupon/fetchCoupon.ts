import { Coupon } from './types';
import { CouponsServer } from '@wix/ambassador-coupons-server/http';
import { getCurrentInstance, appDefIds } from '@wix/business-manager-api';
import { memoize } from 'lodash';

const COUPONS_BASE_URL = 'https://manage.wix.com/coupons-server/api/';

export const fetchCoupon = memoize(async (couponId: string) => {
  const couponsQueryService = CouponsServer(COUPONS_BASE_URL).CouponsV2();

  const couponResponse = await couponsQueryService({
    authorization: getCurrentInstance(appDefIds.metaSite),
  }).get({ id: couponId });

  const { coupon } = couponResponse;

  if (!coupon) {
    return null;
  }

  const couponRes: Coupon = {
    id: coupon.id,
    value: coupon.specification.name,
    code: coupon.specification.code,
    offerDescription: coupon.specification.name,
    expirationDate: coupon.specification.expirationTime?.toString(),
    usageLimit: coupon.specification.usageLimit?.toString(),
    numberOfUsages: coupon.numberOfUsages?.toString(),
  };

  return couponRes;
});
