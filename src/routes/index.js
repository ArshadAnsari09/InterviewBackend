const express = require('express');
const router = express.Router();

// Import all route files
const homeRoutes = require('./homeRoutes');

// Use routes
router.use('/', homeRoutes);

module.exports = router;

