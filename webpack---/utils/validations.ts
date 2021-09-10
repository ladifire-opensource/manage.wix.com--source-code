import { isValidPingAutomationNotifyActionConfig } from '@wix/ping-automations-server/validators';
import { AutomationActionConfig, ChannelDefinition, getVisibleChannels, isEmailChannel, isPreinstallConfig, PingPreinstalledAutomationActionConfig } from '../types';

function reportError(error: string): false {
  if (window['LOG_PING_VALIDATIONS']) {
    // tslint:disable-next-line:no-console
    console.error('Validation Error: ', error);
  }
  return false;
}

function isValidPreinstallConfig(config: PingPreinstalledAutomationActionConfig) {
  if (!config.description) {
    return reportError('Missing template ID');
  }

  if (config.description !== getValidTemplateId(config.description)) {
    return reportError('Invalid template ID');
  }

  if (!config.settingsGroup) {
    return reportError('Missing settings group');
  }

  if (!config.recipientType) {
    return reportError('Missing recipient type');
  }

  if (!config.recipients?.[0]) {
    return reportError('Missing recipients');
  }

  if (config.hiddenRecipients && config.recipients.every(r => config.hiddenRecipients.includes(r))) {
    return reportError('Missing non-hidden recipients');
  }

  if (config.userRecipients && config.userRecipients.length === 0) {
    return reportError('User recipients list is empty');
  }

  const visibleChannels = getVisibleChannels(config);
  if (visibleChannels.length === 0) {
    return reportError('Empty channelDefinitions');
  }

  const emailChannels = visibleChannels.filter(isEmailChannel);
  if (emailChannels.some(c => !c.shoutoutInfo || !c.shoutoutInfo.templateId)) {
    return reportError('Missing shoutout template id');
  }

  if (visibleChannels.some(c => c.channel === 'MOBILE' || c.channel === 'LIVE_SITE') && !config.singleBody) {
    return reportError('Missing mobile push title');
  }

  return true;
}

export const getValidTemplateId = v => v.substr(0, 40).replace(/[^a-zA-Z0-9_\\.]/g, '_'); // https://github.com/wix-private/wixos/pull/12417/files#diff-2cdc3450770fea416a9b9d59de7a49d17cc51b8b3bf0c29523fc414edcfae590R83

export const isPMEmailChannelsLoaded = (channelDefinitions: ChannelDefinition[]) =>
  !channelDefinitions || channelDefinitions.every(d => d.channel !== 'EMAIL' || d.hidden || d.shoutoutApi?.save);

export const isConfigValid = (config: AutomationActionConfig) =>
  isPreinstallConfig(config) ? isValidPreinstallConfig(config) : isValidPingAutomationNotifyActionConfig(config);
