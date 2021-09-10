import initSchemaLogger, {
  clickOnCardParams,
  clickOnCustomizeParams,
  clickOnTheDateFilterParams,
  clickToRefreshAllKpisParams,
  clickToRefreshParams,
  ctaClickedInsideTheWidgetParams,
  customizationModalAddRemoveKpiParams,
  customizationModalClickOnCancelExitParams,
  customizationModalClickOnSaveParams,
  customizationModalReorderParams,
  dateChangedParams,
  hoverOnKpiTitleParams,
  hoverOnSmartActionParams,
  hoverOnSparklineParams,
  hoverOnTheInformationIconParams,
  Logger,
  widgetDisplayedParams,
  widgetExpandCollapseParams,
} from '@wix/bi-logger-analytics-ng-dashboard-widget';
import webBiLogger from '@wix/web-bi-logger';

class DashboardWidgetBILogger {
  log: Logger = initSchemaLogger(webBiLogger)();

  init(metaSiteId: string, userId: string) {
    this.log.util.updateDefaults({
      _msid: metaSiteId,
      _uuid: userId,
    });
  }

  // 700 +
  widgetDisplayed(params: widgetDisplayedParams): Promise<void> {
    return this.log.widgetDisplayed(params);
  }

  // 701 +
  clickToRefresh(params: clickToRefreshParams): Promise<void> {
    return this.log.clickToRefresh(params);
  }

  // 702 +
  ctaClickedInsideTheWidget(params: ctaClickedInsideTheWidgetParams): Promise<void> {
    return this.log.ctaClickedInsideTheWidget(params);
  }

  // 703 +
  hoverOnSparkline(params: hoverOnSparklineParams): Promise<void> {
    return this.log.hoverOnSparkline(params);
  }

  // 704 +
  customizationModalReorder(params: customizationModalReorderParams): Promise<void> {
    return this.log.customizationModalReorder(params);
  }

  // 705 +
  hoverOnTheInformationIcon(params: hoverOnTheInformationIconParams): Promise<void> {
    return this.log.hoverOnTheInformationIcon(params);
  }

  // 706 +
  clickOnTheDateFilter(params: clickOnTheDateFilterParams): Promise<void> {
    return this.log.clickOnTheDateFilter(params);
  }

  // 707 +
  dateChanged(params: dateChangedParams): Promise<void> {
    return this.log.dateChanged(params);
  }

  // 708 +
  clickOnCustomize(params: clickOnCustomizeParams): Promise<void> {
    return this.log.clickOnCustomize(params);
  }

  // 709 +
  widgetExpandCollapse(params: widgetExpandCollapseParams): Promise<void> {
    return this.log.widgetExpandCollapse(params);
  }

  // 710 +
  customizationModalClickOnSave(params: customizationModalClickOnSaveParams): Promise<void> {
    return this.log.customizationModalClickOnSave(params);
  }

  // 711 +
  clickOnCard(params: clickOnCardParams): Promise<void> {
    return this.log.clickOnCard(params);
  }

  // 712 - (cannot get all params)
  customizationModalClickOnCancelExit(
    params: customizationModalClickOnCancelExitParams,
  ): Promise<void> {
    return this.log.customizationModalClickOnCancelExit(params);
  }

  // 713 - (cannot implement with the current code)
  hoverOnSmartAction(params: hoverOnSmartActionParams): Promise<void> {
    return this.log.hoverOnSmartAction(params);
  }

  // 714 +
  customizationModalAddRemoveKpi(params: customizationModalAddRemoveKpiParams): Promise<void> {
    return this.log.customizationModalAddRemoveKpi(params);
  }

  // 720 +
  hoverOnKpiTitle(params: hoverOnKpiTitleParams): Promise<void> {
    return this.log.hoverOnKpiTitle(params);
  }

  // 729 +
  clickToRefreshAllKpis(params: clickToRefreshAllKpisParams): Promise<void> {
    return this.log.clickToRefreshAllKpis(params);
  }
}

export default new DashboardWidgetBILogger();
