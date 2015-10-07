// GET retrieves a ressource or a collection
var errorHandler = require('../../errorHandler'),
    q = require('q'),
    options,
    store;

function process (data) {
  var defered = q.defer();

  store.readDirectory(data.fsPath)
  .then(function treeGetSuccess (docs) {
    data.responseBody = {
      ref: data.refRoot + data.fsPath,
      type: 'directoryContent',
      data: docs
    };
    data.statusCode = 200;

    defered.resolve(data);
  })
  .catch(function treeGetError (error) {
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
