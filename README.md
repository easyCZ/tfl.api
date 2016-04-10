![Travis](https://travis-ci.org/easyCZ/tfl.api.svg)

# tfl.api
NodeJS API for https://api.tfl.gov.uk/

## Installation
```
npm install tfl.api --save
```

## Usage
The Transport for London API requires the use of an `app_id` and `app_key`. You can register for one at [TFL API Portal](https://api-portal.tfl.gov.uk/login).

The package can then be used as follows:
```javascript
var appId = '<YOUR_APP_ID>';
var appKey = '<YOUR_APP_KEY>';
var tfl = require('tfl.api')(appId, appKey);
```

Below is an outline of methods available to query. This library uses [superagent](https://visionmedia.github.io/superagent/) to make HTTP requests. Responses are returned as promises and response content can be accessed through `r => response.body`.

### Search
Implements method supported by [TFL Search](https://api.tfl.gov.uk/#Search)

```javascript
var tfl = require('tfl.api')(appId, appKey);
// or var search = require('tfl.api/search')(appId, appKey);


// Search TFL with a query and additional params
tfl.search({ query: 'Thameslink' }).then(r => console.log(r.body))

// Get metadata for search methods
tfl.search.meta().then(r => console.log(r.body))

// Get bus schedules
tfl.search.busSchedules('<query>').then(r => console.log(r.body))

```
