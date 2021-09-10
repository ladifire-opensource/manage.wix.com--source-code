import * as React from 'react';
import { TextButton, Heading, Box, FontUpgrade } from 'wix-style-react';
import { withTranslation, WithTranslation } from '@wix/wix-i18n-config';
import { openInANewTab } from '../../services/navigationServices';
import * as styles from './style.scss';
import { getSupportForContributorsUrl } from '../../utils/getSupportForContributorsUrl';

type Props = WithTranslation & { locale: string };
const UnauthorizedPageView = ({ t, locale }: Props) => (
  <div>
    <FontUpgrade>
      <Box align="center" marginTop="174px">
        <div className={styles.unauthorizedImage}/>
      </Box>
      <Box align="center" marginBottom="18px" marginTop="36px">
        <Heading appearance="H3">{t('no-permissions-message')}</Heading>
      </Box>
      <Box align="center">
        <TextButton
          onClick={() => openInANewTab(getSupportForContributorsUrl(locale))}>{t('no-permissions-learn-more-message')}</TextButton>
      </Box>
    </FontUpgrade>
  </div>
);

export const UnauthorizedPage = withTranslation()(UnauthorizedPageView);
