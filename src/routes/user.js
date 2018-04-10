// Node modules
const express = require('express');
const mongoose = require('mongoose');
// Custom modules
const config = require('../config');

// Variables
const router = express.Router;

/* Routes */
/**
 * Returns a public key of a given user
 */
router.get('/getpublic/:user', (req, res, next) => {
    res.status(200).json({ test: true, params: res.params });
});

module.exports = router;