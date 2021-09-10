import { ModuleRegistry } from 'react-module-container';
import { REGISTER_WIDGET_METHOD, } from '@wix/business-dashboard-common';
/**
 * Registers provided component as a widget in Business Dashboard
 * @param widgetOptions a widget and it's options to be registered in the Dashboard
 */
export var registerWidget = function (widgetOptions) {
    return ModuleRegistry.invoke(REGISTER_WIDGET_METHOD, widgetOptions);
};
//# sourceMappingURL=widgets-registry.js.map