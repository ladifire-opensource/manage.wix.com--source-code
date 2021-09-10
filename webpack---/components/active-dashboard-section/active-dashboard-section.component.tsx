import React, { FC } from 'react';
import { DndLayout } from '@components/dnd/layout';
import { CustomizationButton } from './customization-button/customization-button.container';
import { Divider } from 'wix-style-react';
import { ACTIVE_DASHBOARD_DIVIDER_DATA_HOOK } from './consts';

interface Props {
  showBottomDivider: boolean;
}

export const ActiveDashboardSection: FC<Props> = ({ showBottomDivider }) => (
  <div>
    <CustomizationButton />
    <DndLayout />
    {showBottomDivider && <Divider skin="dark" dataHook={ACTIVE_DASHBOARD_DIVIDER_DATA_HOOK} />}
  </div>
);
