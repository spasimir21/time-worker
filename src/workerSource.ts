// The worker's source is ES5 to support more browsers
// because bundlers aren't able to modify it.
export default `
var interval_id_mappings = {};
var timeout_id_mappings = {};

function createCallback(type, id) {
  return function () {
    postMessage({ type, id });
  };
}

function _setTimeout(id, ms) {
  var real_id = setTimeout(createCallback('timeout', id), ms);
  timeout_id_mappings[id] = real_id;
}

function _setInterval(id, ms) {
  var real_id = setInterval(createCallback('interval', id), ms);
  interval_id_mappings[id] = real_id;
}

function _clearTimeout(id) {
  clearTimeout(timeout_id_mappings[id]);
  delete timeout_id_mappings[id];
}

function _clearInterval(id) {
  clearInterval(interval_id_mappings[id]);
  delete interval_id_mappings[id];
}

function _clearAll() {
  for (const id in timeout_id_mappings) {
    clearTimeout(timeout_id_mappings[id]);
    delete timeout_id_mappings[id];
  }
  for (const id in interval_id_mappings) {
    clearInterval(interval_id_mappings[id]);
    delete interval_id_mappings[id];
  }
}

onmessage = function (event) {
  switch (event.data.operation) {
    case 'set-timeout':
      _setTimeout(event.data.id, event.data.ms);
      break;
    case 'set-interval':
      _setInterval(event.data.id, event.data.ms);
      break;
    case 'clear-timeout':
      _clearTimeout(event.data.id);
      break;
    case 'clear-interval':
      _clearInterval(event.data.id);
      break;
    case 'clear-all':
      _clearAll();
      break;
    default:
      break;
  }
};
`;
