import {
    BusinessManagerModule,
    ModuleId,
    PageComponentId,
    TModuleParams,
    registerModule,
    registerPageComponentMonitors
} from '@wix/business-manager-api';
import * as Sentry from '@sentry/browser';
import {ModuleRegistry} from 'react-module-container';

import {registerEmbedAutoCMSMethod} from '../embedded-view/bm-embedded-view';

import {AutoCMSLazyPageComponent} from './auto-cms-lazy-page-component';
import {CollectionsViewLazyPageComponent} from './collection-view-lazy-page-component';
import APP_CONFIG from './config.json';

import {sentryHub} from '@/monitorings/sentry/sentry-hub';
import {fetchExperiments} from '@/experiments/fetch';

registerModule(
    APP_CONFIG.MODULE_ID as ModuleId,
    class extends BusinessManagerModule {
        constructor(moduleId: ModuleId) {
            super(moduleId);

            this.registerComponentWithModuleParams(
                APP_CONFIG.AUTO_CMS_LAZY_PAGE_COMPONENT,
                AutoCMSLazyPageComponent
            );

            this.registerComponentWithModuleParams(
                APP_CONFIG.COLLECTION_VIEW_LAZY_PAGE_COMPONENT,
                CollectionsViewLazyPageComponent
            );
        }

        private initSentry = (
            userId: string,
            metaSiteId: string,
            viewMode: string,
            accountLanguage: string
        ) => {
            const appMode = viewMode === 'dashboard' ? 'business-manager' : viewMode;

            sentryHub.configureScope(scope => {
                scope.setUser({id: userId});

                const tags: Record<string, string> = {
                    msid: metaSiteId,
                    mode: appMode
                };

                if (viewMode) {
                    tags.viewMode = viewMode;
                }

                if (accountLanguage) {
                    tags.locale = accountLanguage;
                }

                scope.setTags(tags);
            });

            const sentryClient = sentryHub.getClient<Sentry.BrowserClient>();

            if (sentryClient) {
                registerPageComponentMonitors(
                    PageComponentId.WixCodeDatabase,
                    {sentryClient}
                );
            }
        };

        public register() {
            registerEmbedAutoCMSMethod();
        }

        public init({
            userId,
            viewMode,
            metaSiteId,
            accountLanguage
        }: TModuleParams) {
            ModuleRegistry.registerMethod('auto-cms.getActiveExperiments', () => fetchExperiments);
            this.initSentry(userId, metaSiteId, viewMode, accountLanguage);
        }
    }
);
