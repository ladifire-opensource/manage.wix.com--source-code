import { ReactLazyComponent } from 'react-module-container';
import { TPrefetchParams } from '@wix/business-manager-api';
import { ASSIGNEE_DROPDOWN_COMPONENT } from './consts';

const minified = (debug) => (debug ? '' : '.min');

const prepareFiles = (filePaths: string[], props: TPrefetchParams) => {
  return filePaths.map(
    (relativePath) => `${props.config.topology.staticsUrl}${relativePath}`,
  );
};

const files = ({ debug }) => {
  return [
    `assignee-dropdown.bundle${minified(debug)}.js`,
    `assignee-dropdown${minified(debug)}.css`,
  ];
};

const addContributorMinifiedFiles = (props: TPrefetchParams) => {
  return [
    `${props.config.topology.siteActionsStaticsUrl}add-contributor-dialog-lazy-component.bundle.min.js`,
  ];
};

export class AssigneeDropdownLazyComponent extends ReactLazyComponent<any> {
  constructor(props) {
    super(props, {
      files: [
        ...prepareFiles(files(props), props),
        ...addContributorMinifiedFiles(props),
      ],
      component: ASSIGNEE_DROPDOWN_COMPONENT,
    });
  }

  static prefetch(props: TPrefetchParams) {
    return [
      ...prepareFiles(files(props), props),
      ...addContributorMinifiedFiles(props),
    ];
  }
}
