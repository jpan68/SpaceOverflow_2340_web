const firebase = require('./firebaseController');

exports.index = (req, res) => {
	res.render('index');
};

exports.next = (req, res) => {
	res.render('next-pg');
};

exports.createPlayer = (req, res) => {
	// get player data from brower
	const player_name = req.body.name || "Temp Player Name";
	const difficulty = req.body.difficulty;
	const pilot_pts = req.body.pilot;
	const fighter_pts = req.body.fighter;
	const trader_pts = req.body.trader;
	const engineer_pts = req.body.engineer;

	console.log(req.body);

	// create the player thru firebase controller
	firebase.createPlayer(
		player_name,
		difficulty,
		pilot_pts,
		fighter_pts,
		trader_pts,
		engineer_pts, (err) => {
		if (err) {
			console.log(err);
			return res.redirect('/');
		}
		return res.redirect('/next');
	});
}