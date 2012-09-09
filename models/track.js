var gpx = require('../lib/gpx.js');

module.exports.getDays = function() {
	return  [
		{id: 1, date: '18.8.2012'},
		{id: 2, date: '19.8.2012'},
		{id: 3, date: '20.8.2012'},
		{id: 4, date: '21.8.2012'},
		{id: 5, date: '22.8.2012'},
		{id: 6, date: '23.8.2012'},
		{id: 7, date: '24.8.2012'},
		{id: 8, date: '25.8.2012'},
	];
}

module.exports.getWaypoints = function(id) {
	gpx.parse("../public/tracks/day_" + id + ".gpx");
	return gpx.getWaypoints();
}
