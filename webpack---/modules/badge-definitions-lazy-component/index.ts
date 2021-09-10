import React from 'react';
import { ReactLazyComponent } from 'react-module-container';

import { BusinessManager } from '../../services/business-manager';

export class BadgeDefinitionsLazyComponent extends (ReactLazyComponent as React.ComponentClass<BusinessManagerComponentProps>) {
  constructor(props: BusinessManagerComponentProps) {
    super(props, BusinessManager.createManifest(props));
  }
}
