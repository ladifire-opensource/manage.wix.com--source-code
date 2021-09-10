import { ColumnsNames } from './components/ContactsListPage/ContactsTable/columns/columns-names';
import { ColumnsTranslations } from './components/ContactsListPage/ContactsTable/columns/columns-translations';
import { FieldsNames } from './components/ContactsListPage/ContactsTable/columns/fields-names';

const RESERVED_FIELD_NAMES = [
  'name',
  'firstName',
  'first_name',
  'first name',
  'lastName',
  'last_name',
  'last name',
  'email',
  'emails',
  'phone',
  'phones',
  'address',
  'addresses',
  'lastActivity',
  'last_activity',
  'last activity',
  '# Of Purchases',
  'numPurchases',
  'total spent',
  'totalPurchases',
  'id',
  'updatedAt',
  'createdAt',
  'source',
  'labels',
  'position',
  'company',
  'picture',
  'customFields',
  'custom_fields',
  'custom fields',
  'city',
  'country',
  'state',
  'street',
  'zip',
  'zip code',
  'region',
  'postalCode',
  'assignee',
  'language_tag',
  'created_at',
  'modified_at',
  'birthday',
  'anniversary',
].map((n) => n.toLowerCase());
const StringIsNumber = (value) => isNaN(Number(value)) === false;

export class CustomFieldsTranslator {
  translations;

  isReservedFieldName = async (name, locale = 'en') => {
    if (!this.translations) {
      this.translations = await import(`./assets/locale/messages_${locale}`);
    }

    if (!name) {
      return false;
    }
    const lcName = name.toLowerCase();
    if (RESERVED_FIELD_NAMES.find((field) => field === lcName)) {
      return true;
    }

    for (const defaultField in ColumnsNames) {
      const key = ColumnsTranslations[ColumnsNames[defaultField]];
      if (key) {
        const translatedFieldName = this.translations[key];
        if (
          translatedFieldName &&
          translatedFieldName.toLowerCase() === lcName
        ) {
          return true;
        }
      }
    }

    for (const defaultField in FieldsNames) {
      const key = FieldsNames[defaultField];
      if (key) {
        const translatedFieldName = this.translations[key];
        if (
          translatedFieldName &&
          translatedFieldName.toLowerCase() === lcName
        ) {
          return true;
        }
      }
    }

    return false;
  };
}
