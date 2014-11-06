// GET retrieves a ressource or a collection
var errorHandler = require('../../errorHandler'),
    pathLib = require('path'),
    q = require('q'),
    options,
    store;

function process (data) {
  var defered = q.defer();

  if (pathLib.extname(data.fsPath)) {

    store.readFile(data.fsPath)
    .then(function dataGetSuccess (docs) {
      data.responseBody = {
        ref: data.refRoot + data.fsPath,
        type: 'fileContent',
        data:docs
      };
      data.statusCode = 200;

      defered.resolve(data);
    })
    .catch(function dataGetError (error) {
      errorHandler(data, error);
      defered.reject(data);
    })
  }
  else {

    store.readFileBulk(data.fsPath)
    .then(function dataGetSuccess (docs) {
      data.responseBody = {
        ref: data.refRoot + data.fsPath,
        type: 'multipleFileContent',
        data:docs
      };
      data.statusCode = 200;

      defered.resolve(data);
    })
    .catch(function dataGetError (error) {
      errorHandler(data, error);
      defered.reject(data);
    })
  }

  return defered.promise;
}

module.exports = function (_store, _options) {
  options = _options;
  store = _store;

  return {
    process: process
  };
};
