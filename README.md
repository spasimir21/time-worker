# Time Worker v1.0.3

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

All these methods have the same API as the native browser ones, except that the
ids (both returned and taken) are strings instead of numbers.

```javascript
import TimeWorker from 'time-worker';

const timeWorker = new TimeWorker(); // Instantiate the TimeWorker

const interval = timeWorker.setInterval(() => console.log('interval'), 1000); // Set an interval

timeWorker.setTimeout(() => timeWorker.clearInterval(interval), 5000); // Set a timeout to clear the interval
```
