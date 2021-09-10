import {
  TSortedIds,
  IData,
  ICount,
  ISkippedAndCompletedCount,
  IItem,
  EBadge,
  ISortedIdsByType,
  RealEstateDefinition,
  SectionType,
  ItemsDto,
} from '../../api';

const sectionSize = {
  [SectionType.INFINITE]: 7,
};

export interface IFindFirstActive {
  startFromId?: string;
  sortedIds: Partial<ISortedIdsByType>;
  data: IData;
  realEstates: RealEstateDefinition[];
}

export const findFirstActive = ({
  data,
  sortedIds,
  startFromId,
  realEstates,
}: IFindFirstActive): string | null => {
  const ids = realEstates.reduce((res, { id }) => {
    const relevantIds = sortedIds[id];

    if (relevantIds) {
      return [...res, ...relevantIds];
    }

    return res;
  }, [] as string[]);

  const sliceFrom = startFromId ? ids.indexOf(startFromId) : 0;
  return (
    ids.slice(sliceFrom, ids.length).find((id: string) => {
      const { isCompleted, isSkipped } = data[id];
      return !isCompleted && !isSkipped;
    }) ?? null
  );
};

export const findNextItemIdInSection = ({
  sortedIds,
  itemId,
}: {
  sortedIds: TSortedIds;
  itemId: string;
}): string => sortedIds[sortedIds.indexOf(itemId) + 1];

export const findActiveIdWhenSkipping = ({
  currentItemId,
  sortedIds,
  data,
}: {
  currentItemId: string;
  sortedIds: TSortedIds;
  data: IData;
}): string => {
  const lastItemId = [...sortedIds].reverse().find((id: string) => {
    const { isCompleted, isSkipped } = data[id];
    return !isCompleted && !isSkipped;
  });

  return lastItemId === currentItemId ? sortedIds[0] : currentItemId;
};

export const getItemsCount = ({
  data,
  sortedIds,
}: {
  data: IData;
  sortedIds: TSortedIds;
}): ICount => {
  const totalSteps = sortedIds.length;

  const count: ISkippedAndCompletedCount = sortedIds.reduce(
    (res: ISkippedAndCompletedCount, id: string) => {
      const { isSkipped, isCompleted } = data[id];
      const { completedSteps, skippedSteps } = res;
      return {
        skippedSteps:
          !isCompleted && isSkipped ? skippedSteps + 1 : skippedSteps,
        completedSteps: isCompleted ? completedSteps + 1 : completedSteps,
      };
    },
    {
      skippedSteps: 0,
      completedSteps: 0,
    },
  );

  return {
    ...count,
    unCompletedSteps: totalSteps - count.skippedSteps - count.completedSteps,
    skippedAndCompletedSteps: count.skippedSteps + count.completedSteps,
    totalSteps,
  };
};

export const isPhaseCompleted = ({
  data,
  sortedIds,
}: {
  data: IData;
  sortedIds: TSortedIds;
}): boolean =>
  getItemsCount({ data, sortedIds }).skippedAndCompletedSteps ===
  sortedIds.length;

export const sliceItemIds = ({
  sortedIds,
  sectionType,
}: {
  sortedIds: TSortedIds;
  sectionType: SectionType;
}): TSortedIds => sortedIds.slice(0, (sectionSize as any)[sectionType]);

export const popAndRotateItems = ({
  sortedIds,
  itemToPop,
}: {
  sortedIds: TSortedIds;
  itemToPop: string;
}): TSortedIds => sortedIds.filter((id) => id !== itemToPop).concat(itemToPop);

export const calculateCompletedPercentage = (
  completedCount: number,
  length: number,
  minimalBarProgress: number = 0,
): number =>
  length > 0 ? (completedCount / length) * (100 - minimalBarProgress) : 0;

export const isPremiumStep = (item: IItem): boolean =>
  item.badge === EBadge.PREMIUM;

export const allPhasesComplete = (raw: ItemsDto) => {
  let allDone = true;
  Object.keys(raw).forEach((key) => {
    if (raw[key].some((item) => !item.isCompleted)) {
      allDone = false;
    }
  });
  return allDone;
};
