import * as React from 'react';
import {
  VeloComponentOptions,
  TModuleParams,
  notifyViewStartLoading,
} from '@wix/business-manager-api';
import * as s from './VeloWrapper.scss';
import { omit } from 'lodash';
import { iframeMessageBridge, boltIframeMessageBridge } from '@wix/business-manager-iframe-bridge';
import { ModuleRegistry } from 'react-module-container';
import { getAppPort, clearAppPort } from '@wix/santa-application-channel'; // TODO: Remove dependency when no longer supporting Bolt
import * as URI from 'urijs';
import { HackyTemporarySecretsManagerLightBoxOverlay } from './HackyTemporarySecretsManagerLightBoxOverlay';
import { bindActionCreators, Store } from 'redux';
import { IState } from '../../types/store';
import { hideOverlay, showOverlay } from '../../actions/overlayActions';
import { experimentsSelectors } from '../../services/essentials';

interface VeloWrapperBaseProps extends VeloComponentOptions { moduleParams: TModuleParams; componentName: string }
interface VeloWrapperProps extends VeloWrapperBaseProps { hideOverlay: () => void; showOverlay: () => void, useOverlayComponent: boolean}

const moduleParamsToOmit: (keyof TModuleParams)[ ] = ['metaSiteId', 'userId', 'userRole'];
const queriesToPassthrough = ['siteRevision', 'wixcode-namespaces-override', 'petri_ovr'];

class VeloWrapper extends React.Component<VeloWrapperProps> {
  private iframeRef = React.createRef<HTMLIFrameElement>();
  private closeBridge: () => void = null;

  private getUrl() {
    const { url } = this.props;
    const currentLocationSearch = new URI(location.href).search(true);
    const iframeUri = new URI(url);

    queriesToPassthrough.forEach(key => {
      if (currentLocationSearch[key] && !iframeUri.hasSearch(key)) {
        iframeUri.setSearch({ [key]: currentLocationSearch[key] });
      }
    });

    return iframeUri.toString();
  }

  private openIframeMessageBridge() {
    const { moduleParams, showOverlay, hideOverlay } = this.props;
    const filteredModuleParams = omit(moduleParams, moduleParamsToOmit);
    const methods = {
      invoke(...args) {
        return ModuleRegistry.invoke(...args);
      },

      notifyListeners(...args) {
        return ModuleRegistry.notifyListeners(...args);
      },

      addListener(...args) {
        return ModuleRegistry.addListener(...args);
      },

      openLightbox() {
        showOverlay();
      },

      closeLightbox() {
        hideOverlay();
      },

      getModuleParams() {
        return filteredModuleParams;
      }
    };

    // We need to be backwards and forwards compatible so we want to have both Bolt and Thunderbolt hooks available
    // For TB:
    iframeMessageBridge(this.iframeRef.current, methods);
    // For Bolt:
    getAppPort(this.iframeRef.current, 'business-manager').then((port: MessagePort) => {
      boltIframeMessageBridge(port, methods);
      this.closeBridge = () => {
        port.close();
        clearAppPort('business-manager');
      };
    });
  }

  componentDidMount() {
    const { componentName } = this.props;

    notifyViewStartLoading(componentName);
    this.openIframeMessageBridge();
  }

  componentWillUnmount() {
    if (this.closeBridge) {
      this.closeBridge();
    }
  }

  render() {
    const { useOverlayComponent } = this.props;
    return (
      <React.Fragment>
        {!useOverlayComponent && <HackyTemporarySecretsManagerLightBoxOverlay/>}
        {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
        <iframe src={this.getUrl()} className={s.wrapper} frameBorder="0" data-hook="velo-wrapper" ref={this.iframeRef} />
      </React.Fragment>
    );
  }
}

// The reason for using this strange construct instead of a connected component is to support hosting the component in nested
// components which may have there own redux Provider. It's possible to solve this by passing a `storeKey` option in connect
// but this changes in newer versions of react-redux to use the newer Context API.
type BuildVeloWrapper = (store: Store<IState>) => React.ComponentType<VeloWrapperBaseProps>;
export const buildVeloWrapper: BuildVeloWrapper = (store: Store<IState>) => {
  const boundActionCreators = bindActionCreators({ showOverlay, hideOverlay }, store.dispatch);
  const useOverlayComponentEnabled = experimentsSelectors(store.getState()).enabled('specs.wosbm.useNewOverlayComponent');

  return (props: VeloWrapperBaseProps) => <VeloWrapper {...props} {...boundActionCreators} useOverlayComponent={useOverlayComponentEnabled} />;
};
