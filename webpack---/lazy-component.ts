import { inboxSettingsComponentName } from './components';
import { createLazyComponent } from './services/bmUtils';

export const InboxSettingsLazyComponent = createLazyComponent({
  componentName: inboxSettingsComponentName,
  bundleFile: 'inbox-settings', // should be in sync with app's entry-point name in package.json
});
