import { ModuleRegistry } from 'react-module-container';

import { ComponentIds } from '../constants/enums';
import { DashboardNextWrapper } from '../widgets/DashboardWidget/DashboardNext';

ModuleRegistry.registerComponent(ComponentIds.dashboardNext, () => DashboardNextWrapper);
