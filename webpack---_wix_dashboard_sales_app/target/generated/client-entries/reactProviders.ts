
import { createBILogger } from '/home/builduser/agent00/work/335b618521905df3/packages/dashboard-sales-app/target/generated/bi/createBILogger';

import {
  I18nextProvider,
  PureExperimentsProvider,
  SentryProvider,
  
  FedopsContext,
  BILoggerProvider,
  HttpProvider,
} from '@wix/yoshi-flow-bm';

export default {
  createBILogger,
  I18nextProvider,
  PureExperimentsProvider,
  SentryProvider,
  
  FedopsProvider: FedopsContext.Provider,
  BILoggerProvider,
  HttpProvider,
};