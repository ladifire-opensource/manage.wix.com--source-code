import { fetchCoupon } from './fetchCoupon';
import { CouponActionConfig } from './types';
import { getCurrentTime, tryParseToJSON } from './utils';

export const verifySendCouponConfig = async (
  translations: [],
  actionConfig?: string,
) => {
  const config: CouponActionConfig = tryParseToJSON(actionConfig) ?? {};

  if (!config.coupon) {
    throw translations['send_coupon_action.error.select_coupon'];
  }

  const coupon = await fetchCoupon(config.coupon.id);

  if (!coupon) {
    throw translations['send_coupon_action.error.select_coupon'];
  }

  let onHoldMessage = null;

  if (
    (coupon.expirationDate &&
      Number(coupon.expirationDate) < getCurrentTime()) ||
    (coupon.usageLimit &&
      Number(coupon.usageLimit) === Number(coupon.numberOfUsages))
  ) {
    onHoldMessage = translations['send_coupon_action.on-hold.notification'];
  }

  if (onHoldMessage) {
    throw {
      props: {
        onHoldMessage,
      },
      componentName:
        'ascend.components.send-coupon-automation-on-hold.lazy-component',
    };
  }

  return true;
};
