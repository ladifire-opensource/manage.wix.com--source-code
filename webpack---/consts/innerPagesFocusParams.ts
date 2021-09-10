import { PageComponentId } from '@wix/business-manager-api';

export const innerPagesFocusParams: { [pageComponentId: string]: string[] } = {
  [PageComponentId.WebsiteSettings]: [
    'website-settings',
    'favicon'
  ],
  [PageComponentId.BusinessInfo]: [
    'business-info',
    'email',
    'phone',
    'fax',
    'businessName',
    'shortDescription',
    'mainCategory',
    'subCategory',
    'logo',
    'address',
    'hintText',
    'hintPlacement',
    'isPhysical'
  ],
  [PageComponentId.LanguageAndRegion]: [
    'language-and-region',
    'locale',
    'timezone',
    'currency',
    'language',
  ],
};
