import { useContext } from 'react';

import { IServices } from './types';
import { ServicesContext } from './context';

export function useService<K extends keyof IServices>(key: K) {
  const di = useContext(ServicesContext);

  if (!di.hasOwnProperty(key)) {
    throw new Error(`Service '${key}' is not defined.`);
  }

  return di[key];
}
