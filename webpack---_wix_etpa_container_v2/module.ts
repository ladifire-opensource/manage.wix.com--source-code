import { ModuleFlowAPI, ModuleInitFn } from '@wix/yoshi-flow-bm';
import { SidebarConfig } from '@wix/business-manager-sidebar-data';
import { getAppCategory, getQuickLinksCategory } from './apis/sidebar.api';
import {
  convertToSidebarCategory,
  DashboardCategoryType,
} from './utils/business-manager-sidebar';

const WIX_HOTELS_ID = '982f4b77-120c-4b3b-a9d6-51fa1f48986b';

async function getEtpaSidebarConfig({
  httpClient,
  moduleParams,
}: ModuleFlowAPI): Promise<SidebarConfig> {
  const { metaSiteId } = moduleParams;

  const [
    quickLinksCategoryResponse,
    wixHotelsCategoryResponse,
  ] = await Promise.all([
    httpClient.request(getQuickLinksCategory(metaSiteId)),
    httpClient.request(getAppCategory(WIX_HOTELS_ID, metaSiteId)),
  ]);

  const quickLinksSidebarCategory = convertToSidebarCategory(
    quickLinksCategoryResponse.data,
    DashboardCategoryType.MULTI_APP,
  );
  const wixHotelsSidebarCategory = convertToSidebarCategory(
    wixHotelsCategoryResponse.data,
    DashboardCategoryType.SINGLE_APP,
  );

  return {
    slotItems: {
      'apps.installed-dashboard-apps-slot': quickLinksSidebarCategory,
      'app-market-hotels-etpa-slot': wixHotelsSidebarCategory,
    },
  };
}

const init: ModuleInitFn = (flowAPI: ModuleFlowAPI) => {
  flowAPI.module.getSidebarConfig = () => getEtpaSidebarConfig(flowAPI);
};

export { init };
