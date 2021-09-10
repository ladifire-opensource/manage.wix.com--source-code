import {IFrameManager} from '../IFrameManager';
import {Logger} from '../Logger';
import {WindowMessenger} from '../WindowMessenger';
import {EventHandler, EventName} from '../WindowMessenger/WindowMessenger.types';
import {TIncomingMMGRSettings} from './MediaFrame.types';

export class MediaFrame {
  public version: string = window.__CI_APP_VERSION__;
  private iframeManager: IFrameManager;
  private messenger: WindowMessenger;
  private logger = new Logger('MediaFrame');

  constructor(public defaultSettings: Partial<TIncomingMMGRSettings>) {
    this.iframeManager = new IFrameManager(this.logger);
    this.messenger = this.iframeManager.getMessenger();
    this.on('close', this.close.bind(this));
    this.on('items', this.close.bind(this));
  }

  on(event: EventName, fn: EventHandler) {
    this.messenger.on(event, fn);
    return this;
  }

  one(event: EventName, fn: EventHandler) {
    this.messenger.one(event, fn);
    return this;
  }

  off(event: EventName, fn: EventHandler) {
    this.messenger.off(event, fn);
    return this;
  }

  open(settings: TIncomingMMGRSettings) {
    settings = this.__mergeDefaultSettings(settings);
    this.logger.log('show with settings', settings);

    this.iframeManager.show(settings, {displayOnReady: true});

    return this;
  }

  warmup(settings: TIncomingMMGRSettings) {
    const clonedSettings = this.__mergeDefaultSettings({
      siteMediaToken: null,
      ...settings,
      path: 'empty',
    });

    this.iframeManager.show(clonedSettings, {displayOnReady: false});

    return this;
  }

  close() {
    this.iframeManager.hide();
    return this;
  }

  kill() {
    this.iframeManager.kill();
  }

  empty() {
    this.messenger.emit('empty');

    return this;
  }

  private __mergeDefaultSettings(settings: Partial<TIncomingMMGRSettings>): TIncomingMMGRSettings {
    settings = {...this.defaultSettings, ...settings};

    if (settings.versionDefaults && settings.version && !settings.versionDefaults.hasOwnProperty(settings.version)) {
      const supportedVersions = Object.keys(settings.versionDefaults);
      throw new Error(`Invalid version. It should be one of ${supportedVersions.join(' | ')}`);
    }
    const defaults = settings.versionDefaults && settings.version ? settings.versionDefaults[settings.version] : {};
    return {
      ...defaults,
      ...settings,
    } as TIncomingMMGRSettings;
  }
}
