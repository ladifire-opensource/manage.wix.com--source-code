import { IState } from '../../types/store';
import { buildModuleParams } from './buildModuleParams';
import { PageComponentProps } from '@wix/business-manager-api';

export type TMapStateToPageComponentProps = (state: IState, ownProps) => PageComponentProps;

export function buildMapStateToPageComponentProps(appDefId: string, config = {}): TMapStateToPageComponentProps {
  return (state, ownProps): PageComponentProps => {
    return {
      ...buildModuleParams(state, appDefId, config),
      routeBaseName: ownProps.router.location.basename,
      config
    };
  };
}
