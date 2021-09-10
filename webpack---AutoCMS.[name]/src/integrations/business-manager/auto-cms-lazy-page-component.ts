import {ModuleRegistry, ReactLazyComponent} from 'react-module-container';

import EXTERNALS_CONFIG from '../../../externals/config.json';

import APP_CONFIG from './config.json';

import {isProduction} from '@/utils/webpack-env';

export class AutoCMSLazyPageComponent extends ReactLazyComponent<any> {
    constructor(props: any) {
        const editorDeps = props.viewMode === 'editor' ? [
            `${props.config.topology.staticsBaseUrl}/services/js-platform-editor-sdk/${APP_CONFIG.JS_PLATFORM_EDITOR_VERSION}/lib/editorSDK.min.js`
        ] : [];

        const styleDeps = isProduction ? [
            `${props.config.topology.autoCmsStaticsUrl}${APP_CONFIG.AUTO_CMS_PAGE_COMPONENT}.bundle.css`
        ] : [];

        super(props, {
            files: [
                [
                    ...editorDeps,
                    'https://static.parastorage.com/unpkg/@wix/wix-base-ui@3.0.0/dist/base-ui.js',
                    `${props.config.topology.autocmsServicesUrl}autocmsServices.js`,
                    `${props.config.topology.autocmsServicesUrl}autocmsServices.css`,
                    `${props.config.topology.autoCmsStaticsUrl}${EXTERNALS_CONFIG.AUTO_CMS_EXTERNALS}.js`,
                    `${props.config.topology.autoCmsStaticsUrl}${APP_CONFIG.AUTO_CMS_PAGE_COMPONENT}.js`,
                    ...styleDeps
                ]
            ],
            component: APP_CONFIG.AUTO_CMS_PAGE_COMPONENT,
            resolve: async () => {
                const experiments = await ModuleRegistry.invoke('auto-cms.getActiveExperiments');
                return {experiments};
            }
        });
    }
}
