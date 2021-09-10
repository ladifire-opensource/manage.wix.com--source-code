import { TFunction } from '@wix/wix-i18n-config';
import { DataType } from '../../../types';

export function getViewAllLinkText(t: TFunction, type: string) {
  switch (type) {
    case DataType.AppMarket:
      return t('searchbox.view-all.app-market');

    case DataType.Contacts:
      return t('searchbox.view-all.contacts');

    case DataType.Answers:
      return t('searchbox.view-all.answers');

    default:
      return t('searchbox.section-title.see-more');
  }
}
