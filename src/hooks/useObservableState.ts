type Observer<T> = (_: T) => void;

class NotificationCenter {
  private static instance: NotificationCenter;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private observersForId: Record<string, Observer<any>[]>;

  constructor() {
    this.observersForId = {};
  }

  static getInstance(): NotificationCenter {
    if (this.instance === undefined) {
      this.instance = new NotificationCenter();
    }
    return this.instance;
  }

  addObserver<T>(id: string, observer: Observer<T>): void {
    if (this.observersForId[id] !== undefined) {
      this.observersForId[id].push(observer);
    } else {
      this.observersForId[id] = [observer];
    }
    observer(); // need to keep track of latest value
  }

  removeObserver<T>(id: string, observer: Observer<T>): void {
    const observers = this.observersForId[id];
    observers.filter((o) => o !== observer);
  }

  postNotification<T>(id: string, value: T): void {
    this.observersForId[id].forEach((observer) => observer(value));
  }
}

function useObservableState<T>(id: string) {
  // useState to get/set value of type T
  // useEffect to addObserver and removeObserver on return
  // setState should invoke postNotification
  // return getState
  // in addObserver callback, we need to setState
}
