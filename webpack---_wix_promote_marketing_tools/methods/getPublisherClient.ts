import { MethodFn } from '@wix/yoshi-flow-bm';

const getPublisherClient: MethodFn = async () =>
  import('@wix/publisher-client');

export default getPublisherClient;
