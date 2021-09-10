import {ReactLazyComponent} from 'react-module-container';

export class PagePermissionsWidgetLazyComponent extends ReactLazyComponent {
  static minifiedFiles = [
    'page-permissions-widget.bundle.min.js',
    'page-permissions-widget.min.css'
  ];

  constructor(props) {
    super(props, {
      files: PagePermissionsWidgetLazyComponent.getFiles(props.staticsUrl),
      component: 'page-permissions-widget'
    });
  }

  static getFiles(memberPermissionsStaticsUrl) {
    const files = PagePermissionsWidgetLazyComponent.minifiedFiles;
    return files.map(relativePath => `${memberPermissionsStaticsUrl}${relativePath}`);
  }
}
