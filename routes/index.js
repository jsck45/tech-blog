const express = require('express');
const router = express.Router();

// Import your other route modules here
const apiRoutes = require('./api');
const htmlRoutes = require('./html-routes');

// Use your route modules
router.use('/api', apiRoutes);
router.use('/', htmlRoutes);

module.exports = router;
