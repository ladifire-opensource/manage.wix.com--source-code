const getEventSchema = (translations) => {
  return ({
    'contact.Email[0]': {
      displayName: translate('automations.schema.userEmail', translations),
      type: 'string'
    }
  })
}

function translate (key, translations) {
  return translations[key] || key
}

export async function getTriggersConfig (appDefId, translations) {
  const eventId = 'oneApp/member_approved'
  return {
    appTitle: translate('appTitle.oneApp', translations),
    appDefId,
    events: {
      [eventId]: {
        displayName: translate('grouped.event.oneApp', translations),
        displayDescription: translate('event.description.oneApp', translations),
        displayColor: '#FDB10C'
      }
    },
    generateEventSchema: eventId => Promise.resolve(getEventSchema(translations))
  }
}
