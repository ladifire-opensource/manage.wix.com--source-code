import { FreeSiteLimitReachedErrorCode } from '@wix/site-actions-service';
import { DialogNames, DialogResult } from '@wix/quick-actions-dropdown';
import { TFunction } from 'yoshi-flow-bm-runtime';
import {
  showToast,
  ToastActionUiType,
  ToastScope,
  ToastType,
} from '@wix/business-manager-api';

export const STORAGE_KEY = 'dialogResult';

const redirectToSitesList = (dialogResult: DialogResult) => {
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(dialogResult));
  window.location.assign('/');
};

const showDuplicateToast = (duplicateMetaSiteId: string, t: TFunction) => {
  showToast({
    message: t('site-duplicated-successfully'),
    biName: 'duplicate_site',
    type: ToastType.SUCCESS,
    action: {
      text: t('check-it-out'),
      uiType: ToastActionUiType.LINK,
      navigationTarget: {
        url: `/dashboard/${duplicateMetaSiteId}`,
        openInNewTab: false,
      },
    },
  });
};

const showSiteLimitErrorToast = (t: TFunction, accountLanguage: string) => {
  showToast({
    message: t('sitelimit.error.message_toast'),
    biName: 'creation_failed_on_site_limitation',
    type: ToastType.ERROR,
    scope: ToastScope.DASHBOARD,
    action: {
      text: t('sitelimit.error.cta_toast'),
      uiType: ToastActionUiType.LINK,
      navigationTarget: {
        url: `https://support.wix.com/${accountLanguage}/article/creating-multiple-sites-under-one-account`,
        openInNewTab: true,
      },
    },
  });
};

const showErrorToast = (t: TFunction) => {
  showToast({
    message: t('siteactions.error.message_toast'),
    biName: 'site_action_error',
    type: ToastType.ERROR,
    scope: ToastScope.DASHBOARD,
  });
};

export const handleAction = (
  dialogResult: DialogResult,
  t: TFunction,
  accountLanguage: string,
) => {
  const { actionName, result, failed } = dialogResult;
  switch (actionName) {
    case DialogNames.duplicate:
      if (failed) {
        result === FreeSiteLimitReachedErrorCode
          ? showSiteLimitErrorToast(t, accountLanguage)
          : showErrorToast(t);
      } else {
        showDuplicateToast(result, t);
      }
      break;
    case DialogNames.rename:
      if (!result.wasError) {
        window.location.reload();
      }
      break;
    case DialogNames.moveToTrash:
      if (failed) {
        showErrorToast(t);
      } else {
        redirectToSitesList(dialogResult);
      }
      break;
    default:
  }
};
