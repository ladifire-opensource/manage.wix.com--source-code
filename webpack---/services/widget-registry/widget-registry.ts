type BmComponentName = string;
/**
 * A map from Widget ID to BM component name
 */
type WidgetMap = { [key: string]: BmComponentName };

export class WidgetRegistry {
  private widgets: WidgetMap = {};

  getBmComponentName(widgetId: string) {
    return this.widgets[widgetId];
  }

  getAllWidgets() {
    return this.widgets;
  }

  registerWidget(bmComponentName: string, widgetId: string) {
    this.widgets[widgetId] = bmComponentName;
  }
}
