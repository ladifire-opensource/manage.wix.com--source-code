import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as React from 'react';
import Widget from '../Widget/Widget';
import { connectToChatSdk } from '../../services/chatSDKService';
import { i18n } from 'i18next';
import { I18nextProvider } from 'react-i18next';
import i18nClient from '../../i18n';
import { conductScopes } from '../../services/serverApi/serverApi';
import { ExperimentsProvider } from '@wix/wix-experiments-react';
import { ExperimentsBag } from '@wix/wix-experiments';
import { FontUpgrade } from 'wix-style-react';

export type WidgetView = 'site_level' | 'account_level';

interface WidgetLoaderProps {
  view: WidgetView;
  locale: string;
  experiments?: any;
}

interface WidgetLoaderState {
  ready: boolean;
  i18n: i18n;
  experiments: ExperimentsBag;
}

class WidgetLoader extends React.Component<
  WidgetLoaderProps,
  WidgetLoaderState
> {
  constructor(props: WidgetLoaderProps) {
    super(props);
    this.state = {
      i18n: undefined,
      ready: false,
      experiments: {},
    };
  }

  async componentDidMount() {
    this.setState({ i18n: i18nClient(this.props.locale) });

    const experiments = {
      ...this.props.experiments,
      ...(await conductScopes(['chat', 'my-account'])),
      'specs.chat.GlobalUnreadRoomsCounter': 'true',
    };

    this.setState({ experiments });

    await connectToChatSdk(experiments, this.props.view);

    this.setState({ ready: true });
  }

  render() {
    const { ready, i18n: i18nInstance, experiments } = this.state;

    if (!ready) {
      return null;
    }

    const useMadeforFont =
      this.state.experiments['specs.chat.MadeFor'] === 'true';

    return (
      <div data-hook="widget-loader">
        <ExperimentsProvider options={{ experiments }}>
          <I18nextProvider i18n={i18nInstance}>
            <FontUpgrade as="div" active={useMadeforFont}>
              <Widget view={this.props.view} />
            </FontUpgrade>
          </I18nextProvider>
        </ExperimentsProvider>
      </div>
    );
  }
}

export default WidgetLoader;
