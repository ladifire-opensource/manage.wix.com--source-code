export class UnknownTemplateTypeError extends Error {
  constructor(offerId: string, templateType: string) {
    super(`The offer ${offerId} has unknown template type (${templateType})`);
    this.name = 'UnknownTemplateTypeError';
  }
}
