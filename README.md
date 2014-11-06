# Simple FS Storage API Endpoint
[![NPM version](https://badge.fury.io/js/sfss.api.endpoint.svg)](http://badge.fury.io/js/sfss.api.endpoint)
[![dependencies](https://david-dm.org/luscus/sfss.api.endpoint.svg)](https://david-dm.org/luscus/sfss.api.endpoint)
[![devDependency Status](https://david-dm.org/luscus/sfss.api.endpoint/dev-status.svg?theme=shields.io)](https://david-dm.org/luscus/sfss.api.endpoint#info=devDependencies)

Builds uppon [sfss.lib](https://github.com/luscus/sfss.lib) the Simple FS Storage library.

##Usage

### Options

- `dataRoot (mandatory)`: {String} absolut path to the root directory of the store.
- `disableFileDeletion`: {Boolean} makes sure that no file can be deleted.
- `disableDirectoryDeletion`: {Boolean} makes sure that no directory can be deleted.


## API

### PUT `api_root`/sfss/tree[/path]

Creates a new directory (success Status Code 201):

    {
        "data": {
            "ref": "/sfss/tree/trial",
            "action": "created"
        },
        "status": "success"
    }

### GET `api_root`/sfss/tree[/path]

Returns the directory content - files and subdirectories names as Array (success Status Code 200):

    {
        "ref": "/sfss/tree/test",
        "type": "directoryContent",
        "data": [
            "first.json",
            "second.json",
            "sub"
        ],
        "status": "success"
    }

### DELETE `api_root`/sfss/tree[/path]

Deep deletion of the directory, like `rm -rf` (success Status Code 204): no body

-------

### PUT `api_root`/sfss/data[/path]/filename.json

Creates or updates a file (success Status Code 201):

    {
        "ref": "/sfss/data/test/first.json",
        "data": {
            "fileId": 1
        },
        "status": "success"
    }

### GET `api_root`/sfss/data[/path]

Reads all files in the directory (bulk read) (success Status Code 200):

    {
        "ref": "/sfss/data/test",
        "type": "multipleFileContent",
        "data": [
            {
                "fileId": 1
            },
            {
                "fileId": 2
            }
        ],
        "status": "success"
    }

### GET `api_root`/sfss/data[/path]/filename.json

Reads a file (success Status Code 200):

    {
        "ref": "/sfss/data/test/first.json",
        "type": "fileContent",
        "data": {
            "fileId": 1
        },
        "status": "success"
    }

### DELETE `api_root`/sfss/data[/path]/filename.json

Removes a file (success Status Code 204): no body
