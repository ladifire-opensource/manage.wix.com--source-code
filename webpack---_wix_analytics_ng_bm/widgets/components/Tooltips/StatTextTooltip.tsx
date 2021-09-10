import React, { FC } from 'react';

import { IStatTextTooltipProps } from '../../types/tooltipTypes';
import { BaseTooltip } from './BaseTooltip';
import { TrafficTooltip } from './TrafficTooltip';

export const StatTextTooltip: FC<IStatTextTooltipProps> = (props) => {
  switch (props.group) {
    case 'traffic': {
      return <TrafficTooltip {...props} />;
    }

    default: {
      return <BaseTooltip {...props} />;
    }
  }
};
