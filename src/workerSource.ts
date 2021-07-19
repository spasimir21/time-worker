// The worker's source is ES5 to support more browsers
// because bundlers aren't able to modify it.
export default `
var id_mappings = {};

function createCallback(type, id) {
  return function () {
    postMessage({ type, id });
  };
}

function _setTimeout(id, ms) {
  var real_id = setTimeout(createCallback('timeout', id), ms);
  id_mappings[id] = real_id;
}

function _setInterval(id, ms) {
  var real_id = setInterval(createCallback('interval', id), ms);
  id_mappings[id] = real_id;
}

function _clearTimeout(id) {
  clearTimeout(id_mappings[id]);
  delete id_mappings[id];
}

function _clearInterval(id) {
  clearInterval(id_mappings[id]);
  delete id_mappings[id];
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
    default:
      break;
  }
};
`;
