const getDecodedInstance = (instance) => {
  try {
    const separatorIndex: number = instance.indexOf('.');
    const encodedInstance = instance.substring(separatorIndex + 1);
    return JSON.parse(atob(encodedInstance));
  } catch (e) {
    throw new Error('Invalid `instance`');
  }
};

const getInstanceValue = (instance, key) => {
  return getDecodedInstance(instance)[key] || undefined;
};

export const getVendorProductId = (instance: string) => {
  return getInstanceValue(instance, 'vendorProductId');
};
