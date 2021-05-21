/* eslint-disable @typescript-eslint/no-explicit-any */
type Observer<T> = (_: T) => void;

export class NotificationCenter {
  private static _instance: NotificationCenter | null = null;

  private observersForId: Record<string, Observer<any>[]>;
  private latestValueForId: Record<string, any>;

  private constructor() {
    this.observersForId = {};
    this.latestValueForId = {};
  }

  static instance(): NotificationCenter {
    return this._instance || (this._instance = new this());
  }

  addObserver<T>(id: string, observer: Observer<T>): void {
    if (this.observersForId[id]) {
      this.observersForId[id].push(observer);
    } else {
      this.observersForId[id] = [observer];
    }

    if (this.latestValueForId[id]) {
      observer(this.latestValueForId[id]);
    }
  }

  removeObserver<T>(id: string, observer: Observer<T>): void {
    const observers = this.observersForId[id];
    observers.filter((o) => o !== observer);
  }

  postNotification<T>(id: string, value: T): void {
    this.observersForId[id].forEach((observer) => observer(value));
    this.latestValueForId[id] = value;
  }
}
