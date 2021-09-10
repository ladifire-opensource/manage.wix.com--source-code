import { ReactLazyComponent } from 'react-module-container';
import { WEBHOOKS_ACTION_COMPONENT } from "./config";

export class WebhooksActionLazyComponent extends ReactLazyComponent {
    static readonly debugFiles = [
        'webhooks-action.bundle.js',
        'webhooks-action.css',
    ];
    static readonly minifiedFiles = [
        'webhooks-action.bundle.min.js',
        'webhooks-action.min.css',
    ];

    constructor(props) {
        super(props, {
            files: WebhooksActionLazyComponent.getFiles(props),
            component: WEBHOOKS_ACTION_COMPONENT,
        });
    }

    static getFiles(props) {
        const files = props.debug
            ? WebhooksActionLazyComponent.debugFiles
            : WebhooksActionLazyComponent.minifiedFiles;

        return files.map(relativePath => `${props.config.topology.webhooksActionStaticsUrl}${relativePath}`);
    }
}