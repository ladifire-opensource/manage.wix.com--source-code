import React, { FC } from 'react';
import { AppImage } from './app-image';
import { Box, Divider, TextButton } from 'wix-style-react';
import { AppTitleAndDescriptionComponent } from './app-title-and-description.component';
import { AppReview } from './app-review';
import { AppItemProps } from './app-item.container';
import { useTranslation } from '@wix/yoshi-flow-bm';
import { AppMarketTemplateDataHooks } from '@src/common/hooks';
import { ViewType } from '@src/common/types';

export interface AppItemComponentProps
  extends Omit<AppItemProps, 'cta' | 'onAppItemCtaClicked' | 'onAppItemViewed' | 'index'> {
  onCtaClick: () => void;
}

export const AppItemComponent: FC<AppItemComponentProps> = ({
  onCtaClick,
  id,
  icon,
  name,
  description,
  reviewStars,
  numberOfReviews,
  isLastInTheList,
  viewType,
}) => {
  const { t } = useTranslation();
  return (
    <Box
      paddingTop="12px"
      direction="vertical"
      dataHook={`${AppMarketTemplateDataHooks.APP_ITEM}.${id}`}
    >
      <Box direction="horizontal">
        <Box paddingRight="12px">
          <AppImage src={icon} />
        </Box>
        <Box flex="1" direction="vertical">
          <Box paddingBottom="12px">
            <Box
              flex="1"
              dataHook={AppMarketTemplateDataHooks.APP_DESCRIPTION_WRAPPER}
              paddingRight={viewType === ViewType.PAGE ? '44px' : '24px'}
            >
              <AppTitleAndDescriptionComponent name={name} description={description} />
            </Box>
            <Box width="80px" align="right" paddingRight="44px">
              <AppReview reviewStars={reviewStars} numberOfReviews={numberOfReviews} />
            </Box>
            <Box minWidth="56px" verticalAlign="middle">
              <TextButton
                size="tiny"
                weight="normal"
                skin="standard"
                onClick={onCtaClick}
                dataHook={AppMarketTemplateDataHooks.APP_CTA}
              >
                {t('suggestion.widget.app-market-template.viewapp')}
              </TextButton>
            </Box>
          </Box>
          {!isLastInTheList && <Divider />}
        </Box>
      </Box>
      {isLastInTheList && <Divider />}
    </Box>
  );
};
