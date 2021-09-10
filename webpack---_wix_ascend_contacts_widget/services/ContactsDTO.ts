import {
  V4ListContactsResponse,
  ContactActivityType,
  V4Contact,
} from '@wix/ambassador-contacts-app/types';
import { MAP_ACTIVITY_TO_KEY } from '../constants';
import { ContactDataElement } from '../internal-types';

const mapActivityToKey = (activity: ContactActivityType | undefined) => {
  return (
    MAP_ACTIVITY_TO_KEY[activity ?? ContactActivityType.CONTACT_CREATED] ??
    'contacts-widget.contact.lastActivityContactCreated'
  );
};

const isToday = (someDate: Date) => {
  const today = new Date();
  const requestedDate = new Date(someDate);
  return (
    requestedDate.getDate() === today.getDate() &&
    requestedDate.getMonth() === today.getMonth() &&
    requestedDate.getFullYear() === today.getFullYear()
  );
};

const formatDate = (
  date: Date | string | undefined,
  locale: string,
  options: Intl.DateTimeFormatOptions = {
    year: undefined,
    month: 'long',
    day: 'numeric',
    hour: undefined,
    minute: undefined,
  },
) => {
  if (date) {
    // Because of yoshi type inconsistency, need to make sure the object is indeed of type Date
    let parsedDate: Date;

    if (typeof date === 'string' || date instanceof String) {
      parsedDate = new Date(date as string);
    } else {
      parsedDate = date;
    }

    if (isToday(parsedDate)) {
      return 'contacts-widget.contact.today';
    }

    try {
      const dateTimeFormat = new Intl.DateTimeFormat(locale, options);
      return dateTimeFormat.format(parsedDate);
    } catch (error) {}

    // If for some reason Intl API failed, let's try to use a default date
    try {
      return parsedDate.toDateString();
    } catch (error) {}
  }
  return '';
};

const formatDisplayName = (
  contact: V4Contact,
  locale: string = 'en',
): string => {
  if (contact.info) {
    const { name, emails, phones } = contact.info;
    const first = name?.first || '';
    const last = name?.last || '';

    if (!first && !last) {
      if (emails && emails.items && emails.items[0]) {
        return emails.items[0].email || '';
      }
      if (phones && phones.items && phones.items[0]) {
        return phones.items[0].phone || '';
      }
      return '';
    }

    // is site in japanese hack
    if (locale === 'ja') {
      return `${last} ${first}`.trim();
    }
    return `${first} ${last || ''}`.trim();
  }
  return '';
};

export const transferSingleContact = (
  contact: V4Contact,
  locale: string,
): ContactDataElement => {
  const newContact = {
    displayName: formatDisplayName(contact, locale),
    id: contact.id || '',
    imageSrc: contact.info?.picture?.image?.url || '',
    lastActivity: {
      activityType: mapActivityToKey(contact.lastActivity?.activityType),
      date: formatDate(contact.lastActivity?.activityDate, locale),
    },
  };
  return newContact;
};

export const contactsDTO = (
  response: V4ListContactsResponse,
  locale: string,
) => {
  const contactsData: ContactDataElement[] = [];
  response.contacts &&
    response.contacts.map((contact) =>
      contactsData.push(transferSingleContact(contact, locale)),
    );
  const totalNumberOfContacts = response.pagingMetadata?.tooManyToCount
    ? -1
    : response.pagingMetadata?.total;
  return { contactsData, totalNumberOfContacts: totalNumberOfContacts ?? -1 };
};
