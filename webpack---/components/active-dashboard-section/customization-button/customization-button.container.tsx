import { CUSTOMIZE_DASHBOARD_PERMISSION, DASHBOARD_WIDGETS_PANEL_COMPONENT_NAME } from '@consts';
import { openSidePanel, SidePanelSize, closeSidePanel } from '@wix/business-manager-api';
import React, { useCallback, useEffect } from 'react';
import { useActiveDashboardSection } from '../active-dashboard-section.context';
import { CustomizationButtonEditMode } from './customization-button-edit-mode.component';
import { CustomizationButtonViewMode } from './customization-button-view-mode.component';
import { useBILogger, useModuleParams, useExperiments } from 'yoshi-flow-bm-runtime';
import { sendClickInDashboardEvent, sendShowTooltipEvent, sendViewInDashboardEvent } from '../bi';

export const CustomizationButton = () => {
  const {
    actions: { setIsCustomizing },
    selectors: { getIsCustomizing, hasWidgets: hasWidgetsSelector },
  } = useActiveDashboardSection();

  const isCustomizing = getIsCustomizing();
  const hasWidgets = hasWidgetsSelector();
  const biLogger = useBILogger();
  const { userPermissions } = useModuleParams();
  const { experiments } = useExperiments();
  const withSiteCategoryOnDashboard = experiments.enabled('specs.wos1.siteCategoryOnDashboard');

  useEffect(() => {
    sendViewInDashboardEvent(
      biLogger,
      hasWidgets ? 'active-dashboard-initial-success' : 'active-dashboard-setup',
    );
  }, [biLogger, hasWidgets]);

  const toggleIsCustomizing = useCallback(() => {
    if (isCustomizing) {
      closeSidePanel();
      setIsCustomizing(false);

      sendClickInDashboardEvent(biLogger, 'customize-dashboard-finish');
    } else {
      openSidePanel({
        componentName: DASHBOARD_WIDGETS_PANEL_COMPONENT_NAME,
        componentProps: {},
        size: SidePanelSize.LARGE,
      });
      setIsCustomizing(true);
      sendClickInDashboardEvent(biLogger, 'customize-dashboard');
    }
  }, [isCustomizing, setIsCustomizing, biLogger]);

  const onTooltipShown = useCallback(() => {
    sendShowTooltipEvent(biLogger);
  }, [biLogger]);

  const isCustomizable = userPermissions?.includes(CUSTOMIZE_DASHBOARD_PERMISSION);
  if (withSiteCategoryOnDashboard) {
    return isCustomizing ? (
      <CustomizationButtonEditMode
        isCustomizing={isCustomizing}
        toggleIsCustomizing={toggleIsCustomizing}
        isCustomizable={isCustomizable}
        withSiteCategoryOnDashboard={withSiteCategoryOnDashboard}
      />
    ) : (
      <CustomizationButtonViewMode
        toggleIsCustomizing={toggleIsCustomizing}
        onTooltipShown={onTooltipShown}
        isCustomizable={isCustomizable}
        hasWidgets={hasWidgets}
        withSiteCategoryOnDashboard={withSiteCategoryOnDashboard}
      />
    );
  } else {
    return hasWidgets || isCustomizing ? (
      <CustomizationButtonEditMode
        isCustomizing={isCustomizing}
        toggleIsCustomizing={toggleIsCustomizing}
        isCustomizable={isCustomizable}
        withSiteCategoryOnDashboard={withSiteCategoryOnDashboard}
      />
    ) : (
      <CustomizationButtonViewMode
        toggleIsCustomizing={toggleIsCustomizing}
        onTooltipShown={onTooltipShown}
        isCustomizable={isCustomizable}
        hasWidgets={hasWidgets}
        withSiteCategoryOnDashboard={withSiteCategoryOnDashboard}
      />
    );
  }
};
