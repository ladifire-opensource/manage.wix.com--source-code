const Sentry = require('@sentry/browser');

const sentryClient = new Sentry.BrowserClient({
  dsn: 'https://ada083d6ada04083b5fc69cdf666b68f@sentry.wixpress.com/168',
});

module.exports = {
  sentryClient,
};
