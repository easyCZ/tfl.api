![Travis](https://travis-ci.org/easyCZ/tfl.api.svg)

# Transport For London NodeJS API Wrapper (tfl.api)
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

* [Accident Stats](https://github.com/easyCZ/tfl.api#accident-stats)
* Bikepoint (TODO)
* Cycle Super Highway (TODO)
* Journey (TODO)
* Line (TODO)
* Mode (TODO)
* [Place](https://github.com/easyCZ/tfl.api#occupancy)
* [Place](https://github.com/easyCZ/tfl.api#place)
* Road (TODO)
* [Search](https://github.com/easyCZ/tfl.api#search)
* Stoppoint (TODO)


Each type of API can also be required separately as outlined in the examples below. Also see [tests](https://github.com/easyCZ/tfl.api/tree/master/test) for samples.

Below is an outline of methods available to query. This library uses [superagent](https://visionmedia.github.io/superagent/) to make HTTP requests. Responses are returned as promises and response content can be accessed through `r => response.body`.

### Accident Stats
Implements API endpoint as supported by [TFL Accident Stats](https://api.tfl.gov.uk/#AccidentStats)

```javascript
var tfl = require('tfl.api')(appId, appKey);
// or var accidentstats = require('tfl.api/accidentstats')(appId, appKey)

// Get accident stats for the year 2015
tfl.accidentstats(2015).then(r => console.log(r.body))
```
### Occupancy
Implements API endpoint as supported by [TFL Place](https://api.tfl.gov.uk/#Occupancy)

```javascript
var tfl = require('tfl.api')(appId, appKey);
// or var occupancy = require('tfl.api/occupancy')(appId, appKey);

// Get occupancy of all car parks
tfl.occupancy.carPark().then(...)

// Get occupancy of a car park by id
tfl.occupancy.carParkById().then(...)
```


### Place
Implements API endpoint as supported by [TFL Place](https://api.tfl.gov.uk/#Place)

```javascript
var tfl = require('tfl.api')(appId, appKey);
// or var place = require('tfl.api/place')(appId, appKey);

// Retrieve a place by ID. Second argument can pass additional query params
tfl.place.byId(123, { includeChildren: true }).then(...)

// Retrieve places by lat/lng/radius
tfl.place({ lat: 123, lon: 987, radius: 100}).then(...)

// Retrieve places within a bounding box
tfl.place({ swLat: 123, swLon: 987, neLat: 100, neLon= 999 }).then(...)

// Get places of the given type at the given latitude and longitude
tfl.byTypeAtLanLon('placeTypes', 123, 999).then(...)

// Get metadata
tfl.meta('placeTypes').then(...)

```

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
