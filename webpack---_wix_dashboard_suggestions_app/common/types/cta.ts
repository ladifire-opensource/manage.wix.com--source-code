export type CTA = ActionTargetBizMgrNavigation | ActionTargetExternalUrl | ActionTargetVideo;

export interface ActionTargetBizMgrNavigation {
  type: ActionTargetType.bizMgrNavigation;
  titleKey: string;
  params: NavigateToConfig;
}

export interface ActionTargetExternalUrl {
  type: ActionTargetType.externalUrl;
  titleKey: string;
  params: {
    url: string;
  };
}

export interface ActionTargetVideo {
  type: ActionTargetType.video;
  titleKey: string;
  params: {
    youtubeIdbyLanguage: Record<string, string>;
    modalTitle: string;
  };
}

export enum ActionTargetType {
  bizMgrNavigation = 'bizMgrNavigation',
  video = 'video',
  externalUrl = 'externalUrl',
}

export interface NavigateToConfig {
  pageComponentId: string;
  contextData?: any;
  openInNewTab?: boolean;
}
