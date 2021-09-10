import { ModuleRegistry } from 'react-module-container';
import { sendBusinessManagerBI, sendSdkBI } from '../../services/BIService';
import { BIEvents } from '../../../common/consts/bi';
import { DataCapsule, LocalStorageStrategy } from 'data-capsule';
import { isInitialLoad, setIsInitialLoad } from '../../services/isInitialLoad';
import { getUrlParamFirstValue } from '../../utils/getUrlParamsFirstValue';
import {
  VIEW_START_LOADING,
  VIEW_FINISHED_LOADING,
  VIEW_FIRST_INTERACTIVE,
  IViewMode
} from '@wix/business-manager-api';

export class PageComponentLifecycleBI {

  private unSubscribeOnNavigateToPage;
  private unSubscribePageComponentWillMount;
  private unSubscribePageComponentStartLoading;
  private unSubscribePageComponentFinishedLoading;
  private unSubscribeViewStartLoading;
  private unSubscribeViewFinishedLoading;
  private unSubscribeViewFirstInteractive;

  private readonly dataCapsule: DataCapsule;
  private moduleStartLoadingTime: number;
  private viewStartLoadingTime: number;
  private viewFirstInteractiveTime: number;
  private isNewModuleLoaded: boolean;
  private wasFirstEventOfViewFinishedLoadingCalled: boolean;
  private wasFirstEventOfFirstInteractiveCalled: boolean;

  private previousSubViewId: string;
  private previousViewId: string;
  private currentViewId: string;
  private previousPageComponentId: string;
  private currentPageComponentId: string;
  private currentAppDefId: string;

  constructor(private readonly siteId: string, private readonly hosting: IViewMode, private readonly getAppInstanceId: (appDefId: string) => string, strategy = LocalStorageStrategy) {
    this.dataCapsule = new DataCapsule({
      strategy: new strategy(),
      namespace: 'wix-business-manager'
    });
    this.previousViewId = 'none';
    this.previousSubViewId = 'none';
    this.previousPageComponentId = 'none';
    this.wasFirstEventOfViewFinishedLoadingCalled = false;
    this.wasFirstEventOfFirstInteractiveCalled = false;
    this.isNewModuleLoaded = false;

    this.subscribe();
  }

  private getIsInitialLoad(eventId: number): Promise<string> {
    return isInitialLoad(this.dataCapsule, eventId);
  }

  private async setAsLoaded(eventId: number): Promise<void> {
    await setIsInitialLoad(this.dataCapsule, eventId);
  }

  private getUrlParamValue(paramName): string {
    return getUrlParamFirstValue(paramName);
  }

