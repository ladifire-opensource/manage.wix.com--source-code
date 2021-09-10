


import { createBILogger } from '/home/builduser/agent00/work/2f49d6714a7d66fb/target/generated/bi/createBILogger';


import {
  I18nextProvider,
  
  SentryProvider,
  
  BILoggerProvider,
  
} from 'yoshi-flow-bm-runtime';

export default {
  
  asyncMessagesLoader: (locale: string) => import(`/home/builduser/agent00/work/2f49d6714a7d66fb/src/assets/locale/messages_${locale}.json`),
  
  createBILogger,
  

  I18nextProvider,
  
  SentryProvider,
  
  BILoggerProvider,
  
};