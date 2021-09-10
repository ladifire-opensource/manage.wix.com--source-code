import { hasPermission } from './components/AutomationsDashboard/bmHasPermission';
import { TModuleParams } from '@wix/business-manager-api';
import { ModuleRegistry } from 'react-module-container'

export const createRuleFromRecipeFactory = () => async (recipeName: string) => {
  if (!hasPermission()) {
    throw new Error('No permissions for automations.');
  }

  const {
    allRecipes,
    recipesByCategories,
    RecipesApi,
    registriesApiBuilder,
    AutomationsBiLogger,
    RulesApi,
    i18n,
    axios,
    Experiments,
    createRuleFromRecipeName,
  } = await loadDeps();

  const { metaSiteId } = moduleParams();
  const experimentsBag = await ModuleRegistry.invoke('automations.getExperiments');
  const experiments = new Experiments({ experiments: experimentsBag });
  const i18nInstance = await initI18n(i18n, axios, experiments);
  const translate = i18nInstance.t.bind(i18nInstance);
  const recipesApi = new RecipesApi(allRecipes, recipesByCategories, experiments);
  const rulesApi = new RulesApi();
  const registriesApi = registriesApiBuilder({ experiments, t: k => translate(`integrators_ns::${k}`) })();
  const biLogger = new AutomationsBiLogger({ msid: metaSiteId });

  return createRuleFromRecipeName(recipeName, recipesApi, registriesApi, rulesApi, experiments, translate, i18nInstance, biLogger);
}

const initI18n = async (i18n, axios, experiments) => {
  const {
    accountLanguage,
    config: {
      topology: { smartActionsStaticsUrl: baseUrl, translationsStaticsUrl }
    }
  } = moduleParams();

  const axiosInstance = axios.create();
  const integratorsTranslations = await axiosInstance.get(`${translationsStaticsUrl}assets/locale/integrators/messages_${accountLanguage}.json`).then(res => res.data);
  return new Promise<any>(async (resolve) => {
    const i18nInstance = i18n({ locale: accountLanguage, baseUrl, whenLoaded: () => {
      i18nInstance.addResourceBundle(accountLanguage, 'integrators_ns', integratorsTranslations);
      resolve(i18nInstance);
    }});
  });
};

const loadDeps = async () => {
  const [
    allRecipes,
    recipesByCategories,
    { RecipesApi },
    { registriesApiBuilder },
    { AutomationsBiLogger },
    { RulesApi },
    i18n,
    axios,
    Experiments,
    { createRuleFromRecipeName },

  ] = await Promise.all([
    import('./assets/recipes.json').then(x => x.default),
    import('./assets/recipe_by_categories.json').then(x => x.default),
    import('./api/recipes-api'),
    import('./api/registries-api/registries-api.factory'),
    import('./api/bi-logger/bi-logger'),
    import('./api/ambassador-rules-api'),
    import('./i18n').then(x => x.default),
    import('axios').then(x => x.default),
    import('@wix/wix-experiments').then(x => x.default),
    import(
      /* webpackChunkName: "create-rule-from-recipe" */ './create-rule-from-recipe'
    ),
  ]);

  return {
    allRecipes,
    recipesByCategories,
    RecipesApi,
    registriesApiBuilder,
    AutomationsBiLogger,
    RulesApi,
    i18n,
    axios,
    Experiments,
    createRuleFromRecipeName,
    eventRegistry: ModuleRegistry.getModule('TRIGGERS').eventRegistry,
    actionRegistry: ModuleRegistry.getModule('TRIGGERS').actionRegistry,
  };
}

const moduleParams = () => ModuleRegistry.getModule('TRIGGERS').moduleParams as TModuleParams;
