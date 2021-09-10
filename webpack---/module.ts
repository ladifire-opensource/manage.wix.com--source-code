import { BrowserClient } from '@sentry/browser';
import { BusinessManagerModule, ModuleId, PageComponentId, registerModule, registerPageComponentMonitors, TModuleParams } from '@wix/business-manager-api';
import { ModuleRegistry } from 'react-module-container';
import Experiments from '@wix/wix-experiments';
import { verifyRuleIntegrityFactory } from './api/verify-rule-integrity';
import { AutomationsDashboardLazyComponent } from './automations-dashboard-lazy-component';
import { AutomationsMultiActionWizardLazyComponent } from './automations-multi-action-wizard-lazy-component';
import { AutomationsRecommendationsLazyComponent } from './automations-recommendations-lazy-component';
import { AutomationsRowsLazyComponent } from './automations-rows-lazy-component';
import { activeRulesFactory } from './components/AutomationsDashboard/active-rules-factory';
import { recommendedRecipesCountFactory } from './components/AutomationsRecommendations/recommended-recipes-factory';
import { recommendationsExploreMoreClickBIFactory } from './components/AutomationsRecommendations/recommendations-explore-more-bi-factory';
import { AUTOMATIONS_DASHBOARD_LAZY_COMPONENT, AUTOMATIONS_MULTI_ACTION_WIZARD_LAZY_COMPONENT, AUTOMATIONS_RECOMMENDATIONS_LAZY_COMPONENT, AUTOMATIONS_ROWS_LAZY_COMPONENT } from './config';
import { getSentryHub } from './sentry-client/sentry-client';
import { createRuleFromRecipeFactory } from './create-rule-from-recipe-factory';
import { registerActionComponents, registerAutomationActions } from './automations-actions';

export class BMModule extends BusinessManagerModule {
  readonly experiments: Experiments;

  constructor(moduleId: ModuleId) {
    super(moduleId);
    this.setModuleConfigurationId(ModuleId.Triggers);

    this.experiments = new Experiments({ scope: 'my-account' });

    ModuleRegistry.registerMethod('automations.getExperiments', () => () => this.getExperiments());
    ModuleRegistry.registerMethod('automations.verifyRuleIntegrity', verifyRuleIntegrityFactory);
    ModuleRegistry.registerMethod('automations.dashboard.availableRecipesCount', recommendedRecipesCountFactory);
    ModuleRegistry.registerMethod('automations.dashboard.recommendationsExploreMoreClickBI', recommendationsExploreMoreClickBIFactory);
    ModuleRegistry.registerMethod('automations.dashboard.activeRules', activeRulesFactory);
    ModuleRegistry.registerMethod('automations.createRuleFromRecipe', createRuleFromRecipeFactory);

    this.registerComponentWithModuleParams(
      AUTOMATIONS_DASHBOARD_LAZY_COMPONENT,
      AutomationsDashboardLazyComponent,
    );

    this.registerComponentWithModuleParams(
      AUTOMATIONS_MULTI_ACTION_WIZARD_LAZY_COMPONENT,
      AutomationsMultiActionWizardLazyComponent,
    );

    this.registerComponentWithModuleParams(
      AUTOMATIONS_RECOMMENDATIONS_LAZY_COMPONENT,
      AutomationsRecommendationsLazyComponent,
    );
    this.registerComponentWithModuleParams(
      AUTOMATIONS_ROWS_LAZY_COMPONENT,
      AutomationsRowsLazyComponent,
    );

    registerActionComponents(this)
  }

  async init() {
    const experiments = await this.getExperiments();
    const moduleParams = ModuleRegistry.getModule('TRIGGERS').moduleParams as TModuleParams;

    const sentryHub = getSentryHub({
      ...moduleParams,
      experiments
    });

    registerPageComponentMonitors(PageComponentId.Triggers, {
      sentryClient: sentryHub.getClient<BrowserClient>()
    });

    ModuleRegistry.getModule('TRIGGERS').sentryHub = sentryHub;

    registerAutomationActions(moduleParams, experiments)
    const { registerCatalogEvents, clearTriggerSchemaCache } = await import('./register-catalog-events');
    ModuleRegistry.getModule('TRIGGERS').clearTriggerSchemaCache = clearTriggerSchemaCache;
    ModuleRegistry.getModule('TRIGGERS').registerCatalogEventPromise = registerCatalogEvents(moduleParams, experiments);
  }

  private async getExperiments() {
    await this.experiments.ready();
    return this.experiments.all();
  }
}

registerModule(ModuleId.Automations, BMModule);
