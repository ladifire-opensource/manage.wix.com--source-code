import { HELP_WIDGET_BI_NAME, SUPPORT_URL } from '@consts';
import { AccountContext } from '@contexts/account';
import React, { FC, useCallback, useContext, useMemo } from 'react';
import { useBILogger, useModuleParams } from 'yoshi-flow-bm-runtime';
import { HelpFooterComponent } from './help-footer.component';
import { Brand } from '@wix/business-manager-api';

export const HelpFooter: FC = () => {
  const { accountLanguage, viewMode, metaSiteId, brand } = useModuleParams();
  const { hireProfessionalUrl } = useContext(AccountContext);
  const bi = useBILogger();

  const biCommonParams = useMemo(
    () => ({
      hosting: viewMode,
      msid: metaSiteId,
      widget_name: HELP_WIDGET_BI_NAME,
    }),
    [viewMode, metaSiteId],
  );

  const openHelpCenter = useCallback(() => {
    bi.clickInDashboard({ ...biCommonParams, name: 'help-center' });
    window.open(`${SUPPORT_URL}/${accountLanguage}?referral=HelpWidgetDashboard`);
  }, [accountLanguage, bi, biCommonParams]);

  const openMarketPlace = useCallback(() => {
    bi.clickInDashboard({ ...biCommonParams, name: 'hire-professional' });
    window.open(hireProfessionalUrl);
  }, [bi, biCommonParams, hireProfessionalUrl]);

  return (
    <HelpFooterComponent
      showHireProfessional={!!hireProfessionalUrl}
      visitHelpCenterClicked={openHelpCenter}
      hireProfessionalClicked={openMarketPlace}
      brand={brand ?? Brand.WIX}
    />
  );
};
