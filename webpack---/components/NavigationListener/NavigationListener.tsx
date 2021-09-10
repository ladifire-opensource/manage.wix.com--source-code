import * as React from 'react';
import * as queryString from 'query-string';
import { connect } from 'react-redux';
import { performSearch } from '../../actions/search';
import { ModuleRegistry } from 'react-module-container';

class NavigationListenerComponent extends React.PureComponent<{ performSearch: any }> {
  private readQueryValueFromQueryString = (location: Location) => {
    if (location) {
      const queryParams = queryString.parse(location.search);
      if (queryParams.referralInfo !== 'search') {
        this.props.performSearch('');
      }
    }
  }

  constructor(props) {
    super(props);

    this.readQueryValueFromQueryString(window.location);
    ModuleRegistry.addListener('businessManager.onNavigationCompleted', this.readQueryValueFromQueryString);
  }

  render () {
    return null;
  }
}

export const NavigationListener = connect(null, { performSearch })(NavigationListenerComponent);
