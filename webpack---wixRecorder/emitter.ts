type Callback = (e: MessageEvent, payload: string) => void;

type Listener = {
  name: string;
  callback: Callback;
  once?: boolean;
};

export default class Emitter {
  private listeners: Listener[] = [];

  static parseEventMessage(message: string) {
    const [eventName, payload] = (typeof message === 'string'
      ? message
      : ''
    ).split('|');

    return { eventName, payload };
  }

  constructor() {
    this.setupListeners();
  }

  private setupListeners() {
    window.addEventListener('message', (e) => {
      const { eventName, payload } = Emitter.parseEventMessage(e.data);

      if (!eventName) {
        return;
      }

      this.listeners
        .filter(({ name }) => name === eventName)
        .forEach(({ name, callback, once }) => {
          callback(e, payload);

          if (once) {
            this.removeListener(name, callback);
          }
        });
    });
  }

  listen(name: string, callback: Callback) {
    this.listeners.push({
      name,
      callback,
    });

    return () => {
      this.removeListener(name, callback);
    };
  }

  listenOnce(name: string, callback: Callback) {
    this.listeners.push({
      name,
      callback,
      once: true,
    });

    return () => {
      this.removeListener(name, callback);
    };
  }

  removeListener(event: string, callback: Callback) {
    this.listeners = this.listeners.filter(
      (listener) => listener.name !== event && listener.callback !== callback,
    );
  }

  emit(event: string, payload = '', target = window.parent, origin = '*') {
    if (target) {
      target.postMessage(`${event}|${payload}`, origin);
    }
  }
}
