# Time Worker v1.0.4

Set Timeouts and Intervals in Web Workers So They Continue Working When the Page is Hidden.

# Installation

```
$ npm install time-worker
```

# Usage

The TimeWorker object has the methods:

- setTimeout(callback: Function, ms: number) => id: string;
- setInterval(callback: Function, ms: number) => id: string;
- clearTimeout(id: string) => void;
- clearInterval(id: string) => void;
- clearAll() => void;
- terminate() => void;

And the following properties:

- isTerminated: boolean;

```javascript
import TimeWorker from 'time-worker';

const timeWorker = new TimeWorker(); // Instantiate the TimeWorker

const interval = timeWorker.setInterval(() => console.log('interval'), 1000); // Set an interval

timeWorker.setTimeout(() => timeWorker.clearInterval(interval), 5000); // Set a timeout to clear the interval

timeWorker.clearAll(); // Clear all timeouts and intervals

timeWorker.terminate(); // Stop the worker itself

console.log(worker.isTerminated); // > true
```
