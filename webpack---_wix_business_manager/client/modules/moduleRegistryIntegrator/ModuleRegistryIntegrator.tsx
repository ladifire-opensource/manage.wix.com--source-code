import * as React from 'react';
import { storeIntegrationMethods } from './storeContextExposedMethods';
import { ModuleRegistry } from 'react-module-container';
import {
  IPageComponentsInfo,
  NAVIGATE_TO,
  NAVIGATE_TO_AND_SHOW_BACK_TOAST,
  BUILD_PAGE_COMPONENT_LINK,
  PAGE_LINK_COMPONENT
} from '@wix/business-manager-api';
import { navigateFactory } from './navigate';
import { PayloadManager } from '../../utils/payloadManager/PayloadManager';
import { connect } from 'react-redux';
import { IState } from '../../types/store';
import * as PropTypes from 'prop-types';
import {
  INavigateToPageFactoryConfig,
  navigateToPageFactory,
  navigateToPageAndShowBackToastFactory
} from '../../external-api/navigate-to-page/navigateToPage';
import { PageComponentLinkImpl } from '../../navigation/PageComponentLink';
import { getPageComponentsInfo } from '../../selectors/pageComponentsSelectors';
import { withPageComponentLinkBuilder, WithPageComponentLinkBuilderProps } from '../../navigation/withPageComponentLinkBuilder';
import { showToast, ShowToastActionCreator, RemoveToastActionCreator, removeToast } from '../../actions/toastActions';

interface IModuleRegistryIntegratorProps extends WithPageComponentLinkBuilderProps {
  pageComponentsInfo: IPageComponentsInfo;
  showToast: ShowToastActionCreator;
  removeToast: RemoveToastActionCreator;
}

class ModuleRegistryIntegratorImpl extends React.Component<IModuleRegistryIntegratorProps> {
  public readonly context: {
    router: any;
    store: any;
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.registerNavigateToPage();
    this.registerBuildPageComponentLink();
    this.registerPageComponentLinkComponent();
    this.registerStoreIntegrations();
    this.registerDeprecatedFunctions();
  }

  private registerNavigateToPage() {
    const navigate = navigateFactory(this.context.router, window, location);
    const payloadManager = new PayloadManager();
    const navigateToPageFactoryConfig: INavigateToPageFactoryConfig = {
      navigate,
      payloadManager,
      pageComponentLinkBuilder: this.props.pageComponentLinkBuilder,
      pageComponentsInfo: this.props.pageComponentsInfo
    };

    const navigateToPage = navigateToPageFactory(navigateToPageFactoryConfig);
    ModuleRegistry.registerMethod(NAVIGATE_TO, () => navigateToPage);
    ModuleRegistry.registerMethod(NAVIGATE_TO_AND_SHOW_BACK_TOAST, () => navigateToPageAndShowBackToastFactory(navigateToPage, this.props.showToast, this.props.removeToast));
  }

  private registerBuildPageComponentLink() {
    ModuleRegistry.registerMethod(BUILD_PAGE_COMPONENT_LINK, () => this.props.buildPageComponentLink);
  }

  private registerPageComponentLinkComponent() {
    ModuleRegistry.registerComponent(PAGE_LINK_COMPONENT, () => {
      return props => React.createElement(PageComponentLinkImpl, {
        ...props,
        pageComponentLinkBuilder: this.props.pageComponentLinkBuilder
      });
    });
  }

  // -----------------------------DEPRECATED-----------------------------
  private registerDeprecatedFunctions() {
    ModuleRegistry.registerMethod('businessManager.buildModuleLink', () => this.props.buildPageComponentLink);
    ModuleRegistry.registerComponent('businessManager.ModuleLink', () => {
      return props => React.createElement(PageComponentLinkImpl, {
        ...props,
        pageComponentLinkBuilder: this.props.pageComponentLinkBuilder
      });
    });
  }

  private registerStoreIntegrations() {
    const store = this.context.store;

    for (const methodKey in storeIntegrationMethods) {
      ModuleRegistry.registerMethod(methodKey, () => (...args) => {
        const storeData = store.getState();
        return storeIntegrationMethods[methodKey](storeData)(...args);
      });
    }
  }

  render() {
    return null;
  }
}

function mapStateToProps(state: IState) {
  return {
    pageComponentsInfo: getPageComponentsInfo(state)
  };
}

export const ModuleRegistryIntegrator = connect(mapStateToProps, {
  showToast,
  removeToast
})(withPageComponentLinkBuilder(ModuleRegistryIntegratorImpl));
