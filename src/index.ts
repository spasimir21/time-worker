import workerSource from './workerSource';

// https://gist.github.com/gordonbrander/2230317
const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

class TimeWorker {
  private readonly callbacks: Record<string, () => void> = {};
  private readonly worker: Worker;

  constructor() {
    const worker_blob: Blob = new Blob([workerSource], { type: 'application/javascript' });
    this.worker = new Worker(window.URL.createObjectURL(worker_blob));

    this.worker.onmessage = event => {
      if (this.callbacks[event.data.id] == null) return;
      this.callbacks[event.data.id]();
    };
  }

  setTimeout(callback: () => void, ms: number): string {
    const id: string = generateId();
    this.worker.postMessage({ operation: 'set-timeout', id, ms });
    this.callbacks[id] = callback;
    return id;
  }

  setInterval(callback: () => void, ms: number): string {
    const id: string = generateId();
    this.worker.postMessage({ operation: 'set-interval', id, ms });
    this.callbacks[id] = callback;
    return id;
  }

  clearTimeout(id: string): void {
    this.worker.postMessage({ operation: 'clear-timeout', id });
    delete this.callbacks[id];
  }

  clearInterval(id: string): void {
    this.worker.postMessage({ operation: 'clear-interval', id });
    delete this.callbacks[id];
  }
}

export default TimeWorker;
