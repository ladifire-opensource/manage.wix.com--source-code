import { AmbassadorHTTPError } from '@wix/ambassador/runtime/http';
import { NotificationPriority } from '@wix/ambassador-ping-templates-service/types';
import { PingAutomationNotifyActionConfig } from '@wix/ping-automations-server/api';
import { PingEventInfo, ShoutoutAPI, ShoutoutInfo } from './external-types';
import { KeyedMapping, PingRecommendations, RecipientMapping } from './recommendations-types';

export interface PingPreinstalledAutomationActionConfig {
  pingTemplateId: string;
  pingTemplateIdSaveException?: AmbassadorHTTPError;
  pingTemplateWasCreatedInThisSession?: boolean; // volatile. Saved in backConfig only
  topicFields: KeyedMapping[];
  inputMapping?: string;
  channelDefinitions?: ChannelDefinition[];
  description?: string;
  settingsGroup?: string;
  actionTargetType?: ActionTargetType;
  recipientType?: RecipientMapping['recipientType'];
  recipients?: string[];
  hiddenRecipients?: string[];
  userRecipients?: string[];
  enableAudienceSelection?: boolean;
  priority?: NotificationPriority;
  initiatorType?: InitiatorType;
  initiator?: string;
  iconOrigin?: IconOrigin;
  iconUrl?: string;
  singleDeepLink?: string;
  singleTitle?: string;
  singleBody?: string;
  disableGrouping?: boolean;
  groupingTimeFrame: number;
  groupedDeepLink?: string;
  groupedTitle?: string;
  groupedBody?: string;
  groupedIconOrigin?: IconOrigin;
  groupedIconUrl?: string;
  useUniqueKeys?: boolean;
  kpi?: string;
  templatesMap?: Record<string, string>;
}

export type AutomationActionConfig = PingAutomationNotifyActionConfig | PingPreinstalledAutomationActionConfig;

export const isPreinstallConfig = (config: AutomationActionConfig): config is PingPreinstalledAutomationActionConfig =>
  (config as PingPreinstalledAutomationActionConfig)?.channelDefinitions?.length > 0;

export type InitiatorType = 'WixApp' | 'Member' | 'Contact' | 'User';
type ActionTargetType = 'BusinessManager' | 'Url' | 'LiveSite';
export type IconOrigin = 'URL' | 'AppIcon' | 'Initiator';

export const getRecipientTranslationKey = (key: string, eventInfo: PingEventInfo): string =>
  key && eventInfo.eventId && `${eventInfo.eventId}.recipient.${key}`;

interface ChannelDefinitionBase {
  hidden?: boolean;
  disabled?: boolean;
}

export interface EmailChannelDefinition extends ChannelDefinitionBase {
  channel: 'EMAIL';
  shoutoutApi?: ShoutoutAPI;
  shoutoutInfo: Partial<ShoutoutInfo>;
}

export const isEmailChannel = (c: ChannelDefinition): c is EmailChannelDefinition => c.channel === 'EMAIL';

export interface MobileChannelDefinition extends ChannelDefinitionBase {
  channel: 'MOBILE';
}

export const isMobileChannel = (c: ChannelDefinition): c is MobileChannelDefinition => c.channel === 'MOBILE';

export interface LiveSiteChannelDefinition extends ChannelDefinitionBase {
  channel: 'LIVE_SITE';
}

export const isLiveSiteChannel = (c: ChannelDefinition): c is LiveSiteChannelDefinition => c.channel === 'LIVE_SITE';

export type ChannelDefinition = EmailChannelDefinition | MobileChannelDefinition | LiveSiteChannelDefinition;

export const isChannelActive = (channel: ChannelDefinition) => channel && !channel.hidden;

export const getVisibleChannels = (actionConfig: PingPreinstalledAutomationActionConfig) =>
  actionConfig.channelDefinitions?.filter(isChannelActive) || [];

declare global {
  // noinspection JSUnusedGlobalSymbols
  interface Window {
    __ONE_APP_IS_INSTALLED: boolean;
    __PING_RECOMMENDATIONS: PingRecommendations;
    wixRecorder: any;
  }
}
