import moment from 'moment';

const isDateFromLastWeek = (date) => {
  const today = new Date(); // today!
  const lastWeek = today.setDate(today.getDate() - 7);
  return lastWeek < date;
};

const isRTLLanguage = (lang) => {
  return ['he', 'ar'].includes(lang);
};

export const formatNotificationDate = (dateCreated, language = 'en') => {
  let lang = language;

  switch (lang) {
    case 'no':
      lang = 'nb';
      break;
    case 'tl':
      lang = 'tl-ph';
      break;
    case 'zh':
      lang = 'zh-cn';
      break;
    default:
  }

  try {
    require(`moment/locale/${lang}`);
  } catch (e) {
    lang = 'en';
  }

  moment.locale(lang);

  if (isDateFromLastWeek(dateCreated)) {
    return moment(dateCreated).fromNow();
  }

  if (isRTLLanguage(lang)) {
    return moment(dateCreated).format(`YYYY ,[\u200F]MMMM [\u202A]D`);
  }

  return moment(dateCreated).format('LL');
};
