import React, { Component, ComponentType } from 'react';
import { InjectedUnseenCountProps, withUnseenCount } from '@wix/chat-web';
import { Subtract } from 'utility-types';
import { compose, renameProps } from 'recompose';
import { getInstanceId } from '../../services/BusinessManagerService';

const withCurriedUnseenCount =
  (filter) =>
  <P extends InjectedUnseenCountProps>(Comp: ComponentType<P>) =>
    withUnseenCount<P>(Comp, filter);

export interface InjectedThisSiteUnseenCountProps {
  thisSiteUnseenCount?: number;
  thisSiteUnseenOverflow?: boolean;
}

export interface InjectedAllSitesUnseenCountProps {
  allSitesUnseenCount?: number;
  allSitesUnseenOverflow?: boolean;
}

export interface InjectedUnseenCountsProps
  extends InjectedThisSiteUnseenCountProps,
    InjectedAllSitesUnseenCountProps {}

export interface UnseenCountsState {
  wrapped: ComponentType<any>;
}

export const withUnseenCounts = <P extends InjectedUnseenCountsProps>(
  Comp: ComponentType<P>,
) => {
  const withAllSitesUnseenCount = compose<any, any>(
    withCurriedUnseenCount({ participantType: 'business' }),
    renameProps({
      unseenCount: 'allSitesUnseenCount',
      unseenOverflow: 'allSitesUnseenOverflow',
    }),
  );

  return class extends Component<
    Subtract<P, InjectedUnseenCountsProps>,
    UnseenCountsState
  > {
    constructor(props: Subtract<P, InjectedUnseenCountsProps>) {
      super(props);
      this.state = { wrapped: null };
    }

    componentDidMount() {
      const instanceId = getInstanceId();

      let wrapped: ComponentType<any> = withAllSitesUnseenCount(Comp);

      if (instanceId) {
        const withThisSitesUnseenCount = compose<any, any>(
          withCurriedUnseenCount({ participantId: instanceId }),
          renameProps({
            unseenCount: 'thisSiteUnseenCount',
            unseenOverflow: 'thisSiteUnseenOverflow',
          }),
        );
        wrapped = withThisSitesUnseenCount(wrapped);
      }

      this.setState({ wrapped });
    }

    render() {
      const { wrapped: WrappedComponent } = this.state;
      return WrappedComponent ? <WrappedComponent {...this.props} /> : null;
    }
  };
};
