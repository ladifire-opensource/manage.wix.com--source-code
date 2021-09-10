
import { wrapBiWithUpdateDefaults } from '@wix/yoshi-flow-bm/internal';

export function createBILogger({
  biLoggerFactory,
  userConfig = {}
}: any) {
  const factory = biLoggerFactory(userConfig);
  return wrapBiWithUpdateDefaults(factory, factory.logger());
}
