import { ModuleRegistry } from 'react-module-container';
import WidgetLoader from './components/WidgetLoader/WidgetLoader';

ModuleRegistry.registerComponent(
  'chat.InboxHeaderWidgetComponent',
  () => WidgetLoader,
);
