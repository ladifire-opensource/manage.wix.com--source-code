import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PageComponentLinkBuilder, TPageLinkBuilder } from '@wix/business-manager-api';

export type WithPageComponentLinkBuilderProps = PageComponentLinkBuilder & { pageComponentLinkBuilder: TPageLinkBuilder };
export function withPageComponentLinkBuilder<P extends {}>(WrappedComponent: React.ComponentType<P & WithPageComponentLinkBuilderProps>): React.ComponentType<P> {

  return class PageComponentNavigationWrapper extends React.Component<P> {
    public readonly context: {
      pageComponentLinkBuilder: TPageLinkBuilder;
      buildPageComponentLink: PageComponentLinkBuilder['buildPageComponentLink'];
    };

    static contextTypes = {
      pageComponentLinkBuilder: PropTypes.func,
      buildPageComponentLink: PropTypes.func
    };

    render() {
      const newProps = {
        pageComponentLinkBuilder: this.context.pageComponentLinkBuilder,
        buildPageComponentLink: this.context.buildPageComponentLink
      };

      return React.createElement(WrappedComponent, { ...this.props, ...newProps });
    }
  };
}
