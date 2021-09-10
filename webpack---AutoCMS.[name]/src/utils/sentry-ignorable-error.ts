export const isSentryIgnored = (error: Error): boolean => {
    return error instanceof SentryIgnorableError && error.ignoreSentry;
};

export class SentryIgnorableError extends Error {
    public ignoreSentry = false;

    constructor(message?: string) {
        super(message);

        Object.setPrototypeOf(this, SentryIgnorableError.prototype);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, SentryIgnorableError);
        }
    }

    public ignored() {
        this.ignoreSentry = true;
        return this;
    }
}

export const createSentryIgnorableError = (error: Error): SentryIgnorableError => {
    const ignoredError = new SentryIgnorableError(error.message);
    ignoredError.name = error.name;
    return ignoredError.ignored();
};

export const ignoreSentryError = <T>(error: T): T => {
    if (error instanceof SentryIgnorableError ) {
        return error.ignored();
    }

    return error;
};
