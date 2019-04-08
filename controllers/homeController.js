const firebase = require('./firebaseController');

exports.index = (req, res) => {
	res.render('index');
};

exports.welcome = (req, res) => {
	const universe = createUniverse();
	console.log(universe);
	res.render('welcome-pg', {universe: universe});
};

const createUniverse = () => {
	let universe = []; //List of solar system objects to send to firebase
	let occupiedMap = [];// 2D array of booleans to track which coordinates are already occupied by a solar system
	for(let x = 0; x < 150; x++) {
        occupiedMap.push([]);
        for(let y = 0; y < 100; y++) {
        	occupiedMap[x].push(false);
		}
    }
    const planets = ["Acamar", "Bretel", "Calondia", "Drema", "Endor", "Frolix", "Gemulon", "Hulst", "Iodine", "Jason", "Kaylon", "Lowry"];
	const techLevel = ["Pre-Agriculture", "Agriculture", "Medieval", "Renaissance", "Early Industrial", "Industrial", "Post-Industrial", "Hi-Tech"];
	const resources = ["NOSPECIALRESOURCES", "MINERALRICH", "MINERALPOOR", "DESERT", "LOTSOFWATER", "RICHSOIL", "POORSOIL", "RICHFAUNA", "LIFELESS", "WEIRDMUSHROOMS", "LOTSOFHERBS", "ARTISTIC", "WARLIKE"];
    for (let planet in planets) {
    	let x = Math.floor(Math.random() * 150);
    	let y = Math.floor(Math.random() * 100);
    	while(occupiedMap[x][y]) {
            x = Math.floor(Math.random() * 150);
            y = Math.floor(Math.random() * 100);
		}
		occupiedMap[x][y] = true;
    	let planetObj = {
            name: planets[planet],
            coordinates: {
                x: x,
                y: y
            },
            techLevel: techLevel[Math.floor(Math.random() * 8)],
            resources: resources[Math.floor(Math.random() * 13)]
        };
    	universe.push(planetObj);
    	firebase.createPlanet(planetObj, (err) => {
            if(err) {
                console.log(err);
                alert("Something went wrong.");
            }
        });
    }
    return universe;
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
		return res.redirect('/welcome');
	});
};