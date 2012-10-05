var model = require('../models/track.js');

module.exports = function(app) {
	app.get('/track/days', function(req, res) {
		return res.json({days: model.getDays()});
	});

	app.get('/track/waypoints/:id', function(req, res) {
		var filename = model.getFilenameForTrackId(req.params.id);
		model.loadWaypoints(filename);
		model.setOnePixelIsMeters(100);
		return res.json({ waypoints: model.getTransformedWaypoints() });
	});
}

