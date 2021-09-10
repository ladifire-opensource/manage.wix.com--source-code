import {
  appDefIds,
  BusinessManagerModule,
  configModule,
  ModuleId,
  PageComponentId,
  registerPageComponentMonitors,
} from '@wix/business-manager-api';
import { TModuleParams } from './commonTypes';
import { IKeyboard } from '@wix/chat-web';
import {
  DOWNLOAD_ONE_APP_MODAL_COMPONENT,
  INBOX_CONVERSATION_LAZY_COMPONENT_NAME,
  INBOX_LAZY_COMPONENT_NAME,
  SEND_MESSAGE_WIDGET_LAZY_COMPONENT_NAME,
} from './component-names';
import { withModuleParams } from '../components/withModuleParams';
import InboxConversationLazyComponent from './inbox-conversation-lazy-component';
import InboxLazyComponent from './inbox-lazy-component';
import SendMessageWidgetLazyComponent from './send-message-widget-lazy-component';
import { getInstance, isChatInstalled } from '../services/bmUtils';
import chatAppsRegistry from '@wix/chat-apps-registry';
import { InboxSettingsLazyComponent } from '@wix/inbox-settings/dist/src/lazy-component';
import {
  getSentryInboxClient,
  getSentryInboxSettingsClient,
} from '../services/sentry-client';
import Experiments from '@wix/wix-experiments';
import { ReactLoadableComponent } from 'react-module-container';
import {
  getUnreadCount,
  initializeUpdateBadgeRealTime,
} from '../services/inboxModuleApi';
import { badgeManagerService } from '../services/badgeManager';
import ModuleServerApi from './ModuleServerApi';

const ModuleRegistry = window.ModuleRegistry;
const KEYBOARDS_NAMESPACE = 'inbox-keyboard';

export class InboxModule extends BusinessManagerModule {
  moduleParams: TModuleParams;
  translations: Promise<{ [key: string]: string }>;
  moduleServerApi: ModuleServerApi;
  keyboardsConfiguration: IKeyboard[] = [];

  constructor(moduleId: ModuleId) {
    super(moduleId);
    this.appDefId = appDefIds.engage;

    ModuleRegistry.registerComponent(
      INBOX_CONVERSATION_LAZY_COMPONENT_NAME,
      () => withModuleParams(InboxConversationLazyComponent),
    );

    ModuleRegistry.registerComponent(
      INBOX_LAZY_COMPONENT_NAME,
      () => InboxLazyComponent,
    );
    ModuleRegistry.registerComponent(
      SEND_MESSAGE_WIDGET_LAZY_COMPONENT_NAME,
      () => withModuleParams(SendMessageWidgetLazyComponent),
    );
    ModuleRegistry.registerComponent(
      'inbox-settings',
      () => InboxSettingsLazyComponent,
    );

    ModuleRegistry.registerComponent(DOWNLOAD_ONE_APP_MODAL_COMPONENT, () =>
      ReactLoadableComponent(
        DOWNLOAD_ONE_APP_MODAL_COMPONENT,
        () =>
          import(
            '../components/AscendOnboarding/DownloadAppModal/DownloadAppModalLasy'
          ),
      ),
    );

    ModuleRegistry.registerMethod(
      'inbox.getChatAppRegistry',
      () => () => chatAppsRegistry,
    );
    ModuleRegistry.registerMethod(
      'inbox.getUnreadCount',
      () => () => getUnreadCount(),
    );
  }

  init(moduleParams: TModuleParams) {
    this.moduleParams = moduleParams;
    this.moduleServerApi = new ModuleServerApi(
      this.appEssentials.httpClient,
      moduleParams,
    );
    this.translations = this.moduleServerApi.getTranslations(
      moduleParams.accountLanguage,
    );
    this.conductExperiments().then((experiments) => {
      if (experiments.enabled('specs.chat.UnreadMessagesOnSideBarRealTime')) {
        initializeUpdateBadgeRealTime();
      } else if (experiments.enabled('specs.chat.UnreadMessagesOnSideBar')) {
        badgeManagerService.initialize();
      }

      this.moduleServerApi.migrateAsync();

      configModule(
        this.moduleId,
        ModuleId.Triggers,
        this.triggersConfig(experiments),
      );

      configModule(
        this.moduleId,
        ModuleId.Triggers,
        this.triggersVisitorsConfig(),
      );

      registerPageComponentMonitors(PageComponentId.Engage, {
        sentryClient: getSentryInboxClient(),
      });

      registerPageComponentMonitors(PageComponentId.InboxSettings, {
        sentryClient: getSentryInboxSettingsClient(),
      });
    });

    const contactsTabConfig = {
      componentName: INBOX_CONVERSATION_LAZY_COMPONENT_NAME,
      priority: 10,
      shouldRender: () => Promise.resolve(true),
      tabName: 'Inbox', // not being used
    };

    if (moduleParams.liveSite?.isSitePublished && getInstance()) {
      configModule(this.moduleId, ModuleId.Contacts, contactsTabConfig);
    }

    const contactsFullPageTabConfig = {
      componentName: INBOX_CONVERSATION_LAZY_COMPONENT_NAME,
      shouldRender: () => Promise.resolve(true),
      tabName: () =>
        this.translations.then((data) => {
          return data.tab_name;
        }),
      type: 'contact-page-tab-widget',
    };

    configModule(this.moduleId, ModuleId.Contacts, contactsFullPageTabConfig);

    configModule(this.moduleId, 'INBOX_KEYBOARDS' as ModuleId, {
      chatAppsRegistry,
    });
  }

