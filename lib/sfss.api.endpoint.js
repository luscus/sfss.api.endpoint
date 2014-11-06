var packageInfo = require('../package.json'),
    validate = require('./validate'),
    pathLib = require('path'),
    endpointVersion = packageInfo.version.substring(0, packageInfo.version.lastIndexOf('.')),
    q = require('q'),
    SimpleFsStorage = require('sfss.lib'),
    cache = {},
    options,
    store;


function process (data) {

  var domain = data.context.domain = data.context.pathArray.shift(),
      method = data.context.http_method;

  if (domain !== 'data' && domain !== 'tree') {
    throw new Error('should be domain: tree or data')
  }

  data.refRoot = data.context.apiRoot + data.context.endpoint + '/' + domain + '/';
  data.fsPath = data.context.pathArray.join(pathLib.sep);

  if (validate(data, options)) {

    if (! cache[domain]) {
      cache[domain] = {};
    }

    if (! cache[domain][method]) {
      cache[domain][method] = require(__dirname + '/endpoints/' + domain + '/' + method)(store, options);
    }

    return cache[domain][method].process(data);
  }
  else {
    return q.when(data);
  }
}

module.exports = function (_options) {
  options = _options;

  store = new SimpleFsStorage({
    root: options.dataRoot
  });

  return process;
};
