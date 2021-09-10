import { IItem, ActionTypes } from '../../api';
import { formatExternalUrl, injectReferrerToNavigateTo } from './uri';
import { PageComponentId } from '@wix/business-manager-api';

export const navigateToDashboard = () => {
  // eslint-disable-next-line dot-notation
  (window as any)['ModuleRegistry'].invoke(
    'businessManager.navigateTo',
    injectReferrerToNavigateTo({ pageComponentId: PageComponentId.Home }, true),
  );
};

export const navigate = ({
  metaSiteId,
  item,
  fromProgressBar,
}: {
  metaSiteId: string;
  item: IItem;
  fromProgressBar?: boolean;
}): void => {
  switch (item.actionTarget.type) {
    case ActionTypes.externalUrl:
      window.open(
        formatExternalUrl(item.actionTarget.target.toString(), metaSiteId),
      );
      break;
    case ActionTypes.bizMgrNavigation:
      // eslint-disable-next-line dot-notation
      (window as any)['ModuleRegistry'].invoke(
        'businessManager.navigateTo',
        injectReferrerToNavigateTo(item.actionTarget.target, fromProgressBar),
      );
      break;
    default:
      throw new Error('Unexpected action type');
  }
};

export const reloadPage = () => {
  window.location.reload();
};
