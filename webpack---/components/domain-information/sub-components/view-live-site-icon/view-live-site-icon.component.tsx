import React, { memo, FC } from 'react';
import { useTranslation, useModuleParams } from 'yoshi-flow-bm-runtime';
import { Tooltip } from 'wix-style-react';
import ExternalLinkIconSmall from 'wix-ui-icons-common/ExternalLinkSmall';
import * as styles from './view-live-site-icon.scss';

export const VIEW_LIVE_SITE_TOOLTIP_DATA_HOOK =
  'dashboard-site-details.view-live-site-tooltip';
export interface ViewLiveSiteIconProps {
  isSitePublished: boolean;
}

export const ViewLiveSiteIcon: FC<ViewLiveSiteIconProps> = memo(
  ({ isSitePublished }) => {
    const [t] = useTranslation();
    return (
      <Tooltip
        dataHook={VIEW_LIVE_SITE_TOOLTIP_DATA_HOOK}
        content={t('view.live.site')}
        size="small"
        disabled={!isSitePublished}
        className={styles.tooltip}
      >
        <ExternalLinkIconSmall />
      </Tooltip>
    );
  },
);
