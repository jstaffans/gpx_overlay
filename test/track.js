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
		should.fail('Not implemented yet');
	});

	it('should be translatable', function() {
		should.fail('Not implemented yet');
	});
});
