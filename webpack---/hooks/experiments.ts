import { useExperiments } from 'yoshi-flow-bm-runtime';

export const SITE_CATEGORY_SPEC = 'specs.wos1.siteCategoryOnDashboard';
export const TRANSLATED_USER_ROLES_SPEC = 'specs.wos1.translatedUserRoles';
export const DOUBLE_USER_ROLES_SPEC = 'specs.ShouldDoRolesIntersection';

export const useSiteCategoryExperiment = () => {
  const { experiments } = useExperiments();
  return experiments.enabled(SITE_CATEGORY_SPEC);
};

export const useTranslatedUserRolesExperiment = () => {
  const { experiments } = useExperiments();
  return experiments.enabled(TRANSLATED_USER_ROLES_SPEC);
};
