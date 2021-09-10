import {Logger} from '../Logger';
import {TIncomingMMGRSettings} from '../MediaFrame/MediaFrame.types';
import {decodeMetaSiteToken} from '../utils/decodeMetaSiteToken';
import {decodeSiteMediaToken} from '../utils/decodeSiteMediaToken';
import {WindowMessenger} from '../WindowMessenger';

function normalize(url: string) {
  const a = document.createElement('a');
  a.href = url;
  return a.href;
}

function getConsentPolicyParams() {
  let consentPolicyParams = '';
  if (window.consentPolicyManager) {
    consentPolicyParams = Object.entries(window.consentPolicyManager._getConsentPolicyHeader())
      .reduce<string[]>((acc, [key, value]) => [...acc, `${key}=${value}`], [])
      .join('&');
  }

  return consentPolicyParams;
}

const buildIframeUrl = (settings: TIncomingMMGRSettings) => {
  const consentPolicyParams = getConsentPolicyParams();

  const commonConfigValue = window.commonConfig ? encodeURIComponent(JSON.stringify(window.commonConfig)) : undefined;
  const commonConfigParam = commonConfigValue ? `&commonConfig=${commonConfigValue}` : '';

  const url = normalize(
    `${settings.mediaGalleryBaseHost}index.html?locale=${settings.i18nCode}${
      consentPolicyParams ? `&${consentPolicyParams}` : ''
    }${commonConfigParam}`,
  );

  if (settings.siteMediaToken) {
    const token = decodeSiteMediaToken(settings.siteMediaToken || '');
    return `${url}&msid=${token.metasiteId}`;
  }

  if (settings.metaSiteToken) {
    const token = decodeMetaSiteToken(settings.metaSiteToken || '');
    return `${url}&msid=${token.metaSiteId}`;
  }

  return url;
};

export function resolveAfterTimeout<T>(promise: Promise<T>): Promise<T | undefined> {
  return Promise.race([promise, new Promise<undefined>(resolve => setTimeout(() => resolve(), 1500))]);
}

export class IFrameManager {
  private iframe?: HTMLIFrameElement;
  private messenger: WindowMessenger = new WindowMessenger();

  constructor(private logger: Logger) {}

  getMessenger() {
    return this.messenger;
  }

  show(settings: any, {displayOnReady}: {displayOnReady: boolean}): Promise<void> {
    const url = buildIframeUrl(settings);

    if (!this.iframe || this.iframe.src !== url) {
      return this.createIframe({appendTo: settings.appendTo, src: url}).then(() =>
        this.show(settings, {displayOnReady}),
      );
    }

    return this.sendSettings(settings).then(() => {
      displayOnReady && this.showIframe();
    });
  }

  hide() {
    if (!this.iframe) {
      return;
    }

    this.messenger.emit('empty');
    this.hideIframe();
  }

  public kill() {
    if (!this.iframe || !this.iframe.parentNode) {
      return;
    }
    this.iframe.parentNode.removeChild(this.iframe);
    this.iframe = undefined;
    document.removeEventListener('consentPolicyChanged', this.handleConsentPolicyChanged);
    this.logger.log('iFrame killed');
  }

  private sendSettings(settings: any) {
    this.messenger.emit('settings', settings);

    return resolveAfterTimeout(
      new Promise(resolve => {
        this.messenger.one('settingsReady', () => {
          this.logger.log('iFrame settings are applied');
          return resolve();
        });
      }),
    );
  }

  private readonly handleConsentPolicyChanged = () => {
    if (!window.consentPolicyManager) {
      return;
    }

    const updatedPolicy = window.consentPolicyManager.getCurrentConsentPolicy().policy;
    this.messenger.emit('consentPolicyChanged', updatedPolicy);
  };

  private createIframe({appendTo = 'body', src}: {appendTo?: string; src: string}) {
    if (this.iframe) {
      this.kill();
    }

    this.iframe = document.createElement('iframe');
    this.iframe.id = 'mediaGalleryFrame';
    this.iframe.style.border = 'none';
    this.hideIframe();
    this.iframe.src = src;

    const parent = document.querySelector(appendTo);
    if (!parent) {
      throw new Error(`Cannot find element by selector '${appendTo}'`);
    }
    parent.appendChild(this.iframe);
    this.logger.log('iFrame created', this.iframe);
    if (this.iframe.contentWindow) {
      this.messenger.setTarget(this.iframe.contentWindow);
    }
    document.addEventListener('consentPolicyChanged', this.handleConsentPolicyChanged);

    return new Promise(resolve => {
      this.messenger.one('ready', () => {
        this.logger.log('iFrame is ready');
        resolve();
      });
    });
  }

  private hideIframe() {
    if (this.iframe) {
      this.iframe.style.display = 'none';
    }
  }

  private showIframe() {
    if (this.iframe) {
      this.iframe.style.display = 'block';
      if (this.iframe.contentWindow) {
        this.iframe.contentWindow.focus();
      }
    }
  }
}
