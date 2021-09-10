import * as React from 'react';
import * as PropTypes from 'prop-types';
import { getEmbeddedServiceById } from '../../selectors/embeddedServicesSelectors';

export const withGetInstanceId = (Componet) => {
  return class ContextConsumer extends React.Component<any, any> {
    public readonly context: {
      store: any;
    };

    static contextTypes = { store: PropTypes.object.isRequired };

    getInstanceId = (appDefinitionId: string) => {
      return getEmbeddedServiceById(this.context.store.getState(), appDefinitionId).instanceId;
    }

    render() {
      return <Componet {...this.props}
                getInstanceId={this.getInstanceId}/>;
    }
  };
};
