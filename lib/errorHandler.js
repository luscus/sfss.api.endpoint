function handle (data, error) {
    if (error.name === 'SFSSException') {
      data.responseBody = {data:{
        ref: data.refRoot + data.fsPath,
        type: 'error',
        message: error.message
      }
                          };
      data.statusCode = 400;
    }
    else {
      data.responseBody = {
        ref: data.refRoot + data.fsPath,
        type: 'error',
        message: error.message
      };
      data.statusCode = 500;
    }

    defered.reject(data);
  }

module.exports = handle;
