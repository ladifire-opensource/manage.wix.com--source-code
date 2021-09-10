import React, { FC, memo } from 'react';
import { ModalsComponent } from '@components/modals';
import { StickyBanner } from '@components/sticky-banner';
import { DH_HOME_ROOT } from '@consts';
import s from './dashboard.component.scss';

export interface DashboardProps {
  mainColumn: JSX.Element[];
  secondaryColumn: JSX.Element[];
}

export const Dashboard: FC<DashboardProps> = memo(({ mainColumn, secondaryColumn }) => {
  return (
    <div className={s.scrollContainer} data-hook={DH_HOME_ROOT}>
      <div className={s.columnsContainer}>
        <div className={s.mainColumn}>{mainColumn}</div>
        <div className={s.rightPanel}>{secondaryColumn}</div>
      </div>
      <ModalsComponent />
      <StickyBanner />
    </div>
  );
});
