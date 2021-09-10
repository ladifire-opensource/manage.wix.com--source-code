export type FeedId = string;
export const allSitesFeedId = (): FeedId => 'all-sites';
export const metaSiteFeedId = (metaSiteId: string): FeedId => `meta-site.${metaSiteId}`;
export const getMetaSiteFromFeedId = (feedId: FeedId): string => feedId && feedId.startsWith('meta-site.') ? feedId.split('.', 2)[1] : null;
