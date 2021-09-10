import { find, get } from 'lodash';

import { ICreateOptions, IOption } from './types';

export const getValue = <T extends IOption = IOption>(options: ICreateOptions<T>) => (
  id: T['id'],
): T['value'] => {
  const option = find(options(), { id });

  return get(option, ['value']);
};
