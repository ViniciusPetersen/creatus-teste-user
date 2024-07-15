const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const auth = require('../middleware/auth');

router.get('/generate', auth(4), reportController.generateReport);

module.exports = router;
