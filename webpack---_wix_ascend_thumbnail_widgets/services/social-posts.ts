import {
  Entries,
  PromoteInsightsPublic,
  TargetedActionableIntent,
} from '@wix/ambassador-promote-insights-public/http';
import { appDefIds, getCurrentInstance } from '@wix/business-manager-api';
import { SocialPostTemplate } from './interfaces';

export const SOCIAL_POSTS_BASE_URL = '/_api/promote-insights-public';
const shareItService = PromoteInsightsPublic(SOCIAL_POSTS_BASE_URL, {
  ignoredProtoHttpUrlPart: '/api',
}).ShareItService();

export const getSocialPostTemplates = async (): Promise<
  SocialPostTemplate[]
> => {
  const currentTimeZoneOffsetInHours =
    (new Date().getTimezoneOffset() / 60) * -1;

  const { targetedActionableIntents, entries } = await shareItService({
    Authorization: getCurrentInstance(appDefIds.promoteHome),
  }).getRecommendations({
    diffFromUTC: currentTimeZoneOffsetInHours,
  });

  return parseTemplates(targetedActionableIntents, entries);
};

const parseTemplates = (
  targetedActionableIntents?: TargetedActionableIntent[],
  entries?: Entries[],
): SocialPostTemplate[] => {
  const actionableIntent = getActionableIntent(targetedActionableIntents);
  const entriesTemplates =
    entries?.map((entry) => ({
      thumbnail: entry.presetThumbnail!,
      background: entry.bgUrl!,
      templateId: entry.templateId!,
      presetId: entry.presetId!,
      intentId: entry.intentId!,
    })) ?? [];
  return actionableIntent
    ? [actionableIntent, ...entriesTemplates]
    : entriesTemplates;
};

const getActionableIntent = (
  intents?: TargetedActionableIntent[],
): SocialPostTemplate | undefined => {
  if (intents && intents.length > 0) {
    const template = intents[0].shareItTemplate!;
    const preset = template.presets![0];
    const background = template.metadata!.suggested!.backgrounds![0].data!.url!;
    return {
      thumbnail: preset.thumb!,
      background,
      templateId: template.id!,
      presetId: preset.id!,
      intentId: intents[0].intent!.id!,
    };
  }
};
