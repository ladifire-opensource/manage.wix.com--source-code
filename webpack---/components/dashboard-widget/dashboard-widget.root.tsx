import React, { FC, useMemo } from 'react';
import { theme } from 'wix-style-react/themes/businessDashboard';
import { DashboardWidgetDataProvider } from './dashboard-widget.context';
import { DashboardWidgetContainer } from './dashboard-widget.container';
import { ResolvedProps } from '@src/exported-components/dashboard-widget.module';
import {
  useModuleParams,
  useBILogger,
  I18nextProvider,
  useExperiments,
} from 'yoshi-flow-bm-runtime';
import { useSessionRecorder } from '@src/hooks/use-session-recorder';
import { mapToWidgetItems } from '@src/utils/bi-mappers';
import { createI18n } from '@src/i18n';
import { ThemeProvider } from 'wix-style-react';
import { SetupError } from './setup-error/setup-error.component';

interface BusinessDashboardProps {
  onLoaded: () => void;
  widgetTitle?: string;
}

export interface DashboardWidgetProps
  extends ResolvedProps,
    BusinessDashboardProps {}

export const DashboardWidget: FC<DashboardWidgetProps> = ({
  widgetData,
  messages,
  onLoaded,
  widgetTitle,
}) => {
  const { viewMode, metaSiteId } = useModuleParams();
  const biLogger = useBILogger();
  const sessionRecorder = useSessionRecorder();
  const experiments = useExperiments().experiments.all();

  const i18n = useMemo(
    () => createI18n({ experiments, messages }),
    [experiments, messages],
  );

  biLogger.util.updateDefaults({
    hosting: viewMode,
    msid: metaSiteId,
  });

  React.useEffect(() => {
    onLoaded && onLoaded();
    if (widgetData) {
      sessionRecorder.start(widgetData);
      biLogger.setupWidgetItems(mapToWidgetItems(widgetData));
    }
  }, [onLoaded, sessionRecorder, widgetData, biLogger]);

  return (
    <ThemeProvider theme={theme()}>
      <I18nextProvider i18n={i18n}>
        {widgetData == null ? (
          <SetupError />
        ) : (
          <DashboardWidgetDataProvider
            siteCategory={widgetData!.siteCategory}
            categorizedSteps={widgetData!.categorizedSteps}
            skippedSteps={widgetData!.skippedSteps}
            setupCompleted={widgetData!.setupCompleted}
            closedHappyMoment={widgetData!.closedHappyMoment}
            isPartner={widgetData!.isPartner}
            isFinishFeaturesWizard={widgetData.isFinishFeaturesWizard}
            widgetTitle={widgetTitle}
          >
            <DashboardWidgetContainer />
          </DashboardWidgetDataProvider>
        )}
      </I18nextProvider>
    </ThemeProvider>
  );
};
