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

	it('should translate an id to a filename', function() {
		var url = model.getFilenameForTrackId(1);
		url.should.match(/^.*track\/day_1.gpx$/);
	});

	it('should prevent unauthorized access attempts', function() {
		var url = model.getFilenameForTrackId('/root');
		url.should.equal('');
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
		model.loadWaypoints('test/resource/test_track_two_distant_waypoints.gpx');
		model.setOrigin(20.0, 20.0);
		model.setOnePixelIsMeters(100);
		var waypoints = model.getTransformedWaypoints();
		waypoints.should.have.lengthOf(2);
		waypoints[0].x.should.not.equal(0);
		waypoints[0].y.should.not.equal(0);
	});

	it('should be able to handle decreasing latitudes and longitudes', function() {
		model.loadWaypoints('test/resource/test_track_two_distant_waypoints_decreasing.gpx');
		model.setOnePixelIsMeters(100);
		var waypoints = model.getTransformedWaypoints();
		waypoints.should.have.lengthOf(2);
		waypoints[1].x.should.be.below(0);
		waypoints[1].y.should.be.below(0);
	});
});
