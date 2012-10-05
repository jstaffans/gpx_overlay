var model = require('../models/track.js');
var should = require('should');

describe('Track', function() {
	it('should contain a list of days', function() {
		var days = model.getDays();
		days.should.have.lengthOf(8);
	});

	it('should be a list in the correct format', function() {
		var days = model.getDays();
		days[0].id.should.equal(1);
		days[0].date.should.match(/^\d{1,2}\.\d{1,2}\.\d{4}$/);
	});

	it('should be scalable', function() {
		model.loadWaypoints('test/resource/test_track_two_distant_waypoints.gpx');
		model.setOnePixelIsMeters(250);
		var waypoints = model.getTransformedWaypoints();
		waypoints.should.have.lengthOf(2);
		waypoints[0].x.should.be.equal(0);
		waypoints[0].y.should.be.equal(0);
		waypoints[1].x.should.be.equal(445);
		waypoints[1].y.should.be.equal(341);

	});

	it('should be translatable', function() {
		should.fail('Not implemented yet');
	});
});
