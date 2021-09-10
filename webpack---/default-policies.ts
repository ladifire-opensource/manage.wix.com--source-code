import { ConsentPolicy } from './index';

//The default Policy outside the the regulation zone
export const DEFAULT_POLICY: ConsentPolicy = {
  essential: true,
  functional: true,
  analytics: true,
  advertising: true,
  dataToThirdParty: true,
};

//The default Wix domain policy in the EU
export const WIX_EU_POLICY: ConsentPolicy = {
  essential: true,
  functional: true,
  analytics: true,
  advertising: false,
  dataToThirdParty: false,
};
