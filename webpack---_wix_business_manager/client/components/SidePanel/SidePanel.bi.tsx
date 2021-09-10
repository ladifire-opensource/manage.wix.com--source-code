import * as React from 'react';
import { ModuleRegistry } from 'react-module-container';
import { sendBusinessManagerBI, getBIHostingApp } from '../../services/BIService';
import { BIEvents } from '../../../common/consts/bi';
import { IViewMode, VIEW_FINISHED_LOADING } from '@wix/business-manager-api';
import { SIDE_PANEL_CLOSE_SOURCE } from './SidePanel';

type SidePanelBiProps = {
  metaSiteId: string;
  viewMode: IViewMode;
};

export const withSidePanelBi = Component => {
  let currentSubViewId, currentViewId;

  ModuleRegistry.addListener(VIEW_FINISHED_LOADING, subViewId => currentSubViewId = subViewId);
  ModuleRegistry.addListener('businessManager.pageComponentWillMount', (pageComponentId: string, appDefId: string) => currentViewId = appDefId || pageComponentId);

  return class SidePanelBi extends React.Component<SidePanelBiProps> {
    private sidePanelOpenTime: number;

    private sendSidePanelBi(evid, data = null) {
      const { metaSiteId, viewMode } = this.props;

      sendBusinessManagerBI({
        evid,
        ...data,
        sub_view: currentSubViewId,
        view: currentViewId,
        hosting: getBIHostingApp(viewMode),
        msid: metaSiteId
      });
    }

    private readonly reportSidePanelOpened = (panelName: string) => {
      this.sidePanelOpenTime = Date.now();
      this.sendSidePanelBi(BIEvents.sidePanelOpened, { panel_name: panelName }); // 598
    }

    private readonly reportSidePanelLoaded = (panelName: string) => {
      const loading_time = Date.now() - this.sidePanelOpenTime;
      this.sendSidePanelBi(BIEvents.sidePanelLoaded, { loading_time, panel_name: panelName }); // 599
    }

    private readonly reportSidePanelClosed = (source: SIDE_PANEL_CLOSE_SOURCE, panelName: string) => {
      this.sendSidePanelBi(BIEvents.sidePanelClosed, { source, panel_name: panelName }); // 600
    }

    render() {
      return <Component
        {...this.props}
        reportSidePanelOpened={this.reportSidePanelOpened}
        reportSidePanelLoaded={this.reportSidePanelLoaded}
        reportSidePanelClosed={this.reportSidePanelClosed}
      />;
    }
  };
};
