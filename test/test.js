var pathLib = require('path'),
    options = {
      port: 8080,
      dataRoot: __dirname + pathLib.sep + 'data'
    },
    api = require('../lib/sfss.service')(options);

