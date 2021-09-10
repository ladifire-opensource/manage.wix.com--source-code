
import { createBILogger } from '/home/builduser/work/21c42750b5c3f86b/packages/dashboard-suggestions-app/target/generated/bi/createBILogger';

import {
  
  PureExperimentsProvider,
  
  ErrorMonitorProvider,
  FedopsContext,
  BILoggerProvider,
  HttpProvider,
} from '@wix/yoshi-flow-bm';

export default {
  createBILogger,
  
  PureExperimentsProvider,
  
  ErrorMonitorProvider,
  FedopsProvider: FedopsContext.Provider,
  BILoggerProvider,
  HttpProvider,
};