import { CategorizedSteps, Category } from '@wix/dashboard-setup-common';

export interface StepsProgress {
  completedCount: number;
  totalCount: number;
  completedPercentage: number;
}

export function calculateStepsProgress(
  categorizedSteps: CategorizedSteps,
  skippedSteps: Set<string>,
  dismissFeatureEnabled: boolean = false,
): StepsProgress {
  const steps = categorizedSteps?.flatMap((category) => category.steps);

  const totalCount = dismissFeatureEnabled
    ? steps?.filter((step) => !skippedSteps.has(step.id)).length || 0
    : steps?.length || 0;

  const completedCount = steps?.filter(
    (step) =>
      step.isCompleted || (!dismissFeatureEnabled && skippedSteps.has(step.id)),
  ).length;
  const completedPercentage = totalCount
    ? Math.round((completedCount / totalCount) * 100)
    : 0;

  return {
    completedCount,
    completedPercentage,
    totalCount,
  };
}

export function calculateCategoryStepsProgress(
  category: Category,
  skippedSteps: Set<string>,
  dismissFeatureEnabled: boolean = false,
): StepsProgress {
  return calculateStepsProgress(
    [category],
    skippedSteps,
    dismissFeatureEnabled,
  );
}
