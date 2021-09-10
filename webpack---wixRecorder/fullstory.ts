import * as FullStory from '@fullstory/browser';
import { getUserInfo } from '@wix/toolbelt';
import Emitter from './emitter';
import { conductExperiment } from './experiments';

type FullstoryOptions = {
  onReady: () => void;
  sample?: number;
  smallApp?: boolean;
};

const WIX_ORG_ID = '11CC00';

export default class FullstoryLoader {
  private isChild = window !== window.top;
  private emitter = new Emitter();
  private _isLoaded = false;
  private sessionUrl = '';

  // eslint-disable-next-line
  constructor(private readonly options: FullstoryOptions) {
    window._fs_ready = () => this.onFsReady();
  }

  async getCurrentSessionUrl(): Promise<string> {
    return this.sessionUrl;
  }

  private onFsReady() {
    this._isLoaded = true;
    this.options.onReady && this.options.onReady();
    this.sendUserDetails();
    this.sessionUrl = FullStory.getCurrentSessionURL(true) as string;
  }

  private isLoaded() {
    return this._isLoaded;
  }

  private async sendUserDetails() {
    const userId = getUserInfo().id;

    if (userId) {
      FullStory.identify(userId);
    }
  }

  addCustomAttribute(key: string, value: string | string[]) {
    this.isLoaded() && FullStory.event('wix recorder custom attribute', { [key]: value });
  }

  private async shouldTopFrameRecord(): Promise<boolean> {
    const mustRecord =
      window.location.toString().indexOf('alwaysgb') !== -1 || this.sample();

    if (mustRecord) {
      return true;
    }

    if (window === window.top) {
      return this.options.smallApp
        ? this.conductSmallAppExperiment()
        : conductExperiment('specs.fedinfra.Glassbox');
    }

    return false;
  }

  private sample() {
    const sample = this.options.sample;
    return sample && Math.random() < sample && !getUserInfo().id;
  }

  private async conductSmallAppExperiment(): Promise<boolean> {
    return conductExperiment('specs.fedinfra.GlassboxSmallApp');
  }

  private isContainerRecording(): Promise<boolean> {
    return new Promise((resolve) => {
      let numberOfRetries = 0;
      const MAX_NUMBER_OF_RETRIES = 5;

      const ping = () => {
        if (numberOfRetries !== MAX_NUMBER_OF_RETRIES) {
          this.emitter.emit('WIX_FULLSTORY_PING', '.', window.parent);
          numberOfRetries++;
          timeout = setTimeout(ping, 1000);
        }
      };

      let timeout = setTimeout(ping, 0);

      // in case top frame already records or we force & got pong later on
      this.emitter.listenOnce('WIX_FULLSTORY_PONG', () => {
        clearTimeout(timeout);
        resolve(true);
      });
    });
  }

  private forceRecording() {
    this.emitter.emit('WIX_FULLSTORY_FORCE_RECORD', '', window.parent);
  }

  private setupForceListeners() {
    this.emitter.listen('WIX_FULLSTORY_FORCE_RECORD', async () => {
      if (!(await this.conductSmallAppExperiment())) {
        return;
      }

      // load fullstory in parent frame
      this.load();

      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < window.frames.length; i += 1) {
        const frame = window.frames[i];
        this.emitter.emit('WIX_FULLSTORY_PONG', '', frame);
      }
    });
  }

  private listenPingAndReplyPong() {
    this.emitter.listen('WIX_FULLSTORY_PING', (e, payload) => {
      if (this.isChild) {
        this.emitter.emit('WIX_FULLSTORY_PING', payload, window.parent);
      }

      this.emitter.emit('WIX_FULLSTORY_PONG', '', e.source as Window, e.origin);
    });
  }

  private loadAndListen() {
    this.load();
    this.listenPingAndReplyPong();
  }

  private load() {
    FullStory.init({
      orgId: WIX_ORG_ID,
      recordCrossDomainIFrames: true,
    });
  }

  async forceLoadFullstory() {
    if (!this.isChild && !this.isLoaded()) {
      this.loadAndListen();
    }
  }

  async setup() {
    if (this.isChild) {
      if (this.options.smallApp) {
        this.forceRecording();
      }

      if (await this.isContainerRecording()) {
        this.loadAndListen();
      }
    } else {
      this.setupForceListeners();

      const startFullstory = await this.shouldTopFrameRecord().catch(
        () => false,
      );

      if (startFullstory) {
        this.loadAndListen();
      }
    }
  }
}
