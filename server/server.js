const express = require('express');
const app = express();
const mongoose = require('mongoose');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const routes = require('./routes')

// instead of body parser
app.use(express.json())


// sanitize the req
app.use(xss());
app.use(mongoSanitize());

/// routes
app.use('/api', routes)





const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})