import _ from 'lodash';

export class Tabs {
  constructor() {
    this.tabConfiguration = {};
  }

  config(sourceModule, config) {
    const tabConfig = { ...config, sourceModule };
    this.tabConfiguration[sourceModule] = [
      ...(this.tabConfiguration[sourceModule] || []),
      tabConfig,
    ];
  }

  getTabConfiguration() {
    return _.flatMap(
      Object.keys(this.tabConfiguration),
      (tab) => this.tabConfiguration[tab],
    );
  }
}
