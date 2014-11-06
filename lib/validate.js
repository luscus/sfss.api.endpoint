function validate (data, options) {

  switch (data.context.domain) {
    case 'tree':

      if (data.context.http_method === 'DELETE' && options.disableDirectoryDeletion) {
        data.responseBody = {
          data: {
            ref: data.refRoot + data.fsPath,
            method: data.context.http_method,
            reason: 'disabled'
          },
          message: 'deleting directories has been disabled'
        };
        data.statusCode = 403;

        return false;
      }

      break;

    case 'data':

      if (data.context.http_method === 'DELETE' && options.disableFileDeletion) {
        data.responseBody = {
          data: {
            ref: data.refRoot + data.fsPath,
            method: data.context.http_method,
            reason: 'disabled'
          },
          message: 'deleting files has been disabled'
        };
        data.statusCode = 403;

        return false;
      }

      break;
  }


  return true
}

module.exports = validate;
