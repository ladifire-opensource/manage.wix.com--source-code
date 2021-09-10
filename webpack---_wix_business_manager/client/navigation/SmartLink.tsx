import * as React from 'react';
import { Link } from 'react-router';
import { isExternalPageLink } from '@wix/business-manager-api';

interface IProps {
  to: string;
  [prop: string]: any;
}

export class SmartLink extends React.Component<IProps> {
  render() {
    const { to, children, ...extraProps } = this.props;
    if (!to) {
      return <a onClick={() => { throw new Error('Unknown URL'); }}>{children}</a>; // eslint-disable-line jsx-a11y/anchor-is-valid
    }
    if (/(^\/\/)|(^https?:)/.test(this.props.to) || isExternalPageLink(to)) {
      return <a href={to} {...extraProps}>{children}</a>;
    }
    return <Link to={to} {...extraProps}>{children}</Link>;
  }
}
