import { navigateTo, PageComponentId } from '@wix/business-manager-api';
import React, { Suspense, useEffect, useState, lazy } from 'react';
import { useMount } from 'react-use';
import { I18nextProvider, translate } from 'react-i18next';
import { Box, Card, Loader, PopoverMenu, Text, TextButton, ThemeProvider } from 'wix-style-react';
import { ChevronDown, RefreshSmall } from 'wix-ui-icons-common';
import * as querystring from 'query-string';
import { theme } from 'wix-style-react/themes/businessDashboard';
import { ReportsRegistry } from '@wix/analytics-ng-common';
import { ExperimentsProvider, useExperiments } from '@wix/wix-experiments-react';
import { PredefinedTimeframe } from '@wix/ambassador-analytics-ng-server/types';

import { getTimeframeValue, timeframeOptions } from 'modules/options/timeframe';
import { getUpdatedAtData } from 'utils/dates';

import {
  AddRemoveStatActionBI,
  DashboardModeBI,
  DashboardWidgetType,
  ExperimentNames,
} from '../../constants/enums';
import DashboardWidgetBILogger from '../../utils/DashboardWidgetBILogger';
import {
  IReport,
  IReportingWidgetProps,
  ReportingServiceEventTypes,
  WIDGET_PARAM,
} from '../../types';
import { ServicesProvider } from '../../modules/services';
import { ConsentPolicyBannerService } from '../../services/ConsentPolicyBannerService';
import { useReportingService } from '../../hooks/useReportingService';
import i18n from '../../i18n-widget';
import styles from './DashboardNext.scss';
import { t } from '../../utils/translate';
import { getCurrency } from '../../utils/siteData';
import { getChartWidth } from '../utils/getChartWidth';
import { getDateString, getDisplayWidget, getSmartActionData } from './common/components';
import { WidgetLayouterNext } from '../components/WidgetLayouterNext/WidgetLayouterNext';
import { useConsentPolicyBanner } from '../hooks/useConsentPolicyBanner';

const StatsCustomizationModal = lazy(
  () => import('../components/StatsCustomizationModal/ModalContainer/ModalContainer'),
);

