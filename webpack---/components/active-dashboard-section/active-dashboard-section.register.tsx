import { getModule, ModuleId } from '@wix/business-manager-api';
import { ACTIVE_DASHBOARD_SECTION_BM_COMPONENT, ACTIVE_DASHBOARD_SECTION_ID } from '@consts';
import { ActiveDashboardRoot } from '@components/active-dashboard-section/active-dashboard-section.root';
import { registerWidget } from '@wix/business-dashboard-api';

export const registerActiveDashboardSection = () => {
  getModule(ModuleId.Home).registerComponentWithModuleParams(
    ACTIVE_DASHBOARD_SECTION_BM_COMPONENT,
    ActiveDashboardRoot,
  );
  registerWidget({
    bmComponentName: ACTIVE_DASHBOARD_SECTION_BM_COMPONENT,
    widgetId: ACTIVE_DASHBOARD_SECTION_ID,
  });
};
