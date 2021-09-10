import React, { FC, useContext } from 'react';
import { ActionsButtonComponent } from './actions-button.component';
import {
  useModuleParams,
  useTranslation,
  useExperiments,
} from 'yoshi-flow-bm-runtime';
import { AppContext } from '../app-context/app-context';
import { TOrigin, DialogResult } from '@wix/quick-actions-dropdown';
import { handleAction } from '@src/services/action-handler';
import { IViewMode } from '@wix/business-manager-api';

export const ActionsButton: FC = () => {
  const {
    accountLanguage,
    metaSiteId,
    debug,
    config: { topology },
    viewMode,
  } = useModuleParams();
  const {
    widgetData: { quickActionsData },
  } = useContext(AppContext);
  const experimentsBag = useExperiments().experiments.all();
  const [t] = useTranslation();

  if (viewMode !== IViewMode.DASHBOARD || !quickActionsData) {
    return null;
  }

  const handleActionCompleted = (dialogResult: DialogResult) => {
    handleAction(dialogResult, t, accountLanguage);
  };

  const {
    siteActionsStaticsUrl,
    siteActionsDropdownTranslationsStaticsUrl,
    transferSiteDialogTranslationsStaticsUrl,
    transferSiteDialogClientStaticsUrl,
    siteActionsComponentsTranslationsStaticsUrl,
    siteActionsGetFeedbackStaticsUrl,
    siteActionsMigrateToEditorXStaticsUrl,
  } = topology;

  return (
    <ActionsButtonComponent
      locale={accountLanguage}
      metaSiteId={metaSiteId}
      debug={debug}
      topology={{
        siteActionsStaticsUrl,
        siteActionsDropdownTranslationsStaticsUrl,
        transferSiteDialogTranslationsStaticsUrl,
        transferSiteDialogClientStaticsUrl,
        siteActionsComponentsTranslationsStaticsUrl,
        siteActionsGetFeedbackStaticsUrl,
        siteActionsMigrateToEditorXStaticsUrl,
      }}
      siteActionsStaticsUrl={siteActionsStaticsUrl}
      origin={TOrigin.Dashboard}
      quickActionsData={quickActionsData}
      experiments={experimentsBag}
      onActionCompleted={handleActionCompleted}
    />
  );
};