  config(sourceModule: ModuleId, configPayload?: any) {
    if (
      configPayload &&
      configPayload.configNamespace === KEYBOARDS_NAMESPACE
    ) {
      const keyboardConfig = configPayload.keyboardConfig as IKeyboard;

      this.keyboardsConfiguration.push(keyboardConfig);
    }
  }

  triggersConfig = async (experiments: Experiments) => {
    const transData = await this.translations;

    const getActions = async () => {
      const isInstalled = isChatInstalled();
      return isInstalled
        ? {
            'send-message': {
              displayName: transData.send_message_name,
              displayInfo: transData.send_message_info,
              componentName: SEND_MESSAGE_WIDGET_LAZY_COMPONENT_NAME,
              verifyConfig: async ({ actionConfig }) => {
                const { message } = JSON.parse(actionConfig);

                const isMessageInvalid = !message || message.length === 0;
                const isSpecificErrorsEnabled = experiments.enabled(
                  'specs.crm.AutomationsSpecificActionErrors',
                );

                return isMessageInvalid
                  ? isSpecificErrorsEnabled
                    ? Promise.reject(
                        transData['send_message_widget.message.error'],
                      )
                    : false
                  : true;
              },
              generateConfig: async ({ actionComponentInfo }) => {
                const { message, onlyWhenAvailable } = actionComponentInfo;
                return JSON.stringify({
                  message,
                  onlyWhenAvailable,
                });
              },
            },
          }
        : null;
    };

    const getContactMessage = () => {
      return {
        'chatMessage/sentByContact': {
          displayName:
            transData.automation_events_chatMessageSentByContact_name,
          displayDescription:
            transData.automation_events_chatMessageSentByContact_description,
          displayColor: '#2682CD',
          supportsImmediateChat: true,
        },
      };
    };

    return {
      appDefId: this.appDefId,
      appTitle: transData.automation_events_app_title,
      actions: await getActions(),
      events: {
        'chatMessage/sentToContact': {
          displayName:
            transData.automation_events_chatMessageSentToContact_name,
          displayDescription:
            transData.automation_events_chatMessageSentToContact_description,
          displayColor: '#2682CD',
          supportsImmediateChat: false,
        },
        ...getContactMessage(),
      },
      generateEventSchema: () =>
        Promise.resolve({
          summary: {
            displayName:
              transData.automation_events_chatMessageSentToContact_summary,
            type: 'string',
          },
        }),
    };
  };

  triggersVisitorsConfig = async () => {
    const transData = await this.translations;

    return {
      appDefId: appDefIds.chat,
      appTitle: transData.automation_events_visitors_app_title,
      actions: {},
      events: {
        'chatVisitor/visitOnPage': {
          displayName: transData.automation_events_visitOnPage_name,
          displayDescription:
            transData.automation_events_visitOnPage_description,
          providesContactInfo: false,
          displayColor: '#2682CD',
          supportsImmediateChat: true,
          conditions: {
            pageId: {
              displayName:
                transData.automation_events_visitOnPage_choosePageSelectionType,
              optionalConditionHeader:
                transData.automation_events_visitOnPage_choosePage,
              useConditionOptionText:
                transData.automation_events_visitOnPage_choosePage_specificPages,
              dontUseConditionOptionText:
                transData.automation_events_visitOnPage_choosePage_allPages,

              options: async () => {
                const pages = await this.moduleServerApi.getSitePages();
                return pages.pages.reduce(
                  (pagesMap, page) => ({
                    ...pagesMap,
                    [page.id]: page.title,
                  }),
                  {},
                );
              },
            },
          },
          generateEventSchema: () =>
            Promise.resolve({
              visitorId: {
                displayName: transData.automation_events_visitOnPage_visitorId,
                type: 'string',
              },
              pageId: {
                displayName: transData.automation_events_visitOnPage_pageId,
                type: 'string',
              },
              pageName: {
                displayName: transData.automation_events_visitOnPage_pageName,
                type: 'string',
              },
            }),
        },
      },
    };
  };

  async conductExperiments() {
    const experiments = new Experiments({ scope: 'my-account' });
    await experiments.ready();
    return experiments;
  }

  getKeyboardsConfiguration = () => this.keyboardsConfiguration;
}
