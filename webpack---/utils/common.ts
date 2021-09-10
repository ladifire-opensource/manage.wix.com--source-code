import { ConnectFieldType } from '../types/api/metadata-v1';
import { InputStatus } from 'wix-style-react';
import { AxiosError } from 'axios';

export function callWithFallback(fn, fallbackValue) {
  try {
    return fn();
  } catch {
    return fallbackValue;
  }
}

const accountInformationFieldPresence = {
  [ConnectFieldType.STRING]: value => !Boolean(value),
  [ConnectFieldType.CHECKBOX]: () => false,
  [ConnectFieldType.DROPDOWN]: value => !Boolean(value),
  [ConnectFieldType.RICH_TEXT]: value => !Boolean(value) && value === '<p></p>',
};

const accountInformationFieldValidators = {
  [ConnectFieldType.STRING]: (value, { validationPattern }) => {
    if (!validationPattern) {
      return true;
    }
    const regExp = new RegExp(validationPattern);
    return regExp.test(value);
  },
};

export const isFieldValid = (fieldType, value, params = {}) => {
  const validator = accountInformationFieldValidators[fieldType];
  return validator ? validator(value, params) : true;
};

export const isFieldsEmpty = (fields: any) => {
  return !Object.keys(fields || {}).some(key => {
    return fields[key] instanceof Object ? !isFieldsEmpty(fields[key]) : Boolean(fields[key]);
  });
}

export const isFieldEmpty = (fieldType, value) => {
  const presenceValidator = accountInformationFieldPresence[fieldType];
  return presenceValidator ? presenceValidator(value) : false;
};

export const errorStatus = hasError => (hasError ? ('error' as InputStatus) : undefined);

type GetDynamicPluralKeyAndDataParams = {
  keyPrefix: string;
  items: any[];
  itemPrefix?: string;
  limit?: number;
  showOthers?: boolean;
};
export const getDynamicPluralKeyAndData = ({
  keyPrefix,
  items,
  itemPrefix = 'item',
  limit = 5,
  showOthers = false,
}: GetDynamicPluralKeyAndDataParams) => {
  const data = items.reduce(
    (acc, item, index) => ({
      ...acc,
      [`${itemPrefix}${index + 1}`]: item,
    }),
    [],
  );
  let count: string | number = items.length;
  if (count > limit) {
    count = showOthers ? `${limit + 1}plus` : limit;
  }
  return {
    key: `${keyPrefix}${count}`,
    data,
  };
};

export type AxiosErrorWithRetries = AxiosError & {
  retriesDone: number;
};
export const withRetries = (fn: () => Promise<any>, retriesLeft, totalRetries = retriesLeft) => {
  return fn().catch(e => {
    if (retriesLeft > 0) {
      return withRetries(fn, retriesLeft - 1, totalRetries);
    }
    e.retriesDone = totalRetries;
    return Promise.reject(e);
  });
};

export function delay(ms) {
  return new Promise(function(resolve) {
    setTimeout(resolve, ms)
  });
}
