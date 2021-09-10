import { HELP_HIRE_PROFESSIONAL, HELP_VISIT_HELP_CENTER } from '@data-hooks';
import React, { FC } from 'react';
import { Box, TextButton } from 'wix-style-react';
import { HelpCircleSmall, WixMarketplaceSmall } from 'wix-ui-icons-common';
import { useTranslation } from 'yoshi-flow-bm-runtime';
import css from './help-footer.component.scss';
import { Brand } from '@wix/business-manager-api';

interface HelpfooterComponentProps {
  visitHelpCenterClicked(): void;
  hireProfessionalClicked(): void;
  showHireProfessional: boolean;
  brand: Brand;
}

export const HelpFooterComponent: FC<HelpfooterComponentProps> = ({
  visitHelpCenterClicked,
  hireProfessionalClicked,
  showHireProfessional,
  brand,
}) => {
  const { t } = useTranslation();

  return (
    <Box direction="vertical" className={css.links}>
      <TextButton
        weight="normal"
        size="tiny"
        onClick={visitHelpCenterClicked}
        dataHook={HELP_VISIT_HELP_CENTER}
        prefixIcon={<HelpCircleSmall />}
      >
        {t('help.links.help-center')}
      </TextButton>
      {showHireProfessional && (
        <TextButton
          weight="normal"
          size="tiny"
          onClick={hireProfessionalClicked}
          dataHook={HELP_HIRE_PROFESSIONAL}
          prefixIcon={<WixMarketplaceSmall />}
        >
          {brand === Brand.EDITORX ? t('help.links.specialist') : t('help.links.hire')}
        </TextButton>
      )}
    </Box>
  );
};
