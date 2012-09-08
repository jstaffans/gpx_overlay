//var model = "../models/track.js";

module.exports = function(app) {
	app.get('/track/waypoints/:id', function(req, res) {
		return res.json({ waypoints: [{x: 500, y: 800}, {x: 530, y: 830}] });
	});

	app.get('/track/days', function(req, res) {
		return res.json({days: 'foobar'});
	});

}

