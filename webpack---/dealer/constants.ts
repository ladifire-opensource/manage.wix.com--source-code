import type { SupportChatOrigins } from '../types';

export const TEST_REAL_ESTATE_ID = '1b4ae825-da4a-4ade-804f-4ef7209047e4';
export const DEALER_URL = '/_api/dealer-offers-serving-service';

export const originToRealEstateIdMap: {
  [s in SupportChatOrigins]: string | null;
} = {
  test: TEST_REAL_ESTATE_ID,
  ADI: 'aaff4c29-1d2b-4d01-8dc5-399d36181915',
  BusinessManager: '2a70c433-fa54-4a4c-9a3c-dd2286d2fac5',
  Helpcenter: '87d190b2-1551-486f-a39c-9ae096892749',
  Editor: 'c1f7d0af-b289-4dd5-8742-6461afd2b290',
  IntroFunnel: '0f6d887f-01a4-4daa-94c7-12a33819b94f',
  TemplatesGallery: '5a477ca2-d310-4b3d-a2e1-b150f73a8821',
  TemplatesViewer: '4207cc16-8afa-4ad5-aa6d-91be384d049d',
  PackagePicker: '3f597ed1-df30-4b5e-b4df-e04ee79e7fcf',
  AcceptPayments: '77ecd5a6-0bb3-4c66-8200-9b0a8599f379',
  AccountManager: 'f5dc4eff-ee73-4b1e-b996-ea3854d60e98',
  SitesList: 'fed7f25e-879e-42a2-8fa3-1467e7b99611',
  WixPayments: '77ecd5a6-0bb3-4c66-8200-9b0a8599f379',
  Landing: '838b2c86-61f1-4c43-8b99-12fed4aa87cc',
};
