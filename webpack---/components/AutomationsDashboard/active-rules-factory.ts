import { hasPermission } from './bmHasPermission';

export const activeRulesFactory = () => async ({
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

  const { activeRules } = await import(
      /* webpackChunkName: "activeRules" */ './active-rules'
  );
  return activeRules({
    triggers,
    actions,
    triggerSources,
    actionSources,
  });
}
