import {ReactLazyComponent} from 'react-module-container';

import APP_CONFIG from './config.json';

export class CollectionsViewLazyPageComponent extends ReactLazyComponent<any> {
    constructor(props: any) {
        super(props, {
            files: [
                [
                    'https://static.parastorage.com/unpkg/ag-grid-enterprise@16.0.1/dist/ag-grid-enterprise.min.noStyle.js',
                    'https://static.parastorage.com/unpkg/codemirror@5.30.0/lib/codemirror.js',
                    'https://static.parastorage.com/unpkg/codemirror@5.30.0/mode/xml/xml.js',
                    'https://static.parastorage.com/unpkg/codemirror@5.30.0/mode/javascript/javascript.js',
                    'https://static.parastorage.com/unpkg/codemirror@5.30.0/addon/lint/lint.js',
                    'https://static.parastorage.com/unpkg/codemirror@5.30.0/addon/fold/foldcode.js',
                    'https://static.parastorage.com/unpkg/codemirror@5.30.0/addon/fold/foldgutter.js',
                    'https://static.parastorage.com/unpkg/codemirror@5.30.0/addon/fold/brace-fold.js',
                    'https://static.parastorage.com/unpkg/codemirror@5.30.0/addon/edit/matchbrackets.js',
                    'https://static.parastorage.com/unpkg/@wix/wix-base-ui@3.0.0/dist/base-ui.js',
                    'https://static.parastorage.com/unpkg/@wix/wix-richtext@3.258.0/dist/bundleWixRichText.js',
                    'https://static.parastorage.com/unpkg/@wix/wix-base-ui@3.0.0/dist/base-ui.js',
                    `${props.config.topology.wixDatabasesStaticsUrl}statics/${APP_CONFIG.COLLECTION_VIEW_PAGE_COMPONENT}.js`
                ],
                `${props.config.topology.wixDatabasesStaticsUrl}statics/${APP_CONFIG.COLLECTION_VIEW_PAGE_COMPONENT}.css`
            ],
            component: APP_CONFIG.COLLECTION_VIEW_PAGE_COMPONENT
        });
    }
}
