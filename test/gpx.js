var gpx = require('../lib/gpx.js');
var should = require('should');

describe('Gpx', function() {
	it('should be able to parse three waypoints', function() {
		var waypoints = gpx.parse('test/resource/test_track_three_waypoints.gpx');
		waypoints.should.have.lengthOf(3);
		waypoints[0].lat.should.be.equal(68.4540772);
		waypoints[0].lon.should.be.equal(28.4187259);
		waypoints[1].lat.should.be.equal(68.5540772);
		waypoints[1].lon.should.be.equal(28.5187259);
		waypoints[2].lat.should.be.equal(68.6540772);
		waypoints[2].lon.should.be.equal(28.6187259);
	});


	it('should only return unique waypoints', function() {
		var waypoints = gpx.parse('test/resource/test_track_duplicate_waypoints.gpx');
		waypoints.should.have.lengthOf(3);
		waypoints[0].lat.should.be.equal(68.4540772);
		waypoints[0].lon.should.be.equal(28.4187259);
		waypoints[1].lat.should.be.equal(78.6540772);
		waypoints[1].lon.should.be.equal(38.4187259);
		waypoints[2].lat.should.be.equal(68.6540772);
		waypoints[2].lon.should.be.equal(28.6187259);
	});



});
	
