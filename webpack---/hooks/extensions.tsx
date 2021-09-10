import {
  getHostContainer,
  getModule,
  Extension,
  HostContainerConfig,
  ModuleId,
} from '@wix/business-manager-api';
import { useCallback, useState } from 'react';
import { WidgetComponentClass } from '@types';

const moduleExtensionsCache = {
  get: (hostId: string): Extension<any>[] =>
    (getModule(ModuleId.Home) as any).extensionsCache[hostId],
  set: (hostId: string, extensions: Extension<any>[]) =>
    ((getModule(ModuleId.Home) as any).extensionsCache[hostId] = extensions),
};

export const useExtensions = <T extends {}>(hostId: string, hostingApiEnabled?: boolean) => {
  const prepareExtension = useCallback(() => {
    if (!hostingApiEnabled) {
      return Promise.resolve([]);
    }
    return getHostContainer<HostContainerConfig<T>>(hostId)
      .getExtensions()
      .then(extensions => moduleExtensionsCache.set(hostId, extensions));
  }, [hostId, hostingApiEnabled]);

  const [myPromise] = useState(prepareExtension);

  if (!hostingApiEnabled) {
    return [];
  }

  const registeredExtensions = moduleExtensionsCache.get(hostId);
  if (!registeredExtensions) {
    throw myPromise;
  }

  return registeredExtensions;
};
