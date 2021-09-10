import * as React from 'react';
import * as css from './TipsPanel.scss';
import { SectionHelper, Box, Text, Badge } from 'wix-style-react';
import Hint from 'wix-ui-icons-common/Hint';
import { withTranslation, WithTranslation } from '@wix/wix-i18n-config';
import classnames from 'classnames';

export enum TipActionType {
  DASHBOARD = 'bizMgrNavigation',
  APPMARKET_IN_EDITOR = 'externalUrl'
}

export type ActionConfig = {
  text: string;
  config: any;
  type: TipActionType;
};

export type TipProps = {
  title: string;
  text: string;
  action: ActionConfig;
  id: string;
  biData: {
    asset_campaign_guid: string;
    asset_campaign_id: string;
    asset_location_on_page: 0;
    offering_guid: string;
    promotion_asset_type: TipActionType;
    hosting: string;
    msid: string;
  }
  leftPosition: boolean
};

export interface TipViewProps extends WithTranslation {
  title: string;
  text: string;
  actionText: string;
  onActionClick(): void;
  onCloseClick(): void;
  leftPosition?: boolean;
}

const getTitleElement = (title, t) => (
  <Box direction="vertical">
    <Box marginBottom="18px">
      <Box verticalAlign="middle" direction="horizontal">
        <Hint className={css.taglineIcon}/>
        <Badge type="transparent" skin="neutral">{t('in_app_tips.recommendation_title')}</Badge>
      </Box>
    </Box>
    <Text size="small" light weight="bold" dataHook="global-tip-title">{t(title)}</Text>
  </Box>
);

const TipComponent = ({ title, text, actionText, onActionClick, onCloseClick, leftPosition, t }: TipViewProps) => {

  return (
    <div className={classnames(css.tipsPanel, { [css.leftPosition]: leftPosition })}>
      <SectionHelper
        actionText={t(actionText)}
        appearance="experimentalDark"
        onAction={() => onActionClick()}
        onClose={() => onCloseClick()}
        title={getTitleElement(title, t)}
        dataHook="global-tip"
      >
        <span data-hook="global-tip-content"><Text size="small" weight="thin" light>{t(text)}</Text></span>
      </SectionHelper>
    </div>
  );
};

export const Tip = withTranslation()(TipComponent);
