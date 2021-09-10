import {
  RealEstateDefinition,
  SectionType,
  IItem,
  EBadge,
  IActionTarget,
  ActionTypes,
  ProgressBarDataResponse,
  ItemsDto,
} from '@src/components/sidebar-setup-progress/api';
import { DASHBOARD_SETUP_REAL_ESTATE } from '@src/consts';
import {
  DashboardWidgetData,
  CTA,
  ActionTargetType,
  ActionTargetVideo,
} from '@wix/dashboard-setup-common';
import { fetchDashboardWidgetData } from '../dashboard-widget-data';
import { IViewMode } from '@wix/business-manager-api';

export const mapToSidebarData = (
  dashboardWidgetData: DashboardWidgetData,
): ProgressBarDataResponse => ({
  realEstates: [createRealEstateDefinition()],
  items: {
    [DASHBOARD_SETUP_REAL_ESTATE]: createProgressBarItems(dashboardWidgetData),
  },
});

const createRealEstateDefinition = (): RealEstateDefinition => ({
  id: DASHBOARD_SETUP_REAL_ESTATE,
  titleKey: '',
  type: SectionType.COUNTED,
  subtitleKey: '',
  progressBar: {
    titleKey: 'sidebar.title',
    happyMomentTitleKey: '',
    happyMomentDescriptionKey: '',
    happyMomentCtaKey: '',
  },
});

const createProgressBarItems = ({
  categorizedSteps,
  skippedSteps,
}: DashboardWidgetData): IItem[] =>
  categorizedSteps
    .flatMap((cat) => cat.steps)
    .map((step) => ({
      id: step.id,
      title: step.title,
      name: step.dealer.offerName,
      description: step.description,
      badge: EBadge.STANDARD,
      thumbnailUrl: '',
      actionLabel: step.cta!.value.key,
      actionTarget: ctaToActionTarget(step.cta!),
      order: step.order,
      orderInCategory: step.orderInCategory,
      isCompleted: step.isCompleted,
      estimatedTime: step.timeToComplete?.toString() || '',
      mandatory: false,
      sectionId: '',
      isSkipped: skippedSteps.includes(step.id),
      isPermitted: step.isPermitted,
      realEstateId: step.dealer.realEstateId,
      categoryId: step.categoryId,
    }));

const ctaToActionTarget = (cta: CTA): IActionTarget => {
  if (cta.type === ActionTargetType.video) {
    return ctaToVideoAction(cta);
  }

  return {
    type:
      cta.type === ActionTargetType.bizMgrNavigation
        ? ActionTypes.bizMgrNavigation
        : ActionTypes.externalUrl,
    target: cta.value.value,
  };
};

const ctaToVideoAction = ({ value }: ActionTargetVideo): IActionTarget => ({
  type: ActionTypes.video,
  target: {
    title: value.modalTitle,
    subtitle: '',
    actionLabel: value.key,
    youtubeIdByLanguage: value.youtubeIdbyLanguage,
    actionTarget: '',
  },
});

export const fetchSidebarItems = async (
  viewMode: IViewMode,
): Promise<ItemsDto> => ({
  [DASHBOARD_SETUP_REAL_ESTATE]: createProgressBarItems(
    await fetchDashboardWidgetData(viewMode),
  ),
});
