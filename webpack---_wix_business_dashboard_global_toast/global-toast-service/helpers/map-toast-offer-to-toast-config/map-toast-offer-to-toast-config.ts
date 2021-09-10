import {
  IToastOffer,
  IToastOfferPayload,
  IActionTarget,
} from '../../types/global-toast';
import {
  ToastConfig,
  ToastAction,
  NavigationTarget,
  ToastScope,
  ExternalNavigationTarget,
  ToastTimeout,
} from '@wix/business-manager-api';
import { sendToastClicked } from '../../dealer-events';

export interface IToastConfigMapperParams {
  offer: IToastOffer;
  metaSiteId: string;
  onCloseClick(): void;
}

const getNavigationTarget = (
  actionTarget: IActionTarget,
  metaSiteId: string,
): NavigationTarget => {
  return actionTarget.type === 'externalUrl'
    ? {
        url: actionTarget.value.value.replace(/{msid}/g, metaSiteId),
      }
    : { navigateToConfig: { ...actionTarget.value.value } };
};

const getAction = (
  offer: IToastOffer,
  metaSiteId: string,
): ToastAction | undefined => {
  if (!offer) {
    return;
  }

  const {
    id,
    payload: {
      actionTarget,
      ctaUiType: uiType,
      ctaRemoveToastOnClick: removeToastOnClick,
    },
  } = offer;

  const text = actionTarget?.value?.key;

  if (!actionTarget?.value || !text) {
    return;
  }

  const navigationTarget = getNavigationTarget(actionTarget, metaSiteId);
  const targetUrl = (navigationTarget as ExternalNavigationTarget).url;

  return {
    text,
    uiType,
    removeToastOnClick,
    onClick: sendToastClicked({ offerId: id, targetUrl }),
    navigationTarget,
  };
};

export const mapToastOfferToToastConfig = (
  params: IToastConfigMapperParams,
): ToastConfig => {
  const { offer, metaSiteId, onCloseClick } = params;
  const {
    message,
    timeout,
    type,
    priority,
    scope,
    biName,
  }: IToastOfferPayload = offer.payload;

  return {
    message,
    biName: `dealer_${biName}`,
    timeout: (timeout || ToastTimeout.NONE) as ToastTimeout,
    type,
    priority,
    scope: scope || ToastScope.DASHBOARD,
    action: getAction(offer, metaSiteId),
    onCloseClick,
  };
};
