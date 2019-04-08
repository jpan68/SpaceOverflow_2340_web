const firebase = require('firebase');
require('dotenv').config();

// Initialize Firebase
const app = firebase.initializeApp({
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DB_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID
});

exports.createPlayer = (
		player_name,
		difficulty,
		pilot_pts,
		fighter_pts,
		trader_pts,
		engineer_pts, callback) => {
	return  firebase.database().ref('/player')
		.update({
			name: player_name,
	        difficulty : difficulty,
	        pilotPts : pilot_pts,
	        figherPts : fighter_pts,
	        traderPts : trader_pts,
	        engineerPts : engineer_pts,
	        credits : 1000,
	        spaceshipType : "Gnat", 
		})
		.then(() => {
			callback(null);
		})
		.catch((err) => {
			callback(err);
		});
};

exports.createPlanet = (planet, callback) => {
	return firebase.database().ref('/universe').push().set(planet).then(() => {
		callback(null);
	}).catch((err) => {
		callback(err);
	});
};
