// DELETE removes a ressource or a collection
var errorHandler = require('../../errorHandler'),
    q = require('q'),
    options,
    store;

function process (data) {
  var defered = q.defer();

  store.deleteDirectory(data.fsPath)
  .then(function treeDeleteSuccess (docs) {
    data.responseBody = {
      data: {
        ref: data.refRoot + data.fsPath,
        action: 'deleted'
      }
    };
    data.statusCode = 204;

    defered.resolve(data);
  })
  .catch(function treeDeleteError (error) {
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
