// PUT inserts or updates a ressource
var errorHandler = require('../../errorHandler'),
    q = require('q'),
    options,
    store;

function process (data) {
  var defered = q.defer();

  store.createDirectory(data.fsPath)
  .then(function (docs) {
    data.responseBody = {
      data: {
        ref: data.refRoot + data.fsPath,
        action: 'created'
      }
    };
    data.statusCode = 201;

    defered.resolve(data);
  })
  .catch(function (error) {
    errorHandler(data, error);
    defered.reject(data);
  });

  return defered.promise;
}

module.exports = function (_store, _options) {
  options = _options;
  store = _store;

  return {
    process: process
  };
};
