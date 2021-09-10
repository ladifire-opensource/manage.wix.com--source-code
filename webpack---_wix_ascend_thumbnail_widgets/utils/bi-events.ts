import { Logger } from '@wix/bi-logger-wix-promote';
import { getReferralInfo } from '.';

export type CtaType = 'EDIT_TEMPLATE';

export type WidgetName =
  | 'social-post-templates'
  | 'shoutout-templates'
  | 'video-templates';

export default class PromoteBiEventsFactory {
  private widgetName: WidgetName;
  private biLogger: Logger;
  constructor(biLogger: Logger, metaSiteId: string, widgetName: WidgetName) {
    this.widgetName = widgetName;
    biLogger.util.updateDefaults({
      msid: metaSiteId,
      referral_info: getReferralInfo(),
    });
    this.biLogger = biLogger;
  }

  private widgetCtaClick(ctaType: CtaType, isPrimary: boolean) {
    this.biLogger.promoteHomeWidgetCtaClick({
      widget_name: this.widgetName,
      cta_type: ctaType,
      is_primary_cta: isPrimary,
    });
  }

  public widgetLoaded() {
    this.biLogger.promoteHomeWidgetLoad({
      widget_name: this.widgetName,
    });
  }

  public widgetViewed() {
    this.biLogger.promoteHomeWidgetView({
      widget_name: this.widgetName,
    });
  }

  public widgetLoadError(error: any) {
    this.biLogger.promoteHomeWidgetFailedLoading({
      widget_name: this.widgetName,
      error_data: JSON.stringify(error.response?.data || error.message),
    });
  }

  public socialPostTemplateClick({
    position,
    templateId,
    intentId,
    presetId,
  }: {
    position?: number;
    templateId?: string;
    intentId?: string;
    presetId?: string;
  }) {
    this.biLogger.promoteHomeSocialPostTemplateClick({
      template_id: templateId,
      intent_id: intentId,
      preset_id: presetId,
      position_in_row: position,
    });

    this.widgetCtaClick('EDIT_TEMPLATE', true);
  }

  public emailTemplateClick({
    position,
    templateId,
    templateName,
  }: {
    position?: number;
    templateId?: string;
    templateName?: string;
  }) {
    this.biLogger.promoteHomeShoutoutTemplateClick({
      template_id: templateId,
      position_in_row: position,
      template_name: templateName,
    });

    this.widgetCtaClick('EDIT_TEMPLATE', true);
  }
}
