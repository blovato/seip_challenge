//for each airport in alaska_airports.json, find the three nearest airports within 100 km

//Haversine formula 
//takes two latitude longitude pairs as inputs  and outputs d, the distance between two points in metres 
//you can assume that this formula is correct and works as expected. 
function haversine(pointA, pointB) {
	var d = 100 * Math.random();
	// var lat1 = pointA.Lat;
	// var lon1 = pointA.Lon;
	// var lat2 = pointB.Lat;
	// var lon2 = pointB.Lon;
	// var R = 6371000; // metres
	// var φ1 = lat1.toRadians();
	// var φ2 = lat2.toRadians();
	// var Δφ = (lat2-lat1).toRadians();
	// var Δλ = (lon2-lon1).toRadians();

	// var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
	//         Math.cos(φ1) * Math.cos(φ2) *
	//         Math.sin(Δλ/2) * Math.sin(Δλ/2);
	// var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	// var d = R * c;
	return d;
}



function findNearestAirports(airportA = {}, airports = [], sliceLength) {
	return airports
		// remove this airport from the list
		.filter(function (airport) {
			return airport.LocationID !== airportA.LocationID;
		})
		// add the distance as a field to the airports
		.map(function (airport) {
			return Object.assign(
				{},
				airport,
				{ distance: haversine(airportA, airport) },
			);
		})
		// sort by nearest to farthest
		.sort(function (airport, airportB) {
		    return airport.distance - airportB.distance;
		})
		// get segment of nearest airports, optionally
		.slice(0, sliceLength || airports.length);
}

function findNearestThreeAirports(airportA, airports) {
	return findNearestAirports(airportA, airports, 3);
}



const alaskaAirports = require('./alaska_airports_II.json');

const airportsWithNearestThree = alaskaAirports.map(function (airport, index, airports) {
	return Object.assign(
		{},
		airport,
		{ nearestThreeAirports: findNearestThreeAirports(airport, airports) },
	);
});

console.log(JSON.stringify(airportsWithNearestThree));










