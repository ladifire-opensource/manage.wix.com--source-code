// src/pages/foo.module.ts
import { FilesFn } from '@wix/yoshi-flow-bm';

export const files: FilesFn = (flowAPI: any) => [
  `${flowAPI.moduleParams.config.topology.premiumPurchaseMailboxUrl}add-more-seats-lazy.bundle.js`,
  `${flowAPI.moduleParams.config.topology.premiumPurchaseMailboxUrl}add-more-seats-lazy.css`,
  `${flowAPI.moduleParams.config.topology.connectDomainUrl}connect-domain.bundle.min.js`,
  `${flowAPI.moduleParams.config.topology.connectDomainUrl}connect-domain.min.css`,
];
