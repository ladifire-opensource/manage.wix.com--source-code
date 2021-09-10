import React, { FC } from 'react';
import { Box, Button, Heading, SectionHelper, Text } from 'wix-style-react';
import { useTranslation } from '@wix/wix-i18n-config';
import { VisibilityDetector } from '@wix/os-dashboard-shared-components';
import { BannerDataHooks } from './banner.data-hooks';
import * as s from './banner.scss';

interface Props {
  onVisible(): void;
  onClick(): void;
}

export const BannerComponent: FC<Props> = ({ onClick, onVisible }) => {
  const [t] = useTranslation();

  return (
    <VisibilityDetector onVisible={onVisible}>
      <div className={s.banner} data-hook={BannerDataHooks.Wrapper}>
        <Box verticalAlign="middle">
          <Box direction="vertical" flex="1">
            <Heading appearance="H4" dataHook={BannerDataHooks.Title}>
              {t('setup.step.choose_features.title')}
            </Heading>
            <Text size="tiny" dataHook={BannerDataHooks.Description}>
              {t('setup.step.choose_features.desc')}
            </Text>
          </Box>
          <Box marginLeft="20px">
            <Button onClick={onClick} dataHook={BannerDataHooks.Button}>
              {t('setup.step.choose_features.cta')}
            </Button>
          </Box>
        </Box>
      </div>
    </VisibilityDetector>
  );
};
