import {
  LocalStorageCachedCapsule,
  WixStorageStrategy,
  BaseStorage,
  LocalStorageStrategy,
  DataCapsule,
} from 'data-capsule';

import { IStorageService, IStorageOptions, StorageLocationType } from '../types/types';

// TODO: add `signedInstance` to WixStorageStrategy typings
const WixStorageStrategyLocal: any = WixStorageStrategy;

export class StorageService implements IStorageService {
  remoteStorage: BaseStorage;
  localStorage: BaseStorage;
  constructor(scope: string, signedInstance: string) {
    this.remoteStorage = LocalStorageCachedCapsule({
      remoteStrategy: new WixStorageStrategyLocal({
        signedInstance,
      }),
      scope,
      namespace: 'analytics',
    });
    this.localStorage = new DataCapsule({
      strategy: new LocalStorageStrategy(),
      scope,
      namespace: 'analytics',
    });
  }
  set<dataType>(key: string, data: dataType, options: IStorageOptions): Promise<void> {
    const { expirationInSeconds } = options;

    const storage: BaseStorage = this._getStorage(options);
    return storage.setItem(key, data, {
      expiration: expirationInSeconds,
    });
  }
  get<dataType>(key: string, options: IStorageOptions): Promise<dataType> {
    const storage: BaseStorage = this._getStorage(options);
    return storage.getItem(key).catch(() => null);
  }
  _getStorage(options: IStorageOptions): BaseStorage {
    const { storageType } = options;
    let baseStorage: BaseStorage;
    if (storageType === StorageLocationType.Local) {
      baseStorage = this.localStorage;
    } else {
      baseStorage = this.remoteStorage;
    }
    return baseStorage;
  }
}
