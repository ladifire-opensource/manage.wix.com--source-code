import {
  showToast,
  ToastPriority,
  ToastScope,
  ToastTimeout,
  ToastType,
} from '@wix/business-manager-api';
import { TFunction } from 'yoshi-flow-bm-runtime';

export interface PropagationToast {
  show(): void;
}

export const propagationToast = (t: TFunction) => ({
  show: () => {
    showToast({
      type: ToastType.WARNING,
      timeout: ToastTimeout.NONE,
      priority: ToastPriority.HIGH,
      scope: ToastScope.DASHBOARD,
      message: t('site_details.domain.processing_toast'),
      biName: 'site-details.domain-propagation',
    });
  },
});