export function DashboardNext(props: IReportingWidgetProps) {
  const {
    reportKey,
    reportingService,
    moduleParams,
    onLoaded,
    hasBusinessPlan,
    shouldConnectPaymentMethod,
    userProfile,
  } = props;
  const [dashboardStats, setDashboardStats] = useState<string[]>(
    reportingService.getDashboardStats(),
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIsLoaded, setModalIsLoaded] = useState(false);
  const [isInitialLoadDone, setIsInitialLoadDone] = useState(false);
  const [orderedKpisListArray, setOrderedKpisListArray] = useState([]);
  const [orderedKpisList, setOrderedKpisList] = useState('');
  const [orderedKpisListValues, setOrderedKpisListValues] = useState([]);
  const [isDefault, setIsDefault] = useState(true);
  const [currency, setCurrency] = useState(null);
  const isConsentPolicyEnabled = useConsentPolicyBanner();
  const { experiments } = useExperiments();

  const dashboardReports = ReportsRegistry.getDashboardReports();

  let usedReportIds = [];

  // Must be the first hook, please do not change it's place
  const { reports, isWorking, updateIsWorking } = useReportingService(
    reportingService,
    dashboardStats.map((stat) => {
      return { reportId: stat };
    }),
    reportKey,
    {
      isUnified: true,
      preloadReportsIds: [],
    },
  );

  useEffect(() => {
    setOrderedKpisList(
      JSON.stringify(
        orderedKpisListArray.map(({ category, name, value }) => ({
          category,
          name,
          value,
        })),
      ),
    );
  }, [orderedKpisListArray]);

  useMount(() => {
    getCurrency(moduleParams.metaSiteId).then(setCurrency).catch(console.error);
    reportingService.on(ReportingServiceEventTypes.DASHBOARD_STATS_UPDATED, () => {
      const newStats = reportingService.getDashboardStats();
      setDashboardStats(newStats);
    });
  });

  if (reports) {
    usedReportIds = reports.getReportIds();
  }

  useEffect(() => {
    if (reports) {
      const allReportIds = reports.getReportIds();
      setOrderedKpisListArray(
        allReportIds.map((statId: string) => {
          const dashboardData = dashboardReports.find((report) => report.reportId === statId);
          const foundValue = orderedKpisListValues.find(
            (item) => Object.keys(item)[0] === dashboardData.reportId,
          );

          return {
            id: dashboardData.reportId,
            category: dashboardData.group,
            theme: dashboardData.theme,
            name: dashboardData.headerText,
            value: foundValue ? foundValue[dashboardData.reportId] : '',
          };
        }),
      );
      setIsDefault(
        allReportIds.every(
          (statId: string, index: number) =>
            statId === reportingService.getDefaultDashboardStats()[index],
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reports, orderedKpisListValues, ...usedReportIds]);

  if (!reports || !currency) {
    return null;
  }

  const timeFrame = reports.getTimeframe().timeframe;
  const updatedAt = reports.getUpdatedAt();

  if (!isInitialLoadDone && onLoaded) {
    setIsInitialLoadDone(true);
    onLoaded();
    DashboardWidgetBILogger.widgetDisplayed({
      widgetType: DashboardWidgetType.vertical,
      isDefault,
      isSalesDummy: !hasBusinessPlan || shouldConnectPaymentMethod,
      orderedKpisList,
      timeFrame,
    }).catch(console.error);
  }

  const sendCustomizationModalClickOnSaveBIEvent = (selected) => {
    const addedKpis = [];
    const removedKpis = [];

    selected.forEach((kpi) => {
      if (!usedReportIds.includes(kpi)) {
        addedKpis.push(kpi);
      }
    });
    usedReportIds.forEach((kpi) => {
      if (!selected.includes(kpi)) {
        removedKpis.push(kpi);
      }
    });
    DashboardWidgetBILogger.customizationModalClickOnSave({
      widgetType: DashboardWidgetType.vertical,
      addedKpis: addedKpis.toString(),
      isDefault,
      orderChanged:
        !addedKpis.length &&
        !removedKpis.length &&
        selected.toString() !== usedReportIds.toString(),
      orderedKpisList,
      removedKpis: removedKpis.toString(),
      targetKpisList: selected.toString(),
      timeFrame,
    }).catch(console.error);
  };

  return (
    <>
      <Card>
        <Card.Header
          title={t('widget.dashboard-next.header.title')}
          suffix={
            <Box>
              <Box>
                {isModalOpen && !modalIsLoaded ? (
                  <Loader size="tiny" />
                ) : (
                  <TextButton
                    size="tiny"
                    weight="normal"
                    onClick={() => {
                      setIsModalOpen(true);
                      DashboardWidgetBILogger.clickOnCustomize({
                        widgetType: DashboardWidgetType.vertical,
                        isDefault,
                        orderedKpisList,
                        timeFrame,
                      }).catch(console.error);
                    }}
                  >
                    {t('widget.dashboard.header.cta.customise')}
                  </TextButton>
                )}
              </Box>
            </Box>
          }
        />
        <Box marginLeft="24px" marginBottom="12px">
          <PopoverMenu
            textSize="small"
            showArrow={false}
            moveBy={{ y: 4 }}
            triggerElement={
              <TextButton
                size="tiny"
                disabled={isWorking}
                onClick={() => {
                  void DashboardWidgetBILogger.clickOnTheDateFilter({
                    widgetType: DashboardWidgetType.vertical,
                    isDefault,
                    orderedKpisList,
                    timeFrame,
                  });
                }}
                suffixIcon={<ChevronDown />}
              >
                {getTimeframeValue(timeFrame)}
              </TextButton>
            }
          >
            {timeframeOptions()
              .filter(({ id }) => {
                if (experiments.enabled(ExperimentNames.disableNinetyDaysFilterWidget)) {
                  return id !== PredefinedTimeframe.LAST_90_DAYS;
                }
                return true;
              })
              .map(({ id, value }) => {
                return (
                  <PopoverMenu.MenuItem
                    key={id}
                    text={value}
                    onClick={() => {
                      reports.changeTimeframe({ timeframe: id });
                      void DashboardWidgetBILogger.dateChanged({
                        widgetType: DashboardWidgetType.vertical,
                        isDefault,
                        orderedKpisList,
                        targetValue: id,
                        timeFrame,
                      });
                    }}
                  />
                );
              })}
          </PopoverMenu>
        </Box>
        <WidgetLayouterNext>
          {(getRawItemsNumber, widgetWidth) => {
            return usedReportIds
              .map((reportId: string) => {
                return reports.getReport(reportId);
              })
              .map((report: IReport, index) => {
                const reportId = report.getReportId();
                const dashboardData = {
                  ...dashboardReports.find(
                    (dashboardReport) => dashboardReport.reportId === reportId,
                  ),
                  smartActions: [],
                };
                const dashboardDataSmartAction = getSmartActionData(dashboardData, userProfile);

                const chartWidth = getChartWidth(
                  getRawItemsNumber(index, usedReportIds.length),
                  widgetWidth,
                );

                return (
                  <div
                    key={reportId}
                    onClick={() => {
                      DashboardWidgetBILogger.clickOnCard({
                        widgetType: DashboardWidgetType.vertical,
                        category: dashboardData.headerText,
                        dashboardId: dashboardData.reportLink,
                        isDefault,
                        kpiName: dashboardData.measureLabel,
                        orderedKpisList,
                        reportMode: DashboardModeBI.regular,
                        timeFrame,
                      }).catch(console.error);
                      dashboardData.reportLink &&
                        navigateTo({
                          pageComponentId: PageComponentId.AnalyticsNgBm,
                          contextData: {
                            appState: `${dashboardData.reportLink}?${querystring.stringify({
                              date: getDateString(
                                reports.getTimeframe().timeframe,
                                moduleParams.accountLanguage,
                              ),
                              referralInfo: WIDGET_PARAM,
                            })}`,
                          },
                        });
                    }}
                    className={styles.tile}
                  >
                    {getDisplayWidget(
                      {
                        reports,
                        dashboardData,
                        moduleParams,
                        chartWidth,
                        hasBusinessPlan,
                        shouldConnectPaymentMethod,
                        currency,
                        isHovered: false,
                        dashboardDataSmartAction,
                        isDefault,
                        orderedKpisList,
                        timeFrame,
                        isConsentPolicyEnabled,
                        onReportUpdated: (data) => {
                          orderedKpisListValues.push(data.measuredResult.currentPeriod.data);
                          setOrderedKpisListValues(
                            JSON.parse(JSON.stringify(orderedKpisListValues)),
                          );
                        },
                      },
                      true,
                    )}
                  </div>
                );
              });
          }}
        </WidgetLayouterNext>
        <Box align="space-between" padding="16px 24px" height="20px">
          <Text size="tiny">{updatedAt && getUpdatedAtData(new Date(updatedAt), t)}</Text>
          {isWorking ? (
            <Loader size="tiny" />
          ) : (
            <TextButton
              size="tiny"
              prefixIcon={<RefreshSmall />}
              onClick={() => {
                void DashboardWidgetBILogger.clickToRefreshAllKpis({
                  isDefault,
                  isSalesDummy: !hasBusinessPlan || shouldConnectPaymentMethod,
                  orderedKpisList,
                  timeFrame,
                  widgetType: DashboardWidgetType.vertical,
                });
                reports.refreshData({ bypassCache: true });
              }}
            >
              {t('widget.dashboard-next.footer.cta.refresh')}
            </TextButton>
          )}
        </Box>
      </Card>
      <Suspense fallback={<div />}>
        {isModalOpen && (
          <StatsCustomizationModal
            onMount={() => {
              !modalIsLoaded && setModalIsLoaded(true);
            }}
            onCancel={(button_name: string) => {
              setIsModalOpen(false);
              DashboardWidgetBILogger.customizationModalClickOnCancelExit({
                widgetType: DashboardWidgetType.vertical,
                button_name,
                isDefault,
                orderedKpisList,
                timeFrame,
              }).catch(console.error);
            }}
            onDone={(selected) => {
              if (selected.some((stat) => !dashboardStats.includes(stat))) {
                updateIsWorking(true);
              }
              reportingService.setDashboardStats(selected);
              setIsModalOpen(false);
              sendCustomizationModalClickOnSaveBIEvent(selected);
            }}
            reports={dashboardReports}
            selectedIds={usedReportIds}
            onOrderChanged={(orderedStats) =>
              DashboardWidgetBILogger.customizationModalReorder({
                widgetType: DashboardWidgetType.vertical,
                isDefault,
                orderedKpisList,
                targetKpisList: JSON.stringify(orderedStats),
                timeFrame,
              }).catch(console.error)
            }
            onItemAdded={(item) =>
              DashboardWidgetBILogger.customizationModalAddRemoveKpi({
                widgetType: DashboardWidgetType.vertical,
                actionName: AddRemoveStatActionBI.add,
                isDefault,
                kpi_name: item.title,
                orderedKpisList,
                timeFrame,
              }).catch(console.error)
            }
            onItemRemoved={(item) =>
              DashboardWidgetBILogger.customizationModalAddRemoveKpi({
                widgetType: DashboardWidgetType.vertical,
                actionName: AddRemoveStatActionBI.remove,
                isDefault,
                kpi_name: item.title,
                orderedKpisList,
                timeFrame,
              }).catch(console.error)
            }
          />
        )}
      </Suspense>
    </>
  );
}

const DashboardWidgetWithTranslation = translate()(DashboardNext);

export const DashboardNextWrapper = (props) => {
  const { staticsUrl, sharedTranslations } = props.moduleParams.config.topology;
  const i18nInstance = i18n(props.moduleParams.accountLanguage, staticsUrl, sharedTranslations);
  const consentPolicyBanner = new ConsentPolicyBannerService(
    props.moduleParams.liveSite?.isSitePublished,
  );

  DashboardWidgetBILogger.init(props.moduleParams.metaSiteId, props.moduleParams.userId);

  // @ts-expect-error
  if (wixRecorder) {
    // @ts-expect-error
    wixRecorder.withExperiments({
      [ExperimentNames.analyticsNGDashboardWidgetNext]: 'true',
      [ExperimentNames.useNewDashboard2020]: 'true',
    });
  }

  return (
    <ServicesProvider consentPolicyBanner={consentPolicyBanner}>
      <I18nextProvider i18n={i18nInstance}>
        <ThemeProvider theme={theme({ active: true })}>
          <ExperimentsProvider scope="analytics-ng">
            <Suspense fallback={null}>
              <DashboardWidgetWithTranslation {...props} />
            </Suspense>
          </ExperimentsProvider>
        </ThemeProvider>
      </I18nextProvider>
    </ServicesProvider>
  );
};
