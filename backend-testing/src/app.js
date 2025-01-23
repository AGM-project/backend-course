const express = require('express');
const rateLimiter = require('./utils/rateLimiter');
const apiRoutes = require('./routes/api');
const app = express();
// Middleware
app.use(express.json());
app.use(rateLimiter);
// Routes
app.use('/api', apiRoutes);
module.exports = app;