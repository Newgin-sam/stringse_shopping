const express = require('express');
const app = express();
require('dotenv').config();

const mongoose = require('mongoose');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const routes = require('./routes')

const { handleError, converToApiError } = require('./middleware/apiError')

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})



// instead of body parser
app.use(express.json());


// sanitize the req
app.use(xss());
app.use(mongoSanitize());

/// routes
app.use('/api', routes);


// handle Error
/// if the error not recognized....convert to api error
app.use(converToApiError);

app.use((err, req, res, next) => {
    handleError(err, res);
})


const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})