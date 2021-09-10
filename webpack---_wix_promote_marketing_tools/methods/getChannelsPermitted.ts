import { MethodFn, BMMethodFlowAPI } from '@wix/yoshi-flow-bm';
import { Channel, ChannelsPermitted } from '../types';
import { CHANNELS_PERMISSIONS } from '../permissions';

const getChannelsPermitted: MethodFn = ({
  moduleParams: { userPermissions },
}: BMMethodFlowAPI): ChannelsPermitted => {
  return Object.values(Channel).reduce(
    (channelsPermitted: ChannelsPermitted, channel: Channel) => {
      channelsPermitted[channel] = isChannelPermitted(userPermissions, channel);
      return channelsPermitted;
    },
    {} as ChannelsPermitted,
  );
};

function isChannelPermitted(
  userPermissions: string[],
  channel: Channel,
): boolean {
  return CHANNELS_PERMISSIONS[channel].every((permission) =>
    userPermissions.includes(permission),
  );
}

export default getChannelsPermitted;
