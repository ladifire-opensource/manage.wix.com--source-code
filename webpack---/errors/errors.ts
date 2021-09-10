export class FailedToFetchTranslationsError extends Error {
  constructor(e: Error) {
    super(`Dashboard Setup - failed to fetch translations. ERROR: ${e}`);
    this.name = 'FailedToFetchTranslationsError';
  }
}

export class FailedToFetchWidgetDataError extends Error {
  constructor(e: Error) {
    super(`Dashboard Setup - failed to fetch widget data. ERROR: ${e}`);
    this.name = 'FailedToFetchWidgetDataError';
  }
}
