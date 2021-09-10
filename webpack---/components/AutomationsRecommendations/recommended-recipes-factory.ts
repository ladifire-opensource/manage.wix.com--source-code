import { hasPermission } from '../AutomationsDashboard/bmHasPermission';

export const recommendedRecipesCountFactory = () => async ({
  triggers = [],
  actions = [],
  triggerSources = [],
  actionSources = [],
} = {
  triggers: [],
  actions: [],
  triggerSources: [],
  actionSources: [],
}) => {
  if (!hasPermission()) {
    throw new Error('No permissions for automations.')
  }

  const { recommendedRecipesCount } = await import(
    /* webpackChunkName: "recommendedRecipes" */ './recommended-recipes'
  );
  return recommendedRecipesCount({
    triggers,
    actions,
    triggerSources,
    actionSources,
  });
  }
