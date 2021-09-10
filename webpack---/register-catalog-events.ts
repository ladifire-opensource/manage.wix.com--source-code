import { TriggersConfigurationsApi } from "./api/triggers-configurations-api";
import { EntitiesTriggerConfiguration, ActionVisibilityOverride, SchemaConfiguration, SchemaField } from "@wix/ambassador-action-triggers-server/http";
import { IRegistrationConfig } from "@wix/smart-actions-types";
import { ModuleRegistry } from 'react-module-container';
import { configModule, ModuleId, appDefIds, TModuleParams } from "@wix/business-manager-api";
import axios from 'axios';
import _ from "lodash";

export const selectedConditionsWithValues = (selectedConditions = {}) => {
  return Object.keys(selectedConditions).reduce((acc, key) => ({ ...acc, [key]: { values: selectedConditions[key] } }), {});
}

const catalogApi = new TriggersConfigurationsApi();

export const clearTriggerSchemaCache = () => {
  catalogApi.clearTriggerSchemaCache();
}

const fetchEventSchemaFromCatalog = async (triggersCatalog: EntitiesTriggerConfiguration[], eventId: string, selectedConditions): Promise<SchemaConfiguration> => {
  const event = triggersCatalog.find(trigger => trigger.name === eventId || /*useTriggerConfigurationIdEnabled*/ trigger.id === eventId);

  const configuration = event.schemaConfiguration.dynamicSchemaUrl ?
    (await catalogApi.getTriggerSchema({ id: event.id, selectedConditions: selectedConditionsWithValues(selectedConditions) })).schemaConfiguration :
    event.schemaConfiguration;
  configuration.fields = [...configuration.fields, ...event.enrichments.flatMap(({ fields }) => fields)]
  return configuration
};

export const categoryToAppTitles = {
  '2edf484d-9c39-461b-8cbd-a3ba6ac9c575': 'abm-config-module-triggers-app-title',
  '389a6040-ae2e-464d-bead-6f4fec6400ec': 'Dev Center',
  '13ee94c1-b635-8505-3391-97919052c16f': 'invoices',
  '55cd9036-36bb-480b-8ddc-afda3cb2eb8d': 'price_quotes',
  '1380b703-ce81-ff05-f115-39571d94dfcd': 'wix_stores',
  '140603ad-af8d-84a5-2c80-a0f60cb47351': 'wix_events',
  '13d21c63-b5ec-5912-8397-c3a5ddb27a97': 'wix_bookings',
  '141fbfae-511e-6817-c9f0-48993a7547d1': 'inbox',
  '14517e1a-3ff0-af98-408e-2bd6953c36a2': 'chat_visitor',
  '675bbcef-18d8-41f5-800e-131ec9e08762': 'Wix Data Forms',
  '14ce1214-b278-a7e4-1373-00cebd1bef7c': 'wix_forms',
  'ContactForm': 'wix_contact_form',
  '1375baa8-8eca-5659-ce9d-455b2009250d': 'get_subscribers',
  'SiteMembers': "members_login",
  'ea2821fc-7d97-40a9-9f75-772f29178430': 'workflows',
  '94bc563b-675f-41ad-a2a6-5494f211c47b': 'virtual_numbers',
  '135aad86-9125-6074-7346-29dc6a3c9bcf': 'wix_hotels',
  '1522827f-c56c-a5c9-2ac9-00f9e6ae12d3': 'paid_plans',
  '2936472a-a1ed-4ae5-9f71-614313a9f4e7': 'challenges',
  'a322993b-2c74-426f-bbb8-444db73d0d1b': 'mobile_app',
  '14bcded7-0066-7c35-14d7-466cb3f09103': 'wix_blog',
  '1537b24e-29d1-6d8f-b8e1-d6860f2f70b9': 'wix_file_share',
  '1533b427-ca7c-a246-0434-83d3d3737bf3': 'wix_file_share_staging',
  '14724f35-6794-cd1a-0244-25fd138f9242': 'wix_forum',
  '148c2287-c669-d849-d153-463c7486a694': 'wix_groups',
  '84255ec5-af0e-4dbf-aad0-fe55fdbd6bcf': 'wix_the_button_qa',
  '553c79f3-5625-4f38-b14b-ef7c0d1e87df': 'loyalty',
  '13e8d036-5516-6104-b456-c8466db39542': 'wix_restaurants',
  '74bff718-5977-47f2-9e5f-a9fd0047fd1f': 'contacts',
  'partners-feedback': 'partners-feedback',
};

