import {LogEntry, LoggerImpl} from './Logger.types';

export class LoggerImplQueued implements LoggerImpl {
  private queue: LogEntry[] = [];

  log(...args: any[]) {
    this.queue.push({type: 'log', args});
  }

  info(...args: any[]) {
    this.queue.push({type: 'info', args});
  }

  warn(...args: any[]) {
    this.queue.push({type: 'warn', args});
  }

  error(...args: any[]) {
    this.queue.push({type: 'error', args});
  }

  drain(dest: LoggerImpl) {
    this.queue.forEach(({type, args}) => {
      dest[type](...args);
    });
    this.queue = [];
  }
}
