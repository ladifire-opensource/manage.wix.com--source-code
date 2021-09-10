import * as React from 'react';
import { SmartLink } from './SmartLink';
import { withPageComponentLinkBuilder, WithPageComponentLinkBuilderProps } from './withPageComponentLinkBuilder';
import { PageComponentId } from '@wix/business-manager-api';

interface IProps {
  pageComponentId: PageComponentId;
  contextData?: any;
  openInNewTab?: boolean;
  [prop: string]: any;
}

export const PageComponentLinkImpl: React.FunctionComponent<IProps & WithPageComponentLinkBuilderProps> = (props: IProps) => {
  const linkTo = props.pageComponentLinkBuilder(props.pageComponentId, props.contextData);
  const extraProps = { ...props };
  if (props.openInNewTab) {
    extraProps.target = '_blank';
  }
  delete extraProps.pageComponentId;
  delete extraProps.openInNewTab;
  delete extraProps.contextData;
  delete extraProps.pageComponentLinkBuilder;
  delete extraProps.buildPageComponentLink;
  return <SmartLink to={linkTo} {...extraProps}>{props.children}</SmartLink>;
};

export const PageComponentLink = withPageComponentLinkBuilder(PageComponentLinkImpl);
