export default class Formatter {
  private readonly locale: string;

  constructor(locale: string) {
    this.locale = locale;
  }

  formatDate = (
    date: string,
    options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
  ): string => {
    // Use Intl API to format the date.
    try {
      const dateTimeFormat = new Intl.DateTimeFormat(this.locale, options);
      return dateTimeFormat.format(new Date(date));
    } catch (error) {}

    // If for some reason Intl API failed, let's try to use a default date
    try {
      return new Date(date).toDateString();
    } catch (error) {}

    return date.toString();
  };

  formatCurrency = (
    currency: string = 'USD',
    value: number,
    minimumFractionDigits: number = 0,
    maximumFractionDigits: number = 0,
  ): string => {
    const formatOptions = {
      style: 'currency',
      minimumFractionDigits,
      maximumFractionDigits,
      currency,
    };
    // Use Intl API to format the currency
    try {
      const currencyFormatter = new Intl.NumberFormat(
        this.locale,
        formatOptions,
      );
      return currencyFormatter.format(value);
    } catch (error) {
      console.error('Currency format error', error);
    }

    // Fallback to en locale
    try {
      const currencyFormatter = new Intl.NumberFormat('en', formatOptions);
      return currencyFormatter.format(value);
    } catch (error) {
      console.error('Currency format error', error);
    }

    // If for some reason Intl API failed
    return value.toString();
  };

  formatAsPercentage = (
    value: number,
    maximumFractionDigits: number = 0,
  ): string => {
    const option = {
      style: 'percent',
      maximumFractionDigits,
    };
    return `${Intl.NumberFormat(this.locale, option).format(value)}`;
  };

  formatStrictPercent = (value: number | string): string => `${value}%`;

  formatAsNumber = (value: number): string => {
    const locale = this.locale === 'keys' ? 'en' : this.locale;
    return Intl.NumberFormat(locale).format(value);
  };

  formatAsCompactNumber = (
    value: number,
    formattingOverride?: Intl.NumberFormatOptions,
    maxNumberLength: number = 5,
  ): string => {
    const formatter = Intl.NumberFormat(this.locale, {
      maximumFractionDigits: 1,
      ...formattingOverride,
    });
    const numOfDigits = (Math.log10(value) | 0) + 1;
    const thousandMagnitude = ((numOfDigits - 1) / 3) | 0; // every 10^3 degree count as 1 => 1-3 digits = 0, 4-6 digits = 1, 6-8 = 2;
    const magnitude = Math.pow(10, thousandMagnitude * 3); // magnitude is 1 | 1000 | 1000000
    const shortValue = value / magnitude; // this gives us the original value or shortened value in thousands and millions
    const shortValueTruncated = ((shortValue * 10) | 0) / 10; // flooring second fraction point 1.79 => 1.7
    return numOfDigits <= maxNumberLength
      ? formatter.format(value)
      : formatter.format(shortValueTruncated) +
          ['', 'K', 'M'][thousandMagnitude];
  };
}
