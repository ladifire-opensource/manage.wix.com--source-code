import { appDefIds, getCurrentInstance } from '@wix/business-manager-api';
import { AnalyticsNgServer } from '@wix/ambassador-analytics-ng-server/http';
import axios from 'axios';
import FileDownload from 'js-file-download';

import { getDomain } from './siteData';

const serverBaseUrl = '/analytics-ng';

class Api {
  private serverInstance;
  private scheduleServerInstance;
  private groupsServerInstance;
  private alertsServerInstance;
  private insightsServerInstance;
  private benchmarksServerInstance;
  private unsubscribeServerInstance;
  private forecastServerInstance;

  server() {
    const token = getCurrentInstance(appDefIds.metaSite);

    if (!this.serverInstance) {
      this.serverInstance = AnalyticsNgServer(serverBaseUrl).DashboardService()({
        Authorization: token,
      });
    }
    return this.serverInstance;
  }

  downloadReport(downloadFile: string) {
    const token = getCurrentInstance(appDefIds.metaSite);
    const domain = getDomain();

    return axios({
      method: 'get',
      url: `${domain}/analytics-ng${downloadFile}`,
      headers: { Authorization: token },
      responseType: 'arraybuffer',
    })
      .then(({ data, headers }) => {
        const fileName = headers['content-disposition'].split(';')[1].split('=')[1];

        FileDownload(data, fileName);
      })
      .catch(() => {
        throw new Error();
      });
  }

  scheduleServer() {
    const token = getCurrentInstance(appDefIds.metaSite);

    if (!this.scheduleServerInstance) {
      this.scheduleServerInstance = AnalyticsNgServer(serverBaseUrl).ScheduledPlanService()({
        Authorization: token,
      });
    }
    return this.scheduleServerInstance;
  }

  groupsServer() {
    const token = getCurrentInstance(appDefIds.metaSite);

    if (!this.groupsServerInstance) {
      this.groupsServerInstance = AnalyticsNgServer(serverBaseUrl).DashboardGroupService()({
        Authorization: token,
      });
    }
    return this.groupsServerInstance;
  }

  alertsServer() {
    const token = getCurrentInstance(appDefIds.metaSite);

    if (!this.alertsServerInstance) {
      this.alertsServerInstance = AnalyticsNgServer(serverBaseUrl).AlertsService()({
        Authorization: token,
      });
    }
    return this.alertsServerInstance;
  }

  insightsServer() {
    const token = getCurrentInstance(appDefIds.metaSite);

    if (!this.insightsServerInstance) {
      this.insightsServerInstance = AnalyticsNgServer(serverBaseUrl).InsightsService()({
        Authorization: token,
      });
    }
    return this.insightsServerInstance;
  }

  benchmarksServer() {
    const token = getCurrentInstance(appDefIds.metaSite);

    if (!this.benchmarksServerInstance) {
      this.benchmarksServerInstance = AnalyticsNgServer(serverBaseUrl).IndustryBenchmarkService()({
        Authorization: token,
      });
    }
    return this.benchmarksServerInstance;
  }

  getArticle(uri: string, locale: string) {
    return axios({
      method: 'get',
      url: `https://manage.wix.com/_serverless/ans-cs-wrapper-temp/articles/uri/${uri}?locale=${locale}`,
    });
  }

  unsubscribeServer() {
    const token = getCurrentInstance(appDefIds.metaSite);

    if (!this.unsubscribeServerInstance) {
      this.unsubscribeServerInstance = AnalyticsNgServer(serverBaseUrl).UnsubscribeService()({
        Authorization: token,
      });
    }
    return this.unsubscribeServerInstance;
  }

  forecastServer() {
    const token = getCurrentInstance(appDefIds.metaSite);

    if (!this.forecastServerInstance) {
      this.forecastServerInstance = AnalyticsNgServer(serverBaseUrl).ForecastService()({
        Authorization: token,
      });
    }
    return this.forecastServerInstance;
  }

  getAppData() {
    return axios({
      method: 'get',
      url: `https://manage.wix.com/_serverless/restaurants-site-data/ordersAppData`,
      headers: { Authorization: getCurrentInstance(appDefIds.metaSite) },
    });
  }
}

export default new Api();
