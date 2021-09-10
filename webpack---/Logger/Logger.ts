/* tslint:disable:no-console */

import {LoggerImpl} from './Logger.types';
import {LoggerImplQueued} from './LoggerImplQueued';

const KeyL = 76;

export class Logger {
  private static instances: Logger[] = [];
  private static queueImpl = new LoggerImplQueued();
  log = (...args: any[]) => {
    this.impl.log(this.serviceName, ...args);
  };
  info = (...args: any[]) => {
    this.impl.info(this.serviceName, ...args);
  };
  warn = (...args: any[]) => {
    this.impl.warn(this.serviceName, ...args);
  };
  error = (...args: any[]) => {
    this.impl.error(this.serviceName, ...args);
  };
  switchToRealtime = () => {
    this.impl = console;
  };
  private readonly serviceName: string;
  private impl: LoggerImpl;

  constructor(serviceName: string) {
    this.serviceName = serviceName;
    Logger.instances.push(this);
    this.impl = Logger.queueImpl;
  }

  static switchAllToRealtime() {
    Logger.queueImpl.drain(console);
    Logger.instances.forEach(logger => logger.switchToRealtime());
  }
}

// Show log when CTRL+ALT+SHIFT+L was pressed
const enableDebugHandler = (event: KeyboardEvent) => {
  const {ctrlKey, shiftKey, metaKey, altKey, keyCode} = event;

  const doesMatch = [ctrlKey || metaKey, altKey, shiftKey, keyCode === KeyL].every(Boolean);

  if (!doesMatch) {
    return;
  }
  Logger.switchAllToRealtime();

  detachEnableDebugHandler();
};

export const attachEnableDebugHandler = () => window.addEventListener('keydown', enableDebugHandler, false);
export const detachEnableDebugHandler = () => window.removeEventListener('keydown', enableDebugHandler, false);
