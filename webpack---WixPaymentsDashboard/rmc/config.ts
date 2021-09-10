import {BreadcrumbsItem} from 'wix-style-react';

export const RMC_LAZY_COMPONENT_ID = 'wix-payments-complete-setup-rmc-lazy';
export const RMC_COMPONENT_ID = 'wix-payments-complete-setup-rmc';

export type RMCBreadcrumbItem = BreadcrumbsItem & {
  onClick?(): void;
  biTargetPage?: string;
};
