var model = require('../models/track.js');

module.exports = function(app) {
	app.get('/track/days', function(req, res) {
		return res.json({days: model.getDays()});
	});

	app.get('/track/waypoints/:id', function(req, res) {
		return res.json({ waypoints: model.getWaypoints(req.params.id) });
	});
}

