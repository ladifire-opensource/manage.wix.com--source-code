import { IState } from '../../types/store';
import { IPageComponentInfo, TPrefetchParams } from '@wix/business-manager-api';
import { getIsDebug } from '../../selectors/isDebugSelectors';
import { getCurrentUserLanguage } from '../../selectors/currentUserSelectors';
import { getModuleConfig } from '../../selectors/modulesSelectors';
import { getViewMode } from '../../selectors/viewModeSelector';

export const getPrefetchParams = (state: IState, info: IPageComponentInfo): TPrefetchParams => ({
  debug: getIsDebug(state),
  locale: getCurrentUserLanguage(state),
  accountLanguage: getCurrentUserLanguage(state),
  config: getModuleConfig(state, info.moduleId),
  viewMode: getViewMode(state) as string
});
