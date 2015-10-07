// PUT inserts or updates a ressource
var errorHandler = require('../../errorHandler'),
    q = require('q'),
    options,
    store;

function process (data) {
  var defered = q.defer();

  store.writeFile(data.fsPath, data.context.body)
  .then(function dataPutSuccess (docs) {
    data.responseBody = {
      ref: data.refRoot + data.fsPath,
      data: data.context.body
    };
    data.statusCode = 201;

    defered.resolve(data);
  })
  .catch(function dataPutError (error) {
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
