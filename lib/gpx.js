var fs = require("fs");
var sax = require("sax"),
	strict = true,
	parser = sax.parser(strict);

var Gpx = function() {

	var waypoints;

	return {
		initialize: function () {
			clearWaypoints();
		},

		clearWaypoints: function () {
			waypoints = new Array();
		},

		pushWaypoint: function (wp) {
			wp.lat = parseFloat(wp.lat);
			wp.lon = parseFloat(wp.lon);
			if (waypointIsUnique(wp)) {
				waypoints.push(wp);
			}
		},

		getWaypoints: function () {
			return waypoints;
		}
	}

	function waypointIsUnique(wp) {
		var i = waypoints.length;
		while (i--) {
			if (Math.abs(waypoints[i].lon - wp.lon) < 0.00001 && Math.abs(waypoints[i].lat - wp.lat) < 0.00001) {
				return false;
			}
		}

		return true;
	}
};

var gpx = Gpx();

parser.onopentag = function (node) {
	if (node.name == 'trkpt') {
		gpx.pushWaypoint({lat: node.attributes['lat'], lon: node.attributes['lon']});
	}
};

module.exports.parse = function(filename) {
	try {
		gpx.clearWaypoints();
		var fileBuf = fs.readFileSync(filename);
		parser.write(fileBuf.toString("utf8")).close();
		return gpx.getWaypoints();
	}

	catch (ex) {
		console.error(ex);
	}
}
