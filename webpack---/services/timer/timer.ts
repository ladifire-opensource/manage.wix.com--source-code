export class Timer {
  private epoch: number;

  constructor(epoch = Date.now()) {
    this.epoch = epoch;
  }

  measureMilliseconds(): number {
    return Date.now() - this.epoch;
  }
}
