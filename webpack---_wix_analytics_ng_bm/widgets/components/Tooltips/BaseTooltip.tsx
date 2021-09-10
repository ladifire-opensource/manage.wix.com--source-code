import React, { FC } from 'react';
import { Tooltip } from 'wix-style-react';

import { IStatTextTooltipProps } from '../../types/tooltipTypes';

export const BaseTooltip: FC<IStatTextTooltipProps> = ({ statTextExtended, children }) => {
  if (!statTextExtended) {
    return children;
  }

  return <Tooltip content={statTextExtended}>{children}</Tooltip>;
};
