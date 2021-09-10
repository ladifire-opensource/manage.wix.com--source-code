import * as React from 'react';
import {
  pageLinkBuilderFactory,
  TPageLinkBuilder,
  IPageComponentsInfo,
  isExternalPageLink
} from '@wix/business-manager-api';
import * as PropTypes from 'prop-types';
import * as URI from 'urijs';

interface TModuleNavigationProviderProps {
  metaSiteId: string;
  pageComponentsInfo: IPageComponentsInfo;
  basename: string;
}

export class PageComponentLinkBuilderProvider extends React.Component<TModuleNavigationProviderProps> {
  private readonly m_pageComponentLinkBuilder: TPageLinkBuilder;

  static childContextTypes = {
    pageComponentLinkBuilder: PropTypes.any.isRequired,
    buildPageComponentLink: PropTypes.any.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.m_pageComponentLinkBuilder = pageLinkBuilderFactory(
      props.metaSiteId,
      props.pageComponentsInfo
    );
  }

  buildPageComponentLink(moduleId: string, contextData?: any) {
    const resultUrl = this.m_pageComponentLinkBuilder(moduleId, contextData);
    if (!resultUrl) {
      return;
    }

    const isFullUrl = (/(^\/\/)|(^https?:)/).test(resultUrl) || isExternalPageLink(resultUrl);
    if (isFullUrl) {
      return resultUrl;
    }

    const uri = new URI(resultUrl);
    uri.pathname(URI.joinPaths(this.props.basename, uri.pathname()).toString());
    return uri.toString();
  }

  getChildContext() {
    return {
      pageComponentLinkBuilder: this.m_pageComponentLinkBuilder,
      buildPageComponentLink: this.buildPageComponentLink.bind(this)
    };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}