  private subscribe() {
    this.unSubscribePageComponentWillMount = ModuleRegistry.addListener('businessManager.pageComponentWillMount', (pageComponentId: string, appDefId: string) => {
      if (this.currentViewId) {
        this.previousPageComponentId = this.currentPageComponentId;
        this.previousViewId = this.currentViewId;
      }

      this.currentPageComponentId = pageComponentId;
      this.currentAppDefId = appDefId;
      this.currentViewId = appDefId || pageComponentId;
    });

    this.unSubscribeOnNavigateToPage = ModuleRegistry.addListener('businessManager.onNavigateToPage', (viewId: string, subViewId: string) => {
      sendBusinessManagerBI({
        evid: BIEvents.navigateToView, // 566
        prev_sub_view: this.previousSubViewId,
        sub_view: subViewId,
        app_id: this.currentAppDefId,
        hosting: this.hosting,
        msid: this.siteId,
        prev_view: this.previousViewId,
        view: this.currentViewId
      });
    });

    this.unSubscribePageComponentStartLoading = ModuleRegistry.addListener('businessManager.pageComponentStartLoading', async () => {
      this.moduleStartLoadingTime = Date.now();
      this.isNewModuleLoaded = true;
      const loaded = await this.getIsInitialLoad(BIEvents.pageComponentStartLoading);
      await sendBusinessManagerBI({
        evid: BIEvents.pageComponentStartLoading, // 564
        module_id: this.currentPageComponentId,
        app_id: this.currentAppDefId,
        hosting: this.hosting,
        msid: this.siteId,
        prev_module_id: this.previousPageComponentId,
        initial_load: loaded,
        origin: this.getUrlParamValue('origin'),
        referral_info: this.getUrlParamValue('referralInfo'),
        origin_app_id: this.getUrlParamValue('appDefId')
      });
      await this.setAsLoaded(BIEvents.pageComponentStartLoading);
    });

    this.unSubscribePageComponentFinishedLoading = ModuleRegistry.addListener('businessManager.pageComponentReady', async () => {
      const loading_time: number = Date.now() - this.moduleStartLoadingTime;
      await sendBusinessManagerBI({
        evid: BIEvents.pageComponentFinishedLoading, // 565
        loading_time,
        module_id: this.currentPageComponentId,
        app_id: this.currentAppDefId,
        hosting: this.hosting,
        msid: this.siteId,
        initial_load: await this.getIsInitialLoad(BIEvents.pageComponentFinishedLoading),
        origin: this.getUrlParamValue('origin'),
        referral_info: this.getUrlParamValue('referralInfo'),
        origin_app_id: this.getUrlParamValue('appDefId')
      });
      await this.setAsLoaded(BIEvents.pageComponentFinishedLoading);
    });

    this.unSubscribeViewStartLoading = ModuleRegistry.addListener(VIEW_START_LOADING, async subViewId => {
      this.viewStartLoadingTime = Date.now();
      await sendBusinessManagerBI({
        evid: BIEvents.viewStartLoading, // 300
        prev_sub_view: this.previousSubViewId,
        sub_view: subViewId,
        app_id: this.currentAppDefId,
        hosting: this.hosting,
        is_biz_mgr: true,
        msid: this.siteId,
        prev_view: this.previousViewId,
        view: this.currentViewId,
        initial_load: await this.getIsInitialLoad(BIEvents.viewStartLoading),
        origin_app_id: this.getUrlParamValue('appDefId'),
        referral_info: this.getUrlParamValue('referralInfo'),
        origin: this.getUrlParamValue('origin'),
        screen_width: screen.width,
        screen_height: screen.height,
        window_width: window.outerWidth,
        window_height: window.outerHeight
      });

      if (this.currentAppDefId) {
        await sendSdkBI({
          evid: BIEvents.appIntent, // 12
          initiator: 'dashboard',
          app_id: this.currentAppDefId,
          instance_id: this.getAppInstanceId(this.currentAppDefId),
          type: 'OPEN_APP',
          msid: this.siteId
        });
      }

      await this.setAsLoaded(BIEvents.viewStartLoading);
    });
    this.unSubscribeViewFirstInteractive = ModuleRegistry.addListener(VIEW_FIRST_INTERACTIVE, (async (subViewId: string) => {
      const { now, loading_time_from_start } = PageComponentLifecycleBI.getBaseTimeMeasures();
      this.viewFirstInteractiveTime = now;
      const addedFields = {
        loading_time: now - this.viewStartLoadingTime,
        ...(!this.wasFirstEventOfFirstInteractiveCalled && { loading_time_from_start }),
        ...(this.isNewModuleLoaded && { loading_time_from_module: now - this.moduleStartLoadingTime }),
        ...(!this.wasFirstEventOfViewFinishedLoadingCalled && { loading_time_from_performance_now: Math.round(window.performance.now()) } ),
      };
      await this.sendLoadedEvent(BIEvents.viewFirstInteractive, subViewId, addedFields);
      this.wasFirstEventOfFirstInteractiveCalled = true;
      this.previousSubViewId = subViewId;
      this.isNewModuleLoaded = false;
    }));

    this.unSubscribeViewFinishedLoading = ModuleRegistry.addListener(VIEW_FINISHED_LOADING, (async (subViewId: string) => {
      const { now, loading_time_from_start } = PageComponentLifecycleBI.getBaseTimeMeasures();
      const loading_time_from_first_interaction = now - this.viewFirstInteractiveTime;
      const addedFields = {
        loading_time: now - this.viewStartLoadingTime,
        ...(!this.wasFirstEventOfViewFinishedLoadingCalled && { loading_time_from_start }),
        ...(this.isNewModuleLoaded && { loading_time_from_module: now - this.moduleStartLoadingTime }),
        ...(!this.wasFirstEventOfViewFinishedLoadingCalled && { loading_time_from_performance_now: Math.round(window.performance.now()) } ),
        ...(loading_time_from_first_interaction && { loading_time_from_first_interaction })
      };
      await this.sendLoadedEvent(BIEvents.viewFinishedLoading, subViewId, addedFields);
      this.wasFirstEventOfViewFinishedLoadingCalled = true;
      await this.setAsLoaded(BIEvents.viewFinishedLoading);
      this.previousSubViewId = subViewId;
      this.isNewModuleLoaded = false;
    }));
  }

  private static getBaseTimeMeasures() {
    const now = Date.now();
    const timeFromPerfNow = window.performance.now();
    const startLoadingTime = window.__bi_performance_start_time__;
    const loading_time_from_start = Math.round(timeFromPerfNow - startLoadingTime);
    return { now, loading_time_from_start };
  }

  async sendLoadedEvent(eventId: number, subViewId: string, addedFields = {}) {
    await sendBusinessManagerBI({
      evid: eventId,
      prev_sub_view: this.previousSubViewId,
      sub_view: subViewId,
      app_id: this.currentAppDefId,
      is_biz_mgr: true,
      msid: this.siteId,
      hosting: this.hosting,
      view: this.currentViewId,
      prev_view: this.previousViewId,
      initial_load: await this.getIsInitialLoad(BIEvents.viewFinishedLoading),
      origin_app_id: this.getUrlParamValue('appDefId'),
      referral_info: this.getUrlParamValue('referralInfo'),
      origin: this.getUrlParamValue('origin'),
      screen_width: screen.width,
      screen_height: screen.height,
      window_width: window.outerWidth,
      window_height: window.outerHeight,
      ...addedFields
    });
    await this.setAsLoaded(BIEvents.viewFinishedLoading);
  }

  dispose() {
    this.unSubscribePageComponentWillMount.remove();
    this.unSubscribeOnNavigateToPage.remove();
    this.unSubscribePageComponentStartLoading.remove();
    this.unSubscribePageComponentFinishedLoading.remove();
    this.unSubscribeViewStartLoading.remove();
    this.unSubscribeViewFinishedLoading.remove();
    this.unSubscribeViewFirstInteractive.remove();
  }
}
