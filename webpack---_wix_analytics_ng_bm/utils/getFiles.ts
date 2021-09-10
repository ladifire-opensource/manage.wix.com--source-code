import { TModuleParams } from '@wix/business-manager-api';

export const getFiles = (bundleName: string, props: any) => {
  const moduleParams: TModuleParams = props.moduleParams;

  const extension = moduleParams.debug ? '' : '.min';

  return [
    `${moduleParams.config.topology.staticsUrl}${bundleName}.bundle${extension}.js`,
    `${moduleParams.config.topology.staticsUrl}${bundleName}${extension}.css`,
  ];
};
