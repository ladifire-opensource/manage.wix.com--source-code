import { isWix } from './utils';

const APIPath = '/_api/cookie-consent-policy/v1/consent-policies';

function getXhrDomainPrefix(baseDomain: string = '') {
  let resDomain;
  if (isWix() || !baseDomain) {
    resDomain = '';
  } else {
    resDomain =
      baseDomain.indexOf('http') === 0 ? baseDomain : `\\\\${baseDomain}`;
  }
  return resDomain;
}

export function getAPIBase(baseUrl: string = '') {
  return `${getXhrDomainPrefix(baseUrl)}${APIPath}`;
}
