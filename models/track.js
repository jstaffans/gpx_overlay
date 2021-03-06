var gpx = require('../lib/gpx.js');
var geo = require('../lib/geo.js');
var latlon = require('../lib/latlon.js');

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

module.exports.getFilenameForTrackId = function(id) {
	var p = /^\d$/;
	return (p.test(id)) ? __dirname + '/track/day_' + id + '.gpx' : '';
}

var Track = function() {

	var waypoints;
	var origin;
	var pixelWaypoints;
	var onePixelInMeters;

	var public = {
		initialize: function () {
			clearWaypoints();
		},

		clearWaypoints: function () {
			waypoints = new Array();
		},

		setWaypoints: function(wp) {
			waypoints = wp;
		},

		setDefaultOrigin: function() {
			origin = latlon.createLatLon(waypoints[0].lat, waypoints[0].lon);
		},

		setOrigin: function(lat, lon) {
			origin = latlon.createLatLon(lat, lon);
		},

		setOnePixelIsMeters: function(meters) {
			onePixelInMeters = meters;
		},

		scaleToPixels: function() {
			pixelWaypoints = Array();
			for (var i = 0; i < waypoints.length; i++) {
				var distances = getXYDistances(waypoints[i]);
				pixelWaypoints.push({
					x: scaleKmToPixels(distances.x),
					y: scaleKmToPixels(distances.y)
				});
			}
		},

		getPixelWaypoints: function() {
			return pixelWaypoints;
		},
	}

	function getXYDistances(point) {
		var x = latlon.createLatLon(point.lat, origin._lon);
		var y = latlon.createLatLon(origin._lat, point.lon);
		var dx = x.distanceTo(origin);
		var dy = y.distanceTo(origin);

		if (point.lat < origin._lat) {
			dx = -dx;
		}

		if (point.lon < origin._lon) {
			dy = -dy;
		}
		
		return {x: dx, y: dy};
	}

	function scaleKmToPixels(d) {
		return Math.round((d * 1000) / onePixelInMeters);	
	}

	return public;
};

track = new Track();

module.exports.loadWaypoints = function(filename) {
	track.setWaypoints(gpx.parse(filename));
	track.setDefaultOrigin();
}

module.exports.setOnePixelIsMeters = function(meters) {
	track.setOnePixelIsMeters(meters);	
}

module.exports.setOrigin = function(lat, lon) {
	track.setOrigin(lat, lon);
}

module.exports.getTransformedWaypoints = function() {
	track.scaleToPixels();
	return track.getPixelWaypoints();
}