![Travis](https://travis-ci.org/easyCZ/tfl.api.svg)

# tfl.api
Simple NodeJS wrapper API for https://api.tfl.gov.uk/ using superagent and promises.

## Installation
```
npm install tfl.api --save
```

## Contributing
Contributions are welcome. Please submit a pull request. If you encounter any issues, please submit an [Issue](https://github.com/easyCZ/tfl.api/issues).

## Usage
The Transport for London API requires the use of an `app_id` and `app_key`. You can register for one at [TFL API Portal](https://api-portal.tfl.gov.uk/login).

The package can then be used as follows:
```javascript
var appId = '<YOUR_APP_ID>';
var appKey = '<YOUR_APP_KEY>';
var tfl = require('tfl.api')(appId, appKey);
```

Each type of API can also be required separately as outlined in the examples below. Also see [tests](https://github.com/easyCZ/tfl.api/tree/master/test) for samples.

Below is an outline of methods available to query. This library uses [superagent](https://visionmedia.github.io/superagent/) to make HTTP requests. Responses are returned as promises and response content can be accessed through `r => response.body`.

### Search
Implements method supported by [TFL Search](https://api.tfl.gov.uk/#Search)

```javascript
var tfl = require('tfl.api')(appId, appKey);
// or var search = require('tfl.api/search')(appId, appKey);


// Search TFL with a query
tfl.search({ query: 'Thameslink' }).then(r => console.log(r.body))

// Search TFL with a query and pagination options
tfl.search({ query: 'Thameslink', pageSize: 5, pageFrom: 2 }).then(r => console.log(r.body));

// Get metadata for search methods
tfl.search.meta().then(r => console.log(r.body))

// Get bus schedules
tfl.search.busSchedules('<query>').then(r => console.log(r.body))

```
