import { HOSTS_API, HOST_NAMES } from '../consts/consts';
import { xhrGeneric } from '../utils/xhr';
import { log, error } from '../utils/logger';
import { handleEmbedsResponse } from './hostApiHandlers';
import { Category } from '../types';

function getHostTags(hostName: string, categories?: Category[]) {
  if (hostName && HOST_NAMES.hasOwnProperty(hostName)) {
    const uri = `${HOSTS_API}${hostName}`;
    xhrGeneric(
      uri,
      (response: string) => {
        handleEmbedsResponse(response);
      },
      () => {
        error(`Error loading tags for host ${hostName}`);
      },
      {
        query: { categories },
      },
    );
  } else {
    const message = `Hostname: ${hostName} not listed`;
    log(message);
    return new Error(message);
  }
}

export { getHostTags };
