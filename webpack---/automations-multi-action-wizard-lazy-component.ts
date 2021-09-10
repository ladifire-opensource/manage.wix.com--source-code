import { ModuleRegistry, ReactLazyComponent } from 'react-module-container';
import { AUTOMATIONS_MULTI_ACTION_WIZARD_COMPONENT } from './config';
import { appDefIds, getCurrentInstance, getMandatoryBIFields, TPrefetchParams } from '@wix/business-manager-api';

async function loadDeps(props) {
  const [
    axios,
    { DataCapsule, LocalStorageStrategy, WixStorageStrategy },
    guid,
    biLoggerFactory,
    Experiments,
    { biSchema },
    { navigateTo },
    i18n,
    { AppStore },
    { TriggersConfigurationsApi },
    { DealerApi },
    { RulesApi: AmbassadorRulesApi },
    { ContactsApi },
    { FeatureManagerApi },
    { OnboardingApi },
    { registriesApiBuilder },
    { onSnapshot },
  ] = await Promise.all([
    import('axios').then(x => x.default),
    import('data-capsule'),
    import('guid').then(x => x.default),
    import('@wix/web-bi-logger').then(x => x.default),
    import('@wix/wix-experiments').then(x => x.default),
    import('./core/bi'),
    import('./env/navigate-to'),
    import('./i18n').then(x => x.default),
    import('./stores/app-store'),
    import('./api/triggers-configurations-api'),
    import('./api/dealer/dealer-api'),
    import('./api/ambassador-rules-api'),
    import('./api/contacts-api'),
    import('./api/feature-manager-api'),
    import('./api/onboarding-api'),
    import('./api/registries-api/registries-api.factory'),
    import('mobx-state-tree'),
  ]);
  const { smartActionsStaticsUrl, translationsStaticsUrl } = props.config.topology;
  const locale = props.locale;

  const automationsExperimentsBag = await ModuleRegistry.invoke('automations.getExperiments');
  const experiments = new Experiments({ experiments: automationsExperimentsBag });

  const i18nObj = i18n({ locale, baseUrl: smartActionsStaticsUrl });
  const axiosInstance = axios.create();
  const integratorsTranslations = await axiosInstance.get(`${translationsStaticsUrl}assets/locale/integrators/messages_${locale}.json`).then(res => res.data);
  i18nObj.addResourceBundle(locale, 'integrators_ns', integratorsTranslations);

  const rulesApi = new AmbassadorRulesApi();
  const registriesApiFactory = registriesApiBuilder({
    experiments,
    t: k => i18nObj.t(`integrators_ns::${k}`)
  });

  const instance = getCurrentInstance(appDefIds.triggers);
  const client = axios.create({
    headers: { 'X-Wix-Instance': instance, Authorization: instance }
  });
  const dealerApi = new DealerApi();
  const contactsApi = new ContactsApi({ client, metaSiteId: props.metaSiteId });
  const triggersConfigurationsApi = new TriggersConfigurationsApi();

  const capsule = new DataCapsule({
    strategy: new LocalStorageStrategy(),
    namespace: 'smart-actions',
    scope: `siteId-${props.metaSiteId}`
  });

  const bmCapsule = new DataCapsule({
    strategy: new LocalStorageStrategy(),
    namespace: 'wix-business-manager'
  });
  const search = new URLSearchParams(location.search);
  const dataCapsuleId = search.get('withPayload') ? search.get('dataCapsuleId') : '';
  const guidGenerator = () => guid.raw();
  const bzmPayload = async () => {
    const capsuleItem = await bmCapsule.getItem(dataCapsuleId).catch(() => null);
    bmCapsule.removeItem(dataCapsuleId);
    return capsuleItem;
  }
  const getComponent = name => ModuleRegistry.component(name);
  const featureManagerApi = new FeatureManagerApi(props.metaSiteId);
  const baseUrl = `/dashboard/${props.metaSiteId}/preinstall-automations/`;
  const { endpoint, src } = biSchema;
  const biLogger = biLoggerFactory
    .factory({ endpoint })
    .setDefaults({ src, msid: props.metaSiteId, ...getMandatoryBIFields() })
    .logger();
  const remoteCapsule = new DataCapsule({
    strategy: new WixStorageStrategy(),
    namespace: 'smart-actions',
    scope: { siteId: props.metaSiteId }
  });

  await ModuleRegistry.getModule('TRIGGERS').registerCatalogEventPromise;

  const onboardingApi = new OnboardingApi(remoteCapsule);

  const createAppStore = (existingStore?) => {
    return AppStore.create(existingStore || {}, {
      registriesApi: registriesApiFactory(),
      rulesApi,
      contactsApi,
      recipesApi: null,
      triggersConfigurationsApi,
      ascendBrandingApi: null,
      guidGenerator,
      baseUrl,
      onboardingApi,
      getComponent,
      navigateTo,
      featureManagerApi,
      experiments,
      config: {
        baseUrl,
        locale,
      },
      bzmPayload,
      biLogger,
      fedopsLogger: {},
      translate: (key, options) => i18nObj.t(key, options),
      bzmProps: () => { },
      sitelessMode: false,
      dealerApi,
    });
  }

  const fromStorage = (await capsule.getItem('app-store').catch(() => ({})));
  const appStore = AppStore.is(fromStorage) ? createAppStore(fromStorage) : createAppStore();

  onSnapshot(appStore, snapshot => {
    capsule.setItem('app-store', snapshot);
  });

  return {
    appStore,
    i18n: i18nObj,
    biLogger,
    automationsExperimentsBag,
    contactsApi,
  };
}

const minified = debug => (debug ? '' : '.min');

const getFiles = ({ debug, config: { topology } }) => {
  const { smartActionsStaticsUrl } = topology;

  return [
    `${smartActionsStaticsUrl}automations-multi-action-wizard-component.bundle${minified(debug)}.js`,
    `${smartActionsStaticsUrl}automations-multi-action-wizard-component${minified(debug)}.css`
  ];
};

export class AutomationsMultiActionWizardLazyComponent extends ReactLazyComponent<any> {
  static prefetch(props: TPrefetchParams) {
    return getFiles(props);
  }

  constructor(props) {
    super(props, {
      files: getFiles(props),
      component: AUTOMATIONS_MULTI_ACTION_WIZARD_COMPONENT,
      resolve: async () => {
        return loadDeps(props);
      }
    });
  }
}
