import {
  ModulePriorities,
  getModule,
  ModuleId,
} from '@wix/business-manager-api';

interface TemplateList {
  recommended: string;
}

const TEMPLATE_LISTS: Record<string, TemplateList> = {
  STORES: {
    recommended: '49a221cf-a8b9-4349-ac5e-f7e1f12df973',
  },
  COUPONS: {
    recommended: '424cb90b-63e4-4b96-8823-fed8f3e9f219',
  },
  EVENTS: {
    recommended: '4aec14e2-41f9-4d5d-9e0c-c2557ec7f896',
  },
  VIDEO: {
    recommended: 'b9bd2319-fe5e-482a-9b74-7374a93a5e4c',
  },
  HOTELS: {
    recommended: '916ea11c-b559-46c9-83d8-c4410614f8b6',
  },
  BLOG: {
    recommended: '44ddd7d3-1823-4892-9d04-e0ffd8fddb94',
  },
  RESTAURANTS: {
    recommended: '15d3df7a-595c-47a1-b05d-4bba915155e8',
  },
  PHOTOGRAPHY: {
    recommended: '07d34f46-c1de-4897-97df-3af38be2314e',
  },
  MUSIC_MANAGER: {
    recommended: 'd63bf053-0da9-4224-af01-9f0e69aead1a',
  },
  BOOKINGS: {
    recommended: '3412bde4-10a8-4dcc-a303-ab5f312c41a6',
  },
  VANILLA: {
    recommended: '60de4d4f-0024-4b36-9e2f-40d72955dfc5',
  },
};

interface VerticalDefinition {
  source: string;
}

export function resolveTemplateLists(): TemplateList[] {
  // @ts-expect-error
  const { payload } = getModule(ModuleId.Shoutout) || {};
  const verticals = (payload || [])
    .filter(isSupportedVertical)
    .reduce(toSortedByPriorityList, [])
    .filter(emptyItems)
    .map(getListsIds);
  return verticals.length
    ? verticals.concat(TEMPLATE_LISTS.VANILLA)
    : [TEMPLATE_LISTS.VANILLA];
}

function getListsIds(verticalDefinition: VerticalDefinition) {
  return TEMPLATE_LISTS[verticalDefinition.source];
}

function toSortedByPriorityList(
  result: VerticalDefinition[],
  currentVerticalDefinition: VerticalDefinition,
) {
  const verticalsIndexInBM = ModulePriorities.findIndex(
    (vertical) => vertical === currentVerticalDefinition.source,
  );
  result[verticalsIndexInBM] = currentVerticalDefinition;
  return result;
}

function emptyItems(item: any) {
  return !!item;
}
function isSupportedVertical(configObject: VerticalDefinition) {
  return !!TEMPLATE_LISTS[configObject.source];
}
