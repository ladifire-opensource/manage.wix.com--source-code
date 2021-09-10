import { HelpFooter } from '@components/help-footer';
import { HELP_ROOT } from '@data-hooks';
import React, { FC } from 'react';
import { Box, Card, Text } from 'wix-style-react';
import { useTranslation } from 'yoshi-flow-bm-runtime';
import { SearchBox } from '../search-box/search-box.container';
import css from './help-widget.component.scss';

const { Header, Content } = Card;

export const HelpWidgetComponent: FC = () => {
  const { t } = useTranslation();

  return (
    <Card dataHook={HELP_ROOT}>
      <Header title={t('help.title')} subtitle={<Text size="tiny">{t('help.subtitle')}</Text>} />
      <Content>
        <Box direction={'vertical'} className={css.content}>
          <SearchBox />
          <HelpFooter />
        </Box>
      </Content>
    </Card>
  );
};
