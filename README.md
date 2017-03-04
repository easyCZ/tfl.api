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
* [Journey](https://github.com/easyCZ/tfl.api#journey)
* Line (TODO)
* Mode (TODO)
* [Occupancy](https://github.com/easyCZ/tfl.api#occupancy)
* [Place](https://github.com/easyCZ/tfl.api#place)
* Road (TODO)
* [Search](https://github.com/easyCZ/tfl.api#search)
* [StopPoint](https://github.com/easyCZ/tfl.api#stoppoint)


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

### Journey
Implements API endpoint as supported by [TFL Journey](https://api.tfl.gov.uk/#Journey)

```javascript
var tfl = require('tfl.api')(appId, appKey);
// or var journey = require('tfl.api/journey')(appId, appKey)

var origin = '1001067';   // City Thameslink
var destination = '1000123'   // Kentish Town

// Get a journey plan from City Thameslink to Kentish Town
tfl.journey(origin, destination).then(...)
tfl.journey(origin, destination, { via: '...', other: 'options'}).then(...)

// Get Meta data for journey given a type as per TFL API
tfl.journey.meta('modes').then(...)
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
tfl.byTypeAtLatLon('placeTypes', 123, 999).then(...)

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

### StopPoint
Implements API endpoint as supported by [TFL StopPoint](https://api.tfl.gov.uk/#StopPoint)

```javascript
var tfl = require('tfl.api')(appId, appKey);
// or var stoppoint = require('tfl.api/stoppoint')(appId, appKey);

// Gets a list of StopPoints corresponding to the given list of stop ids. 
tfl.stoppoint.byId('940GZZLUASL').then(...)

// Retrieve stoppoint by lat/lng/stopTypes
tfl.stoppoint({ lat: 51.467074, lon: -0.188808, stopTypes: 'NaptanPublicBusCoachTram'}).then(...)

// Retrieve stoppoint within a bounding box
tfl.stoppoint({ swLat: 123, swLon: 987, neLat: 100, neLon: 999, stopTypes: 'NaptanPublicBusCoachTram' }).then(...)

// Gets the list of arrival predictions for the given stop point id 
tfl.stoppoint.byIdArrivals('490014185E').then(...)

// Gets Stopoints that are reachable from a station/line combination. Third argument can pass additional query params
tfl.stoppoint.byCanReachOnLine('940GZZLUASL', 'victoria', { serviceTypes: 'regular,night'}).then(...)

// Gets the canonical direction, "inbound" or "outbound", for a given pair of stop point Ids in the direction from -> to. Third argument can pass additional query params
tfl.stoppoint.byDirectionTo('940GZZLUASL', '865GZZLUASL', { lineId: 'victoria'}).then(...)

// Gets all disruptions for the specified StopPointId, plus disruptions for any child Naptan records it may have. Second argument can pass additional query params
tfl.stoppoint.byIdDisruption('940GZZLUASL', { getFamily: false, includeRouteBlockedStops: false}).then(...)

// Gets all disruptions for the specified StopPointId, plus disruptions for any child Naptan records it may have. Forth argument can pass additional query params
tfl.stoppoint.byIdDisruptionStartEnd('940GZZLUASL','2016-08-12', '2016-08-14', { getFamily: false, includeRouteBlockedStops: false}).then(...)

// Gets metadata for methods that act upon the Stops controller. If metadataType is "categories", gets a list of all of the available stops property categories and keys, grouped by category name. If metadataType is "stoptypes", gets a list of the available types of stops. If metadataType is "modes", gets a list of the valid modes to filter stops by.
tfl.stoppoint.meta('stoptypes').then(...)

// Gets a list of StopPoints filtered by the modes available at that StopPoint. Second argument can pass additional query params
tfl.stoppoint.mode('bus', {page: 2}).then(...)

// Gets a distinct list of disrupted stop points for the given modes. Second argument can pass additional query params
tfl.stoppoint.modeDisruption('bus', {includeRouteBlockedStops: true}).then(...)

// Gets a distinct list of disrupted stop points for the given modes with a date range. Forth argument can pass additional query params
tfl.stoppoint.modeDisruptionStartEnd('bus', '2016-08-12', '2016-08-14', {includeRouteBlockedStops: false}).then(...)

// Returns the route sections for all the lines that service the given stop point ids. Second argument can pass additional query params
tfl.stoppoint.route('940GZZLUASL', {serviceTypes: 'night'}).then(...)

// Search StopPoints by their common name, or their 5-digit Countdown Bus Stop Code. Second argument can pass additional query params
tfl.stoppoint.search('Townmead Road', { modes: 'bus', faresOnly: false, maxResults: 50, lines: 2, includeHubs: true}).then(...)

// Gets the service types for a given stoppoint. Second argument can pass additional query params
tfl.stoppoint.servicetypes('940GZZLUASL', { lineids: '123', modes: 'bus'}).then(...)

// Gets a StopPoint for a given sms code. Second argument can pass additional query params
tfl.stoppoint.sms('73241', { output: 'web'}).then(...)

// Gets all stop points of a given type.
tfl.stoppoint.type('NaptanCoachBay,NaptanMarkedPoint').then(...)

```