import {ReactLazyComponent} from 'react-module-container';

export class MemberPermissionsLazyComponent extends ReactLazyComponent {
  static debugFiles = [
    'member-permissions-page-component.bundle.js',
    'member-permissions-page-component.css'
  ];
  static minifiedFiles = [
    'member-permissions-page-component.bundle.min.js',
    'member-permissions-page-component.min.css'
  ];

  constructor(props) {
    super(props, {
      files: MemberPermissionsLazyComponent.getFiles(props),
      component: 'member-permissions-page-component'
    });
  }

  static getFiles(props) {
    let files;
    if (props.debug) {
      files = MemberPermissionsLazyComponent.debugFiles;
    } else {
      files = MemberPermissionsLazyComponent.minifiedFiles;
    }
    return files.map(
      relativePath => `${props.config.topology.memberPermissionsStaticsUrl}${relativePath}`
    );
  }
}
