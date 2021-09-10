import { MethodFn } from 'yoshi-flow-bm-runtime';
import { getSiteProperties } from '../api/sitePropertiesApi';

export const hasInvoicePreconditons = async (
): Promise<boolean> => {
  const siteProperties = await getSiteProperties();

  return !!siteProperties.properties?.email
};

const exportedHasInvoicePreconditons: MethodFn = () => {
  return hasInvoicePreconditons();
};

export default exportedHasInvoicePreconditons;
