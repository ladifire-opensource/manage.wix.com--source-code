import { DashboardWidgetData, Step } from '@wix/dashboard-setup-common';

export const getStepsCategories = (
  dashboardWidgetData: DashboardWidgetData,
): string[] => {
  return (
    dashboardWidgetData.categorizedSteps?.map((category) => category.id) || []
  );
};

export interface StepsStatusSummery {
  completed: string[];
  unCompleted: string[];
  skipped: string[];
}

export const getRealEstateId = (
  dashboardWidgetData: DashboardWidgetData,
): string => {
  return (
    dashboardWidgetData.categorizedSteps[0]?.steps[0]?.dealer?.realEstateId ||
    ''
  );
};

export const getStepsStatusSummery = (
  dashboardWidgetData: DashboardWidgetData,
): StepsStatusSummery => {
  const { skippedSteps: skipped } = dashboardWidgetData;
  const allSteps = getAllSteps(dashboardWidgetData);
  const completed: string[] = [];
  const unCompleted: string[] = [];

  allSteps.forEach(({ isCompleted, id }) => {
    if (isCompleted) {
      completed.push(id);
    } else if (!skipped.includes(id)) {
      unCompleted.push(id);
    }
  });

  return {
    completed,
    unCompleted,
    skipped,
  };
};

export const getAllSteps = (
  dashboardWidgetData: DashboardWidgetData,
): Step[] => {
  return dashboardWidgetData.categorizedSteps
    .map((category) => category.steps)
    .flat();
};
