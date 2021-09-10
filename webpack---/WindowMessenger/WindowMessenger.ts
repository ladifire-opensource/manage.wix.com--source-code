import {Logger} from '../Logger';
import {EventHandler, EventName, HandlerDescription} from './WindowMessenger.types';

export class WindowMessenger {
  private targetWindow?: Window;
  private handlerDescriptions: HandlerDescription[] = [];
  private logger: Logger;

  constructor(targetWindow?: Window, logger: Logger = new Logger('WindowMessenger')) {
    this.logger = logger;
    this.targetWindow = targetWindow;

    window.addEventListener('message', this.handleMessage.bind(this), false);
  }

  setTarget(target: Window) {
    this.targetWindow = target;
  }

  on(event: EventName, fn: EventHandler) {
    this.handlerDescriptions.push({
      event,
      fn,
      once: false,
    });
  }

  one(event: EventName, fn: EventHandler) {
    this.handlerDescriptions.push({
      event,
      fn,
      once: true,
    });
  }

  off(event: EventName, fn: EventHandler) {
    this.handlerDescriptions = this.handlerDescriptions.filter(
      handler => !(handler.event === event && (handler.fn === fn || !fn)),
    );
  }

  emit(event: EventName, data: any = null) {
    this.logger.log('postMessage emitted', event, data);
    if (!this.targetWindow) {
      throw new Error('target window should be defined');
    }
    this.targetWindow.postMessage(JSON.stringify({data, event}), '*');
  }

  private handleMessage(event: MessageEvent) {
    if (event.source !== this.targetWindow) {
      return;
    }

    const data = this.parseMessageData(event.data);
    if (data === null) {
      return;
    }

    this.logger.log('postMessage received', data);

    this.handlerDescriptions
      .filter(observer => observer.event === data.event)
      .forEach(this.runObserver(event, data.data));
  }

  private runObserver(event: MessageEvent, data: any) {
    return (handlerDescription: HandlerDescription) => {
      handlerDescription.fn.call(event, data);

      if (handlerDescription.once) {
        this.off(handlerDescription.event, handlerDescription.fn);
      }
    };
  }

  private parseMessageData(input: any) {
    if (typeof input !== 'string') {
      return input;
    }

    try {
      return JSON.parse(input);
    } catch (ex) {
      return null;
    }
  }
}
