import { MethodFn } from "yoshi-flow-bm-runtime";
import {getCurrentInstance} from "@wix/business-manager-api";

const rtssBmShowSyncDialogMehthod: MethodFn = (
    flowAPI,
    options: {
        metaSiteId: string;
        onSuccess?: () => void;
        environment?: 'local' | 'staging' | 'production'
    }
) => {
    const metaSiteId = options.metaSiteId;
    const onSuccess = options.onSuccess;
    const environment = options.environment ?? 'production';

    const syncProviderProductsModalUrl = (() => {

        switch (environment) {
            case 'local': return `http://devzai.wix.com/devzai-ready-to-sell-stores/sync-provider-products`;
            case 'staging': return `https://www.wix.com/ready-to-sell-stores-staging/sync-provider-products`;
            default: return `https://www.wix.com/ready-to-sell-stores/sync-provider-products`;
        }
    })();

    const iframeWrapperElement = document.createElement('div');

    Object.assign(iframeWrapperElement.style, {
        position: 'fixed',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        transition: 'background .2s cubic-bezier(.23,1,.32,1)',
        border: '0',
        zIndex: '9999999'
    });

    const iframeElement = document.createElement('iframe');

    Object.assign(iframeElement.style, {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        border: '0',
        visibility: 'hidden'
    });

    iframeElement.setAttribute('frameborder', '0');
    iframeElement.setAttribute('scrolling', 'no');
    iframeElement.setAttribute('allowTransparency', 'true');
    iframeElement.setAttribute('src', syncProviderProductsModalUrl + `?metaSiteId=${metaSiteId}&instance=${getCurrentInstance('1380b703-ce81-ff05-f115-39571d94dfcd')}`);

    iframeElement.onload = () => {
        Object.assign(iframeElement.style, {
            visibility: 'visible'
        });
    }

    iframeWrapperElement.appendChild(iframeElement);

    iframeWrapperElement.onclick = () => {
        closeWindow();
    }

    document.body.appendChild(iframeWrapperElement);

    const closeWindow = () => {
        document.body.removeChild(iframeWrapperElement);

        window.removeEventListener('message', messageEventListener)
    }

    setTimeout(() => {
        Object.assign(iframeWrapperElement.style, {
            backgroundColor: 'rgba(22,45,61,.66)'
        });
    }, 0)

    const messageEventListener = (event: MessageEvent) => {

        if (event.source === iframeElement.contentWindow) {
            if (event.data === 'success') {
                closeWindow();

                onSuccess?.();
            } else if (event.data === 'close') {
                closeWindow();
            }
        }
    }

    window.addEventListener('message', messageEventListener)
};

export default rtssBmShowSyncDialogMehthod;