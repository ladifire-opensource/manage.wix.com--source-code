import type { BusinessManagerEnvironment } from './types';
import { BusinessManagerEssentials } from './api';

type PublicMembers<T> = { [K in keyof T]: T[K] };
type IBusinessManagerEssentials = PublicMembers<BusinessManagerEssentials>;

class NoInitCalledError extends Error {
  constructor() {
    super('please call init before using the essentials');
    this.name = 'NoInitCalledError';
  }
}
class DuplicateInitError extends Error {
  constructor() {
    super('do not call init twice, init was already called');
    this.name = 'DuplicateInitCallError';
  }
}

/*
  This "Box" serves as our facade for the BM platform.
  It exists only so they can
  import { essentials, init } from '@wix/fe-essentials-busines-manager';
  and have `essentials` just work after calling `init({...})`.

  Partly explained here:
  https://github.com/wix-private/fe-essentials/pull/83#issuecomment-788682246
*/
class BusinessManagerEssentialsBox implements IBusinessManagerEssentials {
  private _essentials: BusinessManagerEssentials | null = null;

  private init(env: BusinessManagerEnvironment) {
    if (this._essentials) {
      throw new DuplicateInitError();
    }

    this._essentials = new BusinessManagerEssentials(env);
  }

  private reset() {
    this._essentials = null;
  }

  get createFedopsLogger() {
    if (!this._essentials) {
      throw new NoInitCalledError();
    }
    return this._essentials.createFedopsLogger;
  }

  get sentry() {
    if (!this._essentials) {
      throw new NoInitCalledError();
    }

    return this._essentials.sentry;
  }

  get biLoggerFactory() {
    if (!this._essentials) {
      throw new NoInitCalledError();
    }

    return this._essentials.biLoggerFactory;
  }

  get experiments() {
    if (!this._essentials) {
      throw new NoInitCalledError();
    }

    return this._essentials.experiments;
  }

  get createI18n() {
    if (!this._essentials) {
      throw new NoInitCalledError();
    }
    return this._essentials.createI18n;
  }

  get createAppEssentials() {
    if (!this._essentials) {
      throw new NoInitCalledError();
    }

    return this._essentials.createAppEssentials.bind(this._essentials);
  }
}

const essentialsBox = new BusinessManagerEssentialsBox();

export const essentials: IBusinessManagerEssentials = essentialsBox;

// @ts-expect-error we want init to be private only for the end user of essentials
export const init = essentialsBox.init.bind(essentials);

// @ts-expect-error we want reset to be private only for the end user of essentials
export const reset = essentialsBox.reset.bind(essentials);
