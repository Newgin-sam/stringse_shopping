const express = require('express');
const app = express();
require('dotenv').config();

const fs = require('fs');

const mongoose = require('mongoose');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const routes = require('./routes');
const passport = require('passport');
const { jwtStrategy } = require('./middleware/passport');

const { handleError, converToApiError } = require('./middleware/apiError');


// mongodb+srv://admin:<password>@cluster0.kbuow.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});



/// body parse
app.use(express.json())


/// sanitize
app.use(xss());
app.use(mongoSanitize());

// passport 
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

/// routes
app.use('/api', routes)


/// HANDLE ERRORS
/// if the error not recognized....convert to api error
app.use(converToApiError);
app.use((err, req, res, next) => {
    handleError(err, res)
})

const path = require('path');

app.use(express.static('client/build'));
if (process.env.NODE_ENV === 'production') {
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
    });
}

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});