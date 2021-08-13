const express = require('express');
const app = express();

const mongoose = require('mongoose');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const routes = require('./routes')
const passport = require('passport');

const { jwtStrategy } = require('./middleware/passport');
const { handleError, converToApiError } = require('./middleware/apiError')

require('dotenv').config();

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


//passport
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

/// routes
app.use('/api', routes);


// handle Error
/// if the error not recognized....convert to api error

app.use(converToApiError);

app.use((err, req, res, next) => {
    handleError(err, res);
})

app.use(express.static('client/build'));

app.get('/api/test', (req, res) => {
    res.send("hello buddy");
})

// if (process.env.NODE_ENV === 'production') {
const path = require('path');
app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
});
// }

console.log(process.env.NODE_ENV)

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})