export const categoryToColors = {
  '2edf484d-9c39-461b-8cbd-a3ba6ac9c575': '#ABABAB',
  '13ee94c1-b635-8505-3391-97919052c16f': '#EF73C0',
  '55cd9036-36bb-480b-8ddc-afda3cb2eb8d': '#ED6779',
  '1380b703-ce81-ff05-f115-39571d94dfcd': '#3370FB',
  '140603ad-af8d-84a5-2c80-a0f60cb47351': '#68A4D5',
  '13d21c63-b5ec-5912-8397-c3a5ddb27a97': '#7852D2',
  '141fbfae-511e-6817-c9f0-48993a7547d1': '#2682CD',
  '14517e1a-3ff0-af98-408e-2bd6953c36a2': '#2682CD',
  '675bbcef-18d8-41f5-800e-131ec9e08762': '#FF8D41',
  '14ce1214-b278-a7e4-1373-00cebd1bef7c': '#17B0E2',
  'ContactForm': '#C53E99',
  '1375baa8-8eca-5659-ce9d-455b2009250d': '#3D9FA1',
  'SiteMembers': "#FDB10C",
  'ea2821fc-7d97-40a9-9f75-772f29178430': '#125B8F',
  '94bc563b-675f-41ad-a2a6-5494f211c47b': '',
  '135aad86-9125-6074-7346-29dc6a3c9bcf': '#4ABD81',
  '1522827f-c56c-a5c9-2ac9-00f9e6ae12d3': '#FF8E8C',
  '2936472a-a1ed-4ae5-9f71-614313a9f4e7': '#ABABAB',
  'a322993b-2c74-426f-bbb8-444db73d0d1b': '#FDB10C',
};

export const defaultColor = '68a4d5';

const wixBookingsLastAttendName = 'wixBookings/lastAttend';

const convertTriggerConfigurationToEventConfig = (triggersCatalog: EntitiesTriggerConfiguration[], triggerConf: EntitiesTriggerConfiguration) => {
  const categoryId = triggerConf.categories.find(c => categoryToAppTitles[c])
  const schemaFields = [
    ...triggerConf.schemaConfiguration.fields,
    ...triggerConf.enrichments.flatMap(({ fields }) => fields)
  ];
  const supportsPreEventTrigger =
    triggerConf.name !== wixBookingsLastAttendName &&
    !!schemaFields.find(
      (field: SchemaField) =>
        field.fieldTypeV2.date && field.fieldTypeV2.date['allowNegativeOffset']
    );

  return {
    name: triggerConf.name,
    activityType: triggerConf.name,
    eventType: triggerConf.eventType,
    displayName: triggerConf.displayName,
    displayDescription: triggerConf.description,
    displayColor: categoryToColors[categoryId] || defaultColor,
    providesContactInfo: true,
    supportsImmediateChat: !triggerConf.actionRecommendations.find(ar => ar.actionName === 'send-message' && ar.actionVisibilityOverride === ActionVisibilityOverride.HIDE),
    supportsPreEventTrigger: !!supportsPreEventTrigger,
    supportsPingNotification: !!triggerConf.actionRecommendations.find(ar => ar.actionName === 'notify' && ar.actionVisibilityOverride === ActionVisibilityOverride.SHOW),
    conditions: {},
    actionComponentInfo:
      triggerConf.actionRecommendations.reduce((acc, recommendation) => {
        return {
          ...acc,
          [recommendation.actionName]: recommendation.propertySuggestions
        }
      }, {}),
    actionRecommendations: triggerConf.actionRecommendations,
    sourceId: triggerConf.source.sourceId,
    categoryId: triggerConf.categories[0],
    reengagementInfo: triggerConf.reengagementInfo,
    triggerConfigurationId: triggerConf.id,
    generateEventSchema: (eventId: string, selectedConditions) => fetchEventSchemaFromCatalog(triggersCatalog, eventId, selectedConditions),
  };
}

