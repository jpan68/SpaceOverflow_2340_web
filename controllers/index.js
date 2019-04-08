const express = require('express');
const router = express.Router();

const homeController = require('./homeController');

router.get('/', homeController.index);
router.get('/welcome', homeController.welcome);
router.post('/create-player', homeController.createPlayer);

module.exports = router;
