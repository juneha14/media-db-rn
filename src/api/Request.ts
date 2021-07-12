/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Mutex } from "async-mutex";
import { v4 as uuidv4 } from "uuid";

interface MetaData {
  method: "GET" | "POST";
  body?: string;
  headers: Record<string, string>;
}

export type RequestState = "initialized" | "finished" | "cancelled" | "errored";

export class Request {
  private url: string;
  private headers?: Record<string, string>;
  private body: any;

  private id: string;
  private state: RequestState;
  private stateMutex: Mutex;
  private abortController?: AbortController;

  constructor(url: string, headers?: Record<string, string>, body?: any) {
    this.id = uuidv4();
    this.state = "initialized";
    this.stateMutex = new Mutex();

    this.url = url;
    this.headers = headers;
    this.body = body;
  }

  getId(): string {
    return this.id;
  }

  getState(): RequestState {
    return this.state;
  }

  async fetch(): Promise<any> {
    const abortController = new AbortController();
    const { signal } = abortController;
    this.abortController = abortController;

    const metaData: MetaData = {
      method: this.body ? "POST" : "GET",
      headers: { ...this.headers, "Content-Type": "application/json" },
    };

    if (this.body) {
      metaData.body = JSON.stringify(this.body);
    }

    try {
      console.debug("Begin fetching request with id:", this.id);
      const res = await fetch(this.url, { ...metaData, signal });
      const data = await res.json();

      if (res.ok) {
        console.debug("Successfully finished fetch request with id:", this.id);
        await this.updateInternalState("finished");
        return data;
      }
      throw new Error(res.statusText);
    } catch (error) {
      console.error(
        `Failed to ${metaData.method} from ${this.url} wit id: ${this.id} due to error:`,
        error
      );
      await this.updateInternalState("errored");
      return Promise.reject(error.message);
    }
  }

  cancel(): void {
    console.debug("Cancelling request with id:", this.id);
    this.updateInternalState("cancelled");
    this.abortController?.abort();
  }

  private async updateInternalState(newState: RequestState) {
    this.stateMutex.runExclusive(() => {
      this.state = newState;
    });
  }
}
