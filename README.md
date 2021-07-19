# Time Worker v1.0.0

Set timeouts and intervals in web workers so they continue working when the page is hidden.

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

All these methods have the same API as the native browser ones, except that the
ids (both returned and taken) are strings instead of numbers.

```javascript
import TimeWorker from 'time-worker';

const timeWorker = new TimeWorker(); // Instantiate the TimeWorker

timeWorker.setTimeout(() => console.log('Timeout fired!'), 1000); // Set a timeout

const interval = timeWorker.setInterval(() => timeWorker.clearInterval(interval), 1000); // Set and clear an interval
```
