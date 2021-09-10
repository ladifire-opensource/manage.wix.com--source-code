import React from 'react';
import {render} from 'react-dom';
import {ModuleRegistry} from 'react-module-container';

import BM_APP_CONFIG from '../business-manager/config.json';

import EMBED_APP_CONFIG from './config.json';

import {EmbedConfiguration} from '@/configuration';
import {HistoryType} from '@/utils';

export interface EmbedAutoCMSProps {
    historyType?: HistoryType;
    node?: HTMLElement;
    configuration?: EmbedConfiguration;
}

export const embedAutoCMSInBM = ({
    historyType = 'memory',
    node,
    configuration
}: EmbedAutoCMSProps) => {
    const AutoCMSPageComponent = ModuleRegistry.component(
        BM_APP_CONFIG.AUTO_CMS_LAZY_PAGE_COMPONENT
    );

    if (!AutoCMSPageComponent) {
        throw new Error('AutoCMSPageComponent is undefined');
    }

    if (!node) {
        throw new Error('Node to render AutoCMSPageComponent is undefined.');
    }

    render(React.createElement(AutoCMSPageComponent, {historyType, configuration, isEmbed: true}), node);
};

export const registerEmbedAutoCMSMethod = () =>
    ModuleRegistry.registerMethod(
        EMBED_APP_CONFIG.AUTO_CMS_EMBED,
        () => (props: EmbedAutoCMSProps) => {
            embedAutoCMSInBM(props);
        }
    );
