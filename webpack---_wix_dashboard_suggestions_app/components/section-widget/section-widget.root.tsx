import React, { useEffect, useMemo } from 'react';
import { ThemeProvider } from 'wix-style-react';
import { theme } from 'wix-style-react/themes/businessDashboard';
import { I18nextProvider, useModuleParams, useExperiments } from '@wix/yoshi-flow-bm';
import { SuggestionsProvider, ActionsProvider } from '../../contexts';
import { createI18n } from '../../i18n';
import { fireSuggestionsWidgetSnapshot, useSuggestionsBILogger } from '../../bi-logger';
import { SectionWidget } from './section-widget.container';
import { BusinessDashboardProps, ResolvedProps } from '../../common/types/types';
import { useServices } from '@src/services';
import { ConfigurationData, ConfigurationProvider } from '@src/contexts/configuration';
import { useViewsSuggestions } from '@src/services/initial-data/initial-data.service';
import { RANDOM_FILTER_DEFAULT_DAYS } from '@src/api/constants';
import { ViewType } from '@src/common/types';

export interface SectionWidgetProps extends ResolvedProps, BusinessDashboardProps {}

export const SectionWidgetRoot: React.FC<SectionWidgetProps> = props => {
  const { phase, suggestions, translations, onLoaded, defaultReminderDays, widgetTitle } = props;
  const { accountLanguage, metaSiteId, viewMode } = useModuleParams();
  const biLogger = useSuggestionsBILogger();
  const { sessionRecorder } = useServices();
  const { experiments } = useExperiments();
  const viewsSuggestions = useViewsSuggestions();

  biLogger.util.updateDefaults({
    msid: metaSiteId,
    hosting: viewMode,
  });

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    onLoaded?.();
    sessionRecorder.markLoaded(ViewType.SECTION, phase);
    fireSuggestionsWidgetSnapshot(biLogger, viewsSuggestions);
  }, [onLoaded, phase, sessionRecorder, biLogger, viewsSuggestions]);

  const i18n = useMemo(
    () => createI18n({ experiments: experiments.all(), translations }),
    [experiments, translations],
  );

  const configuration: ConfigurationData = {
    accountLanguage: accountLanguage || 'en',
    defaultRemindLaterDays: defaultReminderDays || RANDOM_FILTER_DEFAULT_DAYS,
    phaseName: phase || 'setup',
  };

  return (
    <ConfigurationProvider configuration={configuration}>
      <I18nextProvider i18n={i18n}>
        <SuggestionsProvider suggestions={suggestions}>
          <ActionsProvider viewType={ViewType.SECTION}>
            <ThemeProvider theme={theme()}>
              <SectionWidget widgetTitle={widgetTitle} />
            </ThemeProvider>
          </ActionsProvider>
        </SuggestionsProvider>
      </I18nextProvider>
    </ConfigurationProvider>
  );
};
