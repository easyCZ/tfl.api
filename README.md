![Travis](https://travis-ci.org/easyCZ/tfl.api.svg)

# tfl.api
NodeJS API for https://api.tfl.gov.uk/

## Installation
```
npm install tfl.api --save
```


## Usage

### Search
Implements method supported by [TFL Search](https://api.tfl.gov.uk/#Search)

```javascript
var tfl = require('tfl.api')(appId, appKey);
// or var search = require('tfl.api/search')(appId, appKey);


// Search TFL with a query and additional params
tfl.search({
  query: 'Thameslink',
  pageSize: 10,
  pageFrom: 2
}).then(r => console.log(r))

// Get metadata for search methods
tfl.search.meta().then(metadata => console.log(metatdata))

// Get bus schedules
tfl.search.busSchedules('<query>').then(r => console.log(r))

```
