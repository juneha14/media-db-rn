import { Mutex } from "async-mutex";

export class MutableCollection<T> {
  private items: T[];
  private mutex: Mutex;

  constructor(items: T[]) {
    this.items = items;
    this.mutex = new Mutex();
  }

  async getItems(): Promise<T[]> {
    return this.mutex.runExclusive(() => this.items);
  }

  async setItems(items: T[]): Promise<void> {
    this.mutex.runExclusive(() => (this.items = items));
  }

  async append(item: T): Promise<T[]> {
    return this.mutex.runExclusive(() => {
      this.items.push(item);
      return this.items;
    });
  }

  async remove(item: T): Promise<T[]> {
    return this.mutex.runExclusive(() => {
      const newItems = this.items.filter((i) => i !== item);
      this.items = newItems === undefined ? [] : newItems;
      return this.items;
    });
  }
}
