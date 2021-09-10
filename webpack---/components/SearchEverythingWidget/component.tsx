import * as React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider, i18n as I18N } from '@wix/wix-i18n-config';
import { fedopsLogger, configureFedopsLogger } from '../../services/fedops/fedops';
import { IStoreState } from '../../types/store';
import i18n from '../../i18n';
import { Store } from 'redux';
import { configureStore } from '../../store/configureStore';
import SearchBox from '../SearchBox/SearchBox.container';
import { NavigationListener } from '../NavigationListener/NavigationListener';
import { initializeServices } from '../../services/initialize-services';
import { FontUpgrade } from 'wix-style-react';

export interface SearchEverythingWidgetProps {
  locale: string;
  debug?: boolean;
  metaSiteId?: string;
  origin?: string;
  onOpen?(): void;
  experiments?: any;
  isADIEditorType?: boolean;
}

export interface SearchEverythingWidgetState {
  isReady: boolean;
}

export class SearchEverythingWidget extends React.Component<SearchEverythingWidgetProps, SearchEverythingWidgetState> {

  private store: Store<IStoreState>;
  private i18n: I18N;

  constructor(props: SearchEverythingWidgetProps) {
    super(props);

    const { locale, debug, metaSiteId, isADIEditorType, experiments } = props;
    this.i18n = i18n({ locale });

    configureFedopsLogger();

    const initialState: Partial<IStoreState> = {
      metaSiteId,
      isADIEditorType,
      experiments,
      locale,
      debug
    };

    this.store = configureStore(initialState, null);
  }

  componentDidMount() {
    fedopsLogger.appLoaded();
    initializeServices();
  }

  render() {
    return (
      <Provider store={this.store}>
        <I18nextProvider i18n={this.i18n}>
          <FontUpgrade>
            <NavigationListener />
            <SearchBox />
          </FontUpgrade>
        </I18nextProvider>
      </Provider>
    );
  }
}
