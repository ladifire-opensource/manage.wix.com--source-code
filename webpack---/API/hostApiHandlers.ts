import { HostTagsResponse } from '../types';
import { tryParse } from '../utils/tryParse';
import { applyHostEmbeds } from '../modules/hostEmbedder';
import { log, error } from '../utils/logger';
import { updateConsentCategories, setConfig } from '../modules/stateCache';

export function handleEmbedsResponse(responseText: string) {
  const embedsData: HostTagsResponse = tryParse(responseText);
  if (embedsData.errors && embedsData.errors.length > 0) {
    error(JSON.stringify(embedsData.errors));
  }
  if (embedsData.config) {
    updateConsentCategories(embedsData.config.consentPolicy);
    setConfig(embedsData.config);
  }
  if (embedsData.tags) {
    applyHostEmbeds(embedsData.tags);
  } else {
    log('No embeds found to load');
  }
}
