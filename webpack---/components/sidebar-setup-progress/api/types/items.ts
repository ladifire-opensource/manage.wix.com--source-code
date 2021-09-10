export interface ItemsDto {
  [realEstateId: string]: IItem[];
}

export interface ProgressBarDefinition {
  titleKey: string;
  happyMomentTitleKey: string;
  happyMomentDescriptionKey: string;
  happyMomentCtaKey: string;
}

export enum SectionType {
  COUNTED = 'counted',
  INFINITE = 'infinite',
}

export interface RealEstateDefinition {
  id: string;
  titleKey: string;
  type: SectionType;
  subtitleKey?: string;
  progressBar?: ProgressBarDefinition;
}

export enum EBadge {
  PREMIUM = 'fullpurple',
  STANDARD = 'fullblue',
}

export interface IItem {
  id: string;
  title: string;
  name: string | undefined;
  description: string;
  badge: EBadge;
  thumbnailUrl: string;
  actionLabel: string;
  actionTarget: IActionTarget;
  order: number;
  orderInCategory: number;
  isCompleted: boolean;
  estimatedTime: string;
  mandatory: boolean;
  sectionId: string;
  isSkipped: boolean;
  isPermitted: boolean;
  realEstateId: string | undefined;
  categoryId: string;
}

export interface IData {
  [key: string]: IItem;
}

export type TSortedIds = string[];

export interface ISortedIdsByType {
  [realEstateId: string]: TSortedIds;
}

export interface IDataSet {
  sortedIds: ISortedIdsByType;
  data: IData;
}

export type TTarget = object | string | IVideoCTA;

export interface IActionTarget {
  type: ActionTypes;
  target: TTarget;
}

export interface IYoutubeIdByLanguage {
  [key: string]: string;
}

export interface IVideoCTA {
  title: string;
  subtitle: string;
  actionLabel: string;
  youtubeIdByLanguage: IYoutubeIdByLanguage;
  actionTarget: IActionTarget;
}

export enum ActionTypes {
  bizMgrNavigation = 'bizMgrNavigation',
  video = 'video',
  externalUrl = 'externalUrl',
}

export interface ISkippedAndCompletedCount {
  skippedSteps: number;
  completedSteps: number;
}

export interface ICount extends ISkippedAndCompletedCount {
  unCompletedSteps: number;
  skippedAndCompletedSteps: number;
  totalSteps: number;
}
