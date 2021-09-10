import * as React from 'react';
import { hideSidePanelLoadingSignal } from '@wix/business-manager-api';
import { BrokenComponentErrorPage } from '../ErrorPages/ErrorPages';
import * as css from './SidePanel.scss';

class SidePanelErrorPage extends React.Component<any> {
  componentDidMount() {
    hideSidePanelLoadingSignal();
  }

  render() {
    return (<div data-hook="sidepanel-error-page" className={css.errorWrapper}>
      <BrokenComponentErrorPage location="business-manager-sidepanel" />
    </div>);
  }
}

export default SidePanelErrorPage;
