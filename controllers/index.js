const express = require('express');
const router = express.Router();

const homeController = require('./homeController');

router.get('/', homeController.index);
router.post('/next_pg', homeController.next_pg);

module.exports = router;