export const registerCatalogEvents = async (moduleParams: TModuleParams, experiments = {}) => {
  const [triggersCatalog, wixDataForms, userHasApp, VNPurchaseState] = await Promise.all([
    catalogApi.getTriggersCatalog().then(r => r.results),
    fetchWixDataForms(),
    fetchUserHasApp(moduleParams.userId, moduleParams.metaSiteId),
    ModuleRegistry.invoke('virtual-numbers.getPurchaseState'),
  ]);
  const triggerConfigurationsByCategory: Map<string, EntitiesTriggerConfiguration[]> = triggersCatalog.reduce((acc: Map<string, EntitiesTriggerConfiguration[]>, trigger) => {
    const firstCategoryId = trigger.categories ? trigger.categories[0] : null;
    const triggers = acc.get(firstCategoryId) || [];
    // TODO: fix this workaround for wix data forms
    if (trigger.id === wixDataFormsTriggerId && wixDataForms.length === 0) {
      return acc;
    }
    if (trigger.id === wixMobileAppTriggerId && !userHasApp) {
      return acc;
    }
    if (VNTriggerIds.includes(trigger.id) && VNPurchaseState !== 'Complete') {
      return acc
    }
    triggers.push(trigger);
    acc.set(firstCategoryId, triggers);
    return acc;
  }, new Map());
  const triggerConfigurationsByCategoryArray = Array.from(triggerConfigurationsByCategory.entries());
  for (const [categoryId, triggerConfigurations] of triggerConfigurationsByCategoryArray) {
    const registrationConfig: IRegistrationConfig = {
      // @ts-ignore
      isMigratedEvent: true,
      appDefId: categoryId,
      appTitle: categoryToAppTitles[categoryId],
      events: triggerConfigurations
        .map(triggerConf => convertTriggerConfigurationToEventConfig(triggersCatalog, triggerConf))
        .reduce((acc, triggerConf) => {
          if (experiments['specs.crm.AutomationsUseTriggerConfigurationId'] === 'true') {
            acc[triggerConf.triggerConfigurationId] = triggerConf;
          } else {
            acc[triggerConf.name] = triggerConf;
          }

          return acc;
        }, {}),
      // @ts-ignore
      generateEventSchema: (eventId: string, selectedConditions) => fetchEventSchemaFromCatalog(triggersCatalog, eventId, selectedConditions),
    }
    configModule(ModuleId.Automations, ModuleId.Triggers, registrationConfig);
  }
}

const fetchUserHasApp = (userId: string, metaSiteId: string) => {
  return getInstanceFromAppDefId(appDefIds.MobileTab)
    .then(instance =>
      axios
        .get(
          `/_api/wix-bi-profile-webapp/v2/user/${userId}`,
          {
            headers: {
              Authorization: instance,
              'Content-Type': 'application/json'
            },
            params: {
              metasiteGuid: metaSiteId,
              fields: ['one_app']
            }
          },
        )
        .then(({ data }) => {
          return data.fields.one_app;
        })
    )
    .catch(() => false);
}

export const VNTriggerIds = ['f04c5a4e-2355-45c3-a4f0-b8d3f784d171', 'b78f4df1-3108-4b52-bc56-edb1bca1e512'];

export const wixMobileAppTriggerId = 'b2150b6a-1e81-43d0-8e06-27eb17a74063';

const fetchWixDataForms = (): Promise<any[]> => {
  const wixDataFormsPrefix = 'wixcode-dev.';
  const wixDataFormsAppDefId = appDefIds.wixCode;

  return getInstanceFromAppDefId(wixDataFormsAppDefId)
    .then(instance =>
      axios
        .get(
          '/_api/wix-form-builder-web/v1/forms?paging.limit=1000&filter.status=PUBLISHED',
          {
            headers: {
              Authorization: wixDataFormsPrefix + instance,
              'X-Wix-Client-Artifact-Id': 'triggers-statics',
            },
          },
        )
        .then(({ data }) => {
          return data.forms;
        })
    )
    .catch(() => ([]));
}

export const wixDataFormsTriggerId = 'f1f774ef-21e8-42dc-b3f6-83e1471e9244';

const getInstanceFromAppDefId = async (appDefId: string): Promise<string> => {
  const isAppInstalled = ModuleRegistry.invoke(
    'businessManager.isAppInstalled',
    appDefId
  );

  if (isAppInstalled) {
    const instance = ModuleRegistry.invoke(
      'businessManager.getCurrentInstance',
      appDefId
    );

    return instance ? instance : Promise.reject();
  }

  return Promise.reject();
};
