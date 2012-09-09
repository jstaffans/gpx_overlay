var gpx = require('../lib/gpx.js');
var should = require('should');

describe('Gpx', function() {
	it('should be able to parse a single waypoint', function() {
		gpx.parse('resources/single_waypoint.gpx');
		var waypoints = gpx.getWaypoints();
		waypoints.should.have.lengthOf(1);
		// waypoint should be 0,0		
	});

	it('should be able to parse two waypoints', function() {
		should.fail('Not implemented yet');
	});

	it('should be translatable', function() {
		should.fail('Not implemented yet');
	});

	it('should be scalable', function() {
		should.fail('Not implemented yet');
	});

	it('should only return unique waypoints', function() {
		should.fail('Not implemented yet');
	});

	it('should handle many waypoints', function() {
		should.fail('Not implemented yet');
	});
});
	
