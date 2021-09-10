import { PageComponentId } from '@wix/business-manager-api';
import {
  SidebarEntry,
  SidebarLink,
  SidebarSeparator,
  SidebarTitle,
} from '@wix/business-manager-sidebar-data';

const EMPTY_SIDEBAR_SECTION: SidebarEntry[] = [];

interface DashboardEntry {
  appId: string;
  label: string;
}

interface DashboardSection {
  title: string;
  entries: DashboardEntry[];
}

interface DashboardCategory {
  sections: DashboardSection[];
}

enum DashboardCategoryType {
  SINGLE_APP,
  MULTI_APP,
}

function convertToSidebarLink(
  entry: DashboardEntry,
  sectionIndex: number,
  entryIndex: number,
  categoryType: DashboardCategoryType,
): SidebarLink {
  const { appId, label } = entry;

  const id =
    categoryType === DashboardCategoryType.MULTI_APP
      ? `${appId}-dashboard.link`
      : `${appId}-dashboard.${sectionIndex}-${entryIndex}.link`;
  const appState =
    categoryType === DashboardCategoryType.MULTI_APP
      ? appId
      : `${appId}/${sectionIndex}/${entryIndex}`;
  const biName =
    categoryType === DashboardCategoryType.MULTI_APP
      ? `${appId}-dashboard`
      : `${appId}-dashboard.${sectionIndex}-${entryIndex}`;
  const pageComponentId = PageComponentId.Etpa_Container;
  const visibleByPermission = 'SIDEBAR.VIEW-APP-MARKET';

  return {
    id,
    label,
    navigateToConfig: {
      pageComponentId,
      contextData: { appState },
    },
    biName,
    visibleByPermission,
  };
}

function convertToSidebarSection(
  section: DashboardSection,
  sectionIndex: number,
  categoryType: DashboardCategoryType,
): SidebarEntry[] {
  const { title, entries } = section;
  const hasDashboardEntries = entries.length > 0;

  if (!hasDashboardEntries) {
    return EMPTY_SIDEBAR_SECTION;
  }

  const sectionId =
    categoryType === DashboardCategoryType.MULTI_APP
      ? 'dashboard-apps-section'
      : `${entries[0].appId}-${sectionIndex}`;

  const sidebarSeparator: SidebarSeparator = { id: `${sectionId}.separator` };
  const sidebarLinks = entries.map(
    (entry: DashboardEntry, entryIndex: number) =>
      convertToSidebarLink(entry, sectionIndex, entryIndex, categoryType),
  );

  if (!title) {
    return [sidebarSeparator, ...sidebarLinks];
  }

  const sidebarTitle: SidebarTitle = {
    id: `${sectionId}.title`,
    label: title,
  };
  return [sidebarSeparator, sidebarTitle, ...sidebarLinks];
}

function convertToSidebarCategory(
  category: DashboardCategory,
  type: DashboardCategoryType,
): SidebarEntry[] {
  const sections = category.sections.map(
    (section: DashboardSection, sectionIndex: number) =>
      convertToSidebarSection(section, sectionIndex, type),
  );

  return sections.flat(1);
}

export {
  DashboardEntry,
  DashboardSection,
  DashboardCategory,
  DashboardCategoryType,
  convertToSidebarSection,
  convertToSidebarCategory,
};
