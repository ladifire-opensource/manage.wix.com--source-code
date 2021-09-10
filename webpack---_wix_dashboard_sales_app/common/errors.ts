export class NoOfferError extends Error {
  constructor() {
    super('No dealer offer recieved from dealer.');
    this.name = 'NoOfferError';
  }
}

export class UnknownTemplateError extends Error {
  constructor(offerId: string, type: string) {
    super(`The offer ${offerId} has unknown template type (${type})`);
    this.name = 'UnknownTemplateError';
  }
}

export class NoSiteNameError extends Error {
  constructor() {
    super(
      `The offer includes siteName placeholder but metaSiteManager didn't find any site like that.`,
    );
    this.name = 'NoSiteNameError';
  }
}

export class DomainRetrieveError extends Error {
  constructor(message: string = 'N/A') {
    super(
      `The offer includes domainName placeholder, premium domains API failed to retrieve it. Message: ${message}`,
    );
    this.name = 'DomainRetrieveError';
  }
}

export class InvalidOfferAssetValue extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidOfferAssetValue';
  }
}

export class PremiumCheckError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PremiumCheckError';
  }
}

export class DealerEventError extends Error {
  constructor(offerId: string, eventType: string) {
    super(
      `Dealer Event request failed to complete, offerId: ${offerId}, event-type: ${eventType}.`,
    );
    this.name = 'DealerEventError';
  }
}

export class DealerOfferFetchingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DealerOfferFetchingError';
  }
}
