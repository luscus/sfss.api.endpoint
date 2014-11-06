// OPTIONS returns the available http methods and CORS
var q = require('q'),
    options,
    store;

function process (data) {
  var defered = q.defer();

  data.statusCode = 200;
  data.responseBody = JSON.stringify({
    status: 'OK'
  });

  defered.resolve(data);

  return defered.promise;
}

module.exports = function (_store, _options) {
  options = _options;
  store = _store;

  return {
    process: process
  };
};
