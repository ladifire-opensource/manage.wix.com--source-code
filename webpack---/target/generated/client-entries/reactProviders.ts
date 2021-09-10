
import { createBILogger } from '/home/builduser/work/2eef88c0c67ad536/packages/my-domains-iframe-wrapper/target/generated/bi/createBILogger';

